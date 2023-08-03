// To parse this data:
//
//   import { Convert, DestinationPricing } from "./file";
import { format } from "date-fns";
import { ParsedUrlQuery } from "querystring";
import { SearchParams } from "~/components/search-bar/SearchBar";
//
//   const destinationPricing = Convert.toDestinationPricing(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

const HotelsPricesAPI = "/hotelapi/hotels/prices";
const LocalSearchAPI = "/search";

export type PricingSearchQueryParams = {
  destination_id: string;
  checkin: Date;
  checkout: Date;
  lang: string;
  currency: string;
  country_code: string;
  rooms: number;
  guests: number;
  partner_id?: string;
};

export type DestinationPricing = {
  searchCompleted: null;
  completed: boolean;
  status: null;
  currency: string;
  hotels: Hotel[];
};

export type Hotel = {
  id: string;
  searchRank: number;
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
  market_rates: MarketRate[];
};

export type MarketRate = {
  supplier: Supplier;
  rate: number;
};

export enum Supplier {
  Expedia = "expedia",
}

export enum PriceType {
  Multi = "multi",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toDestinationPricing(json: string): DestinationPricing {
    return cast(JSON.parse(json), r("DestinationPricing"));
  }

  public static destinationPricingToJson(value: DestinationPricing): string {
    return JSON.stringify(uncast(value, r("DestinationPricing")), null, 2);
  }

  public static buildDestinationPricingQueryUrl(
    searchParams: PricingSearchQueryParams
  ): string {
    const guestRoomStringBuilder = (rooms: number, guests: number) => {
      if (rooms == 0) return "0";
      let guestRoomString = `${Math.ceil(guests / rooms)}`;
      rooms--;
      for (let roomsLeft = rooms; roomsLeft > 0; roomsLeft--) {
        guests -= Math.ceil(guests / rooms);
        guestRoomString += `|${Math.ceil(guests / roomsLeft)}`;
      }
      return guestRoomString;
    };

    let urlParams = new URLSearchParams();
    urlParams.append("destination_id", searchParams.destination_id);
    urlParams.append("checkin", format(searchParams.checkin, "yyyy-MM-dd"));
    urlParams.append("checkout", format(searchParams.checkout, "yyyy-MM-dd"));
    urlParams.append("lang", searchParams.lang);
    urlParams.append("currency", searchParams.currency);
    urlParams.append(
      "guests",
      guestRoomStringBuilder(searchParams.rooms, searchParams.guests)
    );
    urlParams.append("partner_id", searchParams.partner_id ?? "1");

    return `${HotelsPricesAPI}?${urlParams}`;
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
  DestinationPricing: o(
    [
      { json: "searchCompleted", js: "searchCompleted", typ: null },
      { json: "completed", js: "completed", typ: true },
      { json: "status", js: "status", typ: null },
      { json: "currency", js: "currency", typ: "" },
      { json: "hotels", js: "hotels", typ: a(r("Hotel")) },
    ],
    false
  ),
  Hotel: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "searchRank", js: "searchRank", typ: 3.14 },
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
      { json: "market_rates", js: "market_rates", typ: a(r("MarketRate")) },
    ],
    false
  ),
  MarketRate: o(
    [
      { json: "supplier", js: "supplier", typ: r("Supplier") },
      { json: "rate", js: "rate", typ: 3.14 },
    ],
    false
  ),
  Supplier: ["expedia"],
  PriceType: ["multi"],
};
