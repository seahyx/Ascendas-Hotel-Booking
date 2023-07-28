// To parse this data:
//
//   import { Convert, Hotels } from "./file";
//
//   const hotels = Convert.toHotels(json);

export type Hotels = {
  searchCompleted?: null;
  completed?:       boolean;
  status?:          null;
  currency?:        string;
  hotels?:          Hotel[];
}

export type Hotel = {
  id?:                        string;
  searchRank?:                number;
  price_type?:                String;
  max_cash_payment?:          number;
  coverted_max_cash_payment?: number;
  points?:                    number;
  bonuses?:                   number;
  bonus_programs?:            any[];
  bonus_tiers?:               any[];
  lowest_price?:              number;
  price?:                     number;
  converted_price?:           number;
  lowest_converted_price?:    number;
  market_rates?:              MarketRate[];
}

export type MarketRate = {
  supplier?: String;
  rate?:     number;
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
