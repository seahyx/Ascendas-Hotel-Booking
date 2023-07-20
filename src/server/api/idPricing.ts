// To parse this data:
//
//   import { Convert, IDPricing } from "./file";
//
//   const iDPricing = Convert.toIDPricing(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type IDPricing = {
  searchCompleted: null;
  completed: boolean;
  status: null;
  currency: null;
  rooms: Room[];
};

export type Room = {
  key: string;
  roomDescription: string;
  roomNormalizedDescription: string;
  type: string;
  free_cancellation: boolean;
  roomAdditionalInfo: RoomAdditionalInfo;
  description: string;
  images: Image[];
  amenities: Amenity[];
  price_type: PriceType;
  max_cash_payment: number;
  coverted_max_cash_payment: number;
  points: number;
  bonuses: number;
  bonus_programs: any[];
  bonus_tiers: any[];
  lowest_price: number;
  price: number;
  converted_price: number;
  lowest_converted_price: number;
  chargeableRate: number;
  market_rates: any[];
};

export enum Amenity {
  DVDPlayer = "DVD player",
  InternetAccess = "Internet access",
  LivingRoom = "Living room",
  RoomSizeSqm = "Room size (sqm)",
  SatelliteTV = "Satellite TV ",
  WheelchairAccessible = "Wheelchair-accessible",
}

export type Image = {
  url: string;
};

export enum PriceType {
  Single = "single",
}

export type RoomAdditionalInfo = {
  breakfastInfo: BreakfastInfo;
  displayFields: DisplayFields;
};

export enum BreakfastInfo {
  HotelDetailBreakfastIncluded = "hotel_detail_breakfast_included",
  HotelDetailRoomOnly = "hotel_detail_room_only",
}

export type DisplayFields = {
  special_check_in_instructions: null;
  check_in_instructions: null;
  know_before_you_go: null;
  fees_optional: null;
  fees_mandatory: null;
  kaligo_service_fee: number;
  hotel_fees: any[];
  surcharges: Surcharge[];
};

export type Surcharge = {
  type: Type;
  amount: number;
};

export enum Type {
  TaxAndServiceFee = "TaxAndServiceFee",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toIDPricing(json: string): IDPricing {
    return cast(JSON.parse(json), r("IDPricing"));
  }

  public static iDPricingToJson(value: IDPricing): string {
    return JSON.stringify(uncast(value, r("IDPricing")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  IDPricing: o(
    [
      { json: "searchCompleted", js: "searchCompleted", typ: null },
      { json: "completed", js: "completed", typ: true },
      { json: "status", js: "status", typ: null },
      { json: "currency", js: "currency", typ: null },
      { json: "rooms", js: "rooms", typ: a(r("Room")) },
    ],
    false
  ),
  Room: o(
    [
      { json: "key", js: "key", typ: "" },
      { json: "roomDescription", js: "roomDescription", typ: "" },
      {
        json: "roomNormalizedDescription",
        js: "roomNormalizedDescription",
        typ: "",
      },
      { json: "type", js: "type", typ: "" },
      { json: "free_cancellation", js: "free_cancellation", typ: true },
      {
        json: "roomAdditionalInfo",
        js: "roomAdditionalInfo",
        typ: r("RoomAdditionalInfo"),
      },
      { json: "description", js: "description", typ: "" },
      { json: "images", js: "images", typ: a(r("Image")) },
      { json: "amenities", js: "amenities", typ: a(r("Amenity")) },
      { json: "price_type", js: "price_type", typ: r("PriceType") },
      { json: "max_cash_payment", js: "max_cash_payment", typ: 3.14 },
      {
        json: "coverted_max_cash_payment",
        js: "coverted_max_cash_payment",
        typ: 3.14,
      },
      { json: "points", js: "points", typ: 0 },
      { json: "bonuses", js: "bonuses", typ: 0 },
      { json: "bonus_programs", js: "bonus_programs", typ: a("any") },
      { json: "bonus_tiers", js: "bonus_tiers", typ: a("any") },
      { json: "lowest_price", js: "lowest_price", typ: 3.14 },
      { json: "price", js: "price", typ: 3.14 },
      { json: "converted_price", js: "converted_price", typ: 3.14 },
      {
        json: "lowest_converted_price",
        js: "lowest_converted_price",
        typ: 3.14,
      },
      { json: "chargeableRate", js: "chargeableRate", typ: 3.14 },
      { json: "market_rates", js: "market_rates", typ: a("any") },
    ],
    false
  ),
  Image: o([{ json: "url", js: "url", typ: "" }], false),
  RoomAdditionalInfo: o(
    [
      { json: "breakfastInfo", js: "breakfastInfo", typ: r("BreakfastInfo") },
      { json: "displayFields", js: "displayFields", typ: r("DisplayFields") },
    ],
    false
  ),
  DisplayFields: o(
    [
      {
        json: "special_check_in_instructions",
        js: "special_check_in_instructions",
        typ: null,
      },
      { json: "check_in_instructions", js: "check_in_instructions", typ: null },
      { json: "know_before_you_go", js: "know_before_you_go", typ: null },
      { json: "fees_optional", js: "fees_optional", typ: null },
      { json: "fees_mandatory", js: "fees_mandatory", typ: null },
      { json: "kaligo_service_fee", js: "kaligo_service_fee", typ: 0 },
      { json: "hotel_fees", js: "hotel_fees", typ: a("any") },
      { json: "surcharges", js: "surcharges", typ: a(r("Surcharge")) },
    ],
    false
  ),
  Surcharge: o(
    [
      { json: "type", js: "type", typ: r("Type") },
      { json: "amount", js: "amount", typ: 3.14 },
    ],
    false
  ),
  Amenity: [
    "DVD player",
    "Internet access",
    "Living room",
    "Room size (sqm)",
    "Satellite TV ",
    "Wheelchair-accessible",
  ],
  PriceType: ["single"],
  BreakfastInfo: ["hotel_detail_breakfast_included", "hotel_detail_room_only"],
  Type: ["TaxAndServiceFee"],
};
