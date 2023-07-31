import data from "../destinations.json";

export type Destination = {
  term: string;
  uid: string;
  lat: Number;
  lng: Number;
  type: string;
  state?: string;
};

type DestinationRaw = {
  term?: string;
  uid?: string;
  lat?: Number;
  lng?: Number;
  type: string;
  state?: string;
};

export const DESTINATIONS: Destination[] = data.filter(
  (element: DestinationRaw) =>
    element.term && element.uid && element.lat && element.lng && element.type
) as Destination[];
