// To parse this data:
//
//   import { Convert } from "./file";
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
  distance?:             number;
  trustyou?:             Trustyou;
  categories?:           { [key: string]: Category };
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
  name?:  AmenitiesRatingName;
  score?: number;
}

export type AmenitiesRatingName = "Food" | "WiFi" | "Service" | "Amenities" | "Location" | "Comfort" | "Breakfast" | "Room" | "Bar" | "Vibe" | "Wellness" | "Pool" | "Beach";

export type Category = {
  name?:       CategoryName;
  score?:      number;
  popularity?: number | null;
}

export type CategoryName = "Airport Hotel" | "Beach Hotel" | "Boutique Hotel" | "Budget Hotel" | "Business Hotel" | "Casino Hotel" | "City Hotel" | "Club Hotel" | "Design Hotel" | "Eco-friendly Hotel" | "Family Hotel" | "Golf Hotel" | "Lake Hotel" | "Luxury Hotel" | "Overall" | "Romantic Hotel" | "Wellness Hotel";

export type ImageDetails = {
  suffix?: Suffix;
  count?:  number;
  prefix?: string;
}

export type Suffix = ".jpg";

export type OriginalMetadata = {
  name?:    String;
  city?:    String;
  state?:   String | null;
  country?: String;
}

export type Trustyou = {
  id?:    null | string;
  score?: Score;
}

export type Score = {
  overall?:        number | null;
  kaligo_overall?: number;
  solo?:           number | null;
  couple?:         number | null;
  family?:         number | null;
  business?:       number | null;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toHotels(json: string): Hotels[] {
      return JSON.parse(json);
  }

  public static hotelsToJson(value: Hotels[]): string {
      return JSON.stringify(value);
  }
}
