import { Box, Typography } from "@mui/material";
import { useState } from "react";
import TopBarWithSearch from "src/components/search-bar/TopBarWithSearch";
import { Convert, DestinationPricing } from "src/utils/destinationPricing";
import useSWR from "swr";
import { SearchParams } from "~/utils/searchParams";

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
    const pricingSearchParams =
      Convert.searchParamsToPricingSearchParams(searchParams);
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
