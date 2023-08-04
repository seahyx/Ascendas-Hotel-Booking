import { parseJSON } from "date-fns";
import { Destination } from "./destinations";
import { ParsedUrlQuery } from "querystring";

export type SearchParams = {
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  child: number;
  rooms: number;
} & Destination;

export const searchParamsToQuery = (searchParams: SearchParams): string => {
  const queryParams: Record<string, string> = Object.fromEntries(
    Object.entries(searchParams).map((entry) => [
      entry[0],
      JSON.stringify(entry[1]),
    ])
  );
  return new URLSearchParams(queryParams).toString();
};

export const queryToSearchParams = (query: string): SearchParams => {
  const queryObj = Object.fromEntries(new URLSearchParams(query));
  const searchParams: Record<
    string,
    SearchParams[keyof SearchParams] | string
  > = {};
  for (const key of Object.keys(queryObj)) {
    try {
      searchParams[key] = JSON.parse(decodeURIComponent(queryObj[key] ?? ""));
    } catch (e) {
      console.error(
        `Error parsing value ${searchParams[key]} of key ${key} as a JSON string.`
      );
    }
  }
  searchParams.checkInDate = searchParams.checkInDate
    ? parseJSON(searchParams.checkInDate as string)
    : new Date();
  searchParams.checkOutDate = searchParams.checkOutDate
    ? parseJSON(searchParams.checkOutDate as string)
    : new Date();
  return searchParams as SearchParams;
};

export const parsedQueryToSearchParams = (
  parsedQuery: ParsedUrlQuery
): SearchParams => {
  const searchParams: Record<
    string,
    SearchParams[keyof SearchParams] | string
  > = {};
  for (const key of Object.keys(parsedQuery)) {
    try {
      searchParams[key] = JSON.parse(
        decodeURIComponent((parsedQuery[key] as string) ?? "")
      );
    } catch (e) {
      console.error(
        `Error parsing value ${parsedQuery[key]} of key ${key} as a JSON string.`
      );
    }
  }
  searchParams.checkInDate = searchParams.checkInDate
    ? parseJSON(searchParams.checkInDate as string)
    : new Date();
  searchParams.checkOutDate = searchParams.checkOutDate
    ? parseJSON(searchParams.checkOutDate as string)
    : new Date();
  return searchParams as SearchParams;
};
