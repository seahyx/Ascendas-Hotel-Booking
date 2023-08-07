// To parse this data:
//
//   import { Convert, Hotels } from "./file";
//
//   const hotels = Convert.toHotels(json);

const breakfastInfoToTextMapping: Record<string, string> = {
  hotel_detail_room_only: "Room only",
  hotel_detail_breakfast_included: "Breakfast included",
};

export const mapBreakfastInfoToText = (breakfastInfo?: string) => {
  return breakfastInfo
    ? breakfastInfoToTextMapping[breakfastInfo] ?? breakfastInfo
    : "";
};

export type IdPricing = {
  searchCompleted?: null;
  completed?: boolean;
  status?: null;
  currency?: null;
  rooms?: Room[];
};

export type Room = {
  key?: string;
  roomDescription?: string;
  roomNormalizedDescription?: string;
  type?: string;
  free_cancellation?: boolean;
  roomAdditionalInfo?: RoomAdditionalInfo;
  description?: string;
  long_description?: string;
  images?: Image[];
  amenities?: string[];
  price_type?: PriceType;
  max_cash_payment?: number;
  coverted_max_cash_payment?: number;
  points?: number;
  bonuses?: number;
  bonus_programs?: any[];
  bonus_tiers?: any[];
  lowest_price?: number;
  price?: number;
  converted_price?: number;
  lowest_converted_price?: number;
  chargeableRate?: number;
  market_rates?: MarketRate[];
};

export type Image = {
  url?: string;
  high_resolution_url?: string;
  hero_image?: boolean;
};

export type MarketRate = {
  supplier?: string;
  rate?: number;
};

export type PriceType = "single";

export type RoomAdditionalInfo = {
  breakfastInfo?: string;
  displayFields?: DisplayFields;
};

export type DisplayFields = {
  special_check_in_instructions?: string;
  check_in_instructions?: string;
  know_before_you_go?: string;
  fees_optional?: string;
  fees_mandatory?: string | boolean;
  kaligo_service_fee?: number;
  hotel_fees?: any[];
  surcharges?: Surcharge[];
};

export type Surcharge = {
  type?: Type;
  amount?: number;
};

export type Type = "TaxAndServiceFee";
