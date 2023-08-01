// To parse this data:
//
//   import { Convert } from "./file";
//
//   const destinationHotel = Convert.toDestinationHotel(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type DestinationHotel = {
  id: string;
  imageCount: number;
  latitude: number;
  longitude: number;
  name: string;
  address: string;
  address1: string;
  rating: number;
  distance: number;
  trustyou: Trustyou;
  categories: { [key: string]: Category };
  amenities_ratings: AmenitiesRating[];
  description?: string;
  amenities: { [key: string]: boolean };
  original_metadata: OriginalMetadata;
  image_details: ImageDetails;
  hires_image_index?: string;
  number_of_images: number;
  default_image_index: number;
  imgix_url: string;
  cloudflare_image_url: string;
};

export type AmenitiesRating = {
  name: AmenitiesRatingName;
  score: number;
};

export enum AmenitiesRatingName {
  Amenities = "Amenities",
  Bar = "Bar",
  Beach = "Beach",
  Breakfast = "Breakfast",
  Comfort = "Comfort",
  Food = "Food",
  Location = "Location",
  Pool = "Pool",
  Room = "Room",
  Service = "Service",
  Vibe = "Vibe",
  Wellness = "Wellness",
  WiFi = "WiFi",
}

export type Category = {
  name: CategoryName;
  score: number;
  popularity: number | null;
};

export enum CategoryName {
  AirportHotel = "Airport Hotel",
  BeachHotel = "Beach Hotel",
  BoutiqueHotel = "Boutique Hotel",
  BudgetHotel = "Budget Hotel",
  BusinessHotel = "Business Hotel",
  CasinoHotel = "Casino Hotel",
  CityHotel = "City Hotel",
  ClubHotel = "Club Hotel",
  DesignHotel = "Design Hotel",
  EcoFriendlyHotel = "Eco-friendly Hotel",
  FamilyHotel = "Family Hotel",
  GolfHotel = "Golf Hotel",
  LakeHotel = "Lake Hotel",
  LuxuryHotel = "Luxury Hotel",
  Overall = "Overall",
  RomanticHotel = "Romantic Hotel",
  WellnessHotel = "Wellness Hotel",
}

export type ImageDetails = {
  suffix: Suffix;
  count: number;
  prefix: string;
};

export enum Suffix {
  Jpg = ".jpg",
}

export type OriginalMetadata = {
  name: null;
  city: City;
  state: City | null;
  country: Country;
};

export enum City {
  Singapore = "Singapore",
}

export enum Country {
  Sg = "SG",
}

export type Trustyou = {
  id: null | string;
  score: Score;
};

export type Score = {
  overall: number | null;
  kaligo_overall: number;
  solo: number | null;
  couple: number | null;
  family: number | null;
  business: number | null;
};

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toDestinationHotel(json: string): DestinationHotel[] {
    return cast(JSON.parse(json), a(r("DestinationHotel")));
  }

  public static destinationHotelToJson(value: DestinationHotel[]): string {
    return JSON.stringify(uncast(value, a(r("DestinationHotel"))), null, 2);
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
  DestinationHotel: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "imageCount", js: "imageCount", typ: 0 },
      { json: "latitude", js: "latitude", typ: 3.14 },
      { json: "longitude", js: "longitude", typ: 3.14 },
      { json: "name", js: "name", typ: "" },
      { json: "address", js: "address", typ: "" },
      { json: "address1", js: "address1", typ: "" },
      { json: "rating", js: "rating", typ: 3.14 },
      { json: "distance", js: "distance", typ: 3.14 },
      { json: "trustyou", js: "trustyou", typ: r("Trustyou") },
      { json: "categories", js: "categories", typ: m(r("Category")) },
      {
        json: "amenities_ratings",
        js: "amenities_ratings",
        typ: a(r("AmenitiesRating")),
      },
      { json: "description", js: "description", typ: u(undefined, "") },
      { json: "amenities", js: "amenities", typ: m(true) },
      {
        json: "original_metadata",
        js: "original_metadata",
        typ: r("OriginalMetadata"),
      },
      { json: "image_details", js: "image_details", typ: r("ImageDetails") },
      {
        json: "hires_image_index",
        js: "hires_image_index",
        typ: u(undefined, ""),
      },
      { json: "number_of_images", js: "number_of_images", typ: 0 },
      { json: "default_image_index", js: "default_image_index", typ: 0 },
      { json: "imgix_url", js: "imgix_url", typ: "" },
      { json: "cloudflare_image_url", js: "cloudflare_image_url", typ: "" },
    ],
    false
  ),
  AmenitiesRating: o(
    [
      { json: "name", js: "name", typ: r("AmenitiesRatingName") },
      { json: "score", js: "score", typ: 0 },
    ],
    false
  ),
  Category: o(
    [
      { json: "name", js: "name", typ: r("CategoryName") },
      { json: "score", js: "score", typ: 0 },
      { json: "popularity", js: "popularity", typ: u(3.14, null) },
    ],
    false
  ),
  ImageDetails: o(
    [
      { json: "suffix", js: "suffix", typ: r("Suffix") },
      { json: "count", js: "count", typ: 0 },
      { json: "prefix", js: "prefix", typ: "" },
    ],
    false
  ),
  OriginalMetadata: o(
    [
      { json: "name", js: "name", typ: null },
      { json: "city", js: "city", typ: r("City") },
      { json: "state", js: "state", typ: u(r("City"), null) },
      { json: "country", js: "country", typ: r("Country") },
    ],
    false
  ),
  Trustyou: o(
    [
      { json: "id", js: "id", typ: u(null, "") },
      { json: "score", js: "score", typ: r("Score") },
    ],
    false
  ),
  Score: o(
    [
      { json: "overall", js: "overall", typ: u(0, null) },
      { json: "kaligo_overall", js: "kaligo_overall", typ: 3.14 },
      { json: "solo", js: "solo", typ: u(0, null) },
      { json: "couple", js: "couple", typ: u(0, null) },
      { json: "family", js: "family", typ: u(0, null) },
      { json: "business", js: "business", typ: u(0, null) },
    ],
    false
  ),
  AmenitiesRatingName: [
    "Amenities",
    "Bar",
    "Beach",
    "Breakfast",
    "Comfort",
    "Food",
    "Location",
    "Pool",
    "Room",
    "Service",
    "Vibe",
    "Wellness",
    "WiFi",
  ],
  CategoryName: [
    "Airport Hotel",
    "Beach Hotel",
    "Boutique Hotel",
    "Budget Hotel",
    "Business Hotel",
    "Casino Hotel",
    "City Hotel",
    "Club Hotel",
    "Design Hotel",
    "Eco-friendly Hotel",
    "Family Hotel",
    "Golf Hotel",
    "Lake Hotel",
    "Luxury Hotel",
    "Overall",
    "Romantic Hotel",
    "Wellness Hotel",
  ],
  Suffix: [".jpg"],
  City: ["Singapore"],
  Country: ["SG"],
};
