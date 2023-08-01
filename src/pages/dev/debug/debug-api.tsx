import { Box, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { SearchParams } from "~/components/search-bar/SearchBar";
import TopBarWithSearch from "~/components/search-bar/TopBarWithSearch";
import { Convert, PricingSearchQueryParams } from "~/utils/destinationPricing";

export default function DebugAPIPage(props) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const [searchParams, _setSearchParams] = useState<SearchParams | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

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
    const url = Convert.buildDestinationPricingQueryURL(pricingSearchParams);
    console.log(url);
    setUrl(url);
  };

  return (
    <>
      <TopBarWithSearch onSearchParams={setSearchParams} />
      <Box className="w-full">
        <Typography variant="body2">{JSON.stringify(data)}</Typography>
      </Box>
    </>
  );
}
