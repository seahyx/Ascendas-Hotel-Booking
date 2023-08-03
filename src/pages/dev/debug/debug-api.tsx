import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { SearchParams } from "~/components/search-bar/SearchBar";
import TopBarWithSearch from "~/components/search-bar/TopBarWithSearch";
import {
  Convert,
  DestinationPricing,
  PricingSearchQueryParams,
} from "~/utils/destinationPricing";

export default function DebugAPIPage(props) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const checkSearchComplete = (data: DestinationPricing) => {
    console.log(data);
    if (data && data.completed) return 0;
    return 1000;
  };

  const [searchParams, _setSearchParams] = useState<SearchParams | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const { data }: { data: DestinationPricing } = useSWR(url, fetcher, {
    refreshInterval: checkSearchComplete,
  });

  const setSearchParams = (searchParams: SearchParams) => {
    _setSearchParams(searchParams);
    const pricingSearchParams: PricingSearchQueryParams = {
      destination_id: searchParams.dest?.uid ?? "",
      checkin: searchParams.checkInDate ?? new Date(),
      checkout: searchParams.checkOutDate ?? new Date(),
      lang: "en_US",
      currency: "SGD",
      country_code: "SG",
      rooms: searchParams.guests.rooms,
      guests: searchParams.guests.adults + searchParams.guests.child,
    };
    console.log(pricingSearchParams);
    const url = Convert.buildDestinationPricingQueryUrl(pricingSearchParams);
    console.log(url);
    setUrl(url);
  };

  return (
    <>
      <TopBarWithSearch onSearchButtonClick={setSearchParams} />
      <Box className="w-full">
        <Typography variant="body2">{JSON.stringify(data)}</Typography>
      </Box>
    </>
  );
}
