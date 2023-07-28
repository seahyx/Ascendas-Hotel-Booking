// To parse this data:
//
//   import { Convert, Hotels } from "./file";
//
//   const hotels = Convert.toHotels(json);

export type Hotels = {
  id?:                   string;
  imageCount?:           number;
  latitude?:             number;
  longitude?:            number;
  name?:                 string;
  address?:              string;
  address1?:             string;
  rating?:               number;
  trustyou?:             Trustyou;
  categories?:           Categories;
  amenities_ratings?:    AmenitiesRating[];
  description?:          string;
  amenities?:            { [key: string]: boolean };
  original_metadata?:    OriginalMetadata;
  image_details?:        ImageDetails;
  hires_image_index?:    string;
  number_of_images?:     number;
  default_image_index?:  number;
  imgix_url?:            string;
  cloudflare_image_url?: string;
}

export type AmenitiesRating = {
  name?:  string;
  score?: number;
}

export type Categories = {
  overall?:        BusinessHotel;
  lake_hotel?:     BusinessHotel;
  business_hotel?: BusinessHotel;
  city_hotel?:     BusinessHotel;
}

export type BusinessHotel = {
  name?:       string;
  score?:      number;
  popularity?: number;
}

export type ImageDetails = {
  suffix?: string;
  count?:  number;
  prefix?: string;
}

export type OriginalMetadata = {
  name?:    null;
  city?:    string;
  state?:   null;
  country?: string;
}

export type Trustyou = {
  id?:    string;
  score?: Score;
}

export type Score = {
  overall?:        number;
  kaligo_overall?: number;
  solo?:           number;
  couple?:         number;
  family?:         number;
  business?:       number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toHotels(json: string): Hotels {
      return JSON.parse(json);
  }

  public static hotelsToJson(value: Hotels): string {
      return JSON.stringify(value);
  }
}
