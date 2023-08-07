import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  Rating,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import GoogleMap from "google-maps-react-markers";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import TopBarWithSearch from "src/components/search-bar/TopBarWithSearch";
import HotelSearchResultList from "src/components/search-page/HotelSearchResultList";
import { Convert, DestinationPricing } from "src/utils/destinationPricing";
import useSWR from "swr";
import { SearchParams, parsedQueryToSearchParams } from "~/utils/searchParams";

function Sidebar() {
  const [ratingRange, setRatingRange] = useState<number[]>([2.5, 5.0]);
  const ratingMarks = [
    {
      value: 1.0,
      label: "1.0",
    },
    {
      value: 5.0,
      label: "5.0",
    },
  ];
  const maxRating = 5;

  const [priceRange, setPriceRange] = useState<number[]>([50, 300]);
  const priceMarks = [
    {
      value: 50,
      label: "$50",
    },
    {
      value: 300,
      label: "$300",
    },
  ];
  const hotelPopular: { label: string; key: string }[] = [
    {
      label: "Business Travellers",
      key: "Business",
    },
    {
      label: "Families",
      key: "Family",
    },
    {
      label: "Couples",
      key: "Couple",
    },
    {
      label: "Singles",
      key: "Single",
    },
  ];
  const defaultMapProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 14,
  };

  return (
    <Stack className="w-64 shrink-0 self-start" spacing={2}>
      <Paper className="h-52 overflow-hidden">
        <GoogleMap
          apiKey=""
          defaultCenter={defaultMapProps.center}
          defaultZoom={defaultMapProps.zoom}
        ></GoogleMap>
      </Paper>
      <Paper className="px-6 py-4">
        <Button className="mb-4 w-full" size="large" variant="outlined">
          Apply Filters
        </Button>
        <Typography variant="subtitle2">REVIEWS SCORE</Typography>
        <Box className="mx-2">
          <Slider
            defaultValue={ratingRange}
            min={1.0}
            max={5.0}
            step={0.5}
            size="small"
            marks={ratingMarks}
            valueLabelDisplay="auto"
            disableSwap
          />
        </Box>
        <Typography variant="subtitle2" className="mt-6">
          PRICE RANGE (SGD)
        </Typography>
        <Box className="mx-2">
          <Slider
            defaultValue={priceRange}
            min={50}
            max={300}
            step={1}
            size="small"
            marks={priceMarks}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => `$${value}`}
            disableSwap
          />
        </Box>
        <Typography variant="subtitle2" className="mt-6">
          HOTEL STAR RATING
        </Typography>
        <FormGroup>
          {[...Array(maxRating).keys()].map((i) => {
            i = maxRating - i;
            return (
              <FormControlLabel
                label={<Rating value={i} readOnly />}
                control={<Checkbox size="small" value={i} defaultChecked />}
                key={`Rating ${i}`}
                disableTypography
              />
            );
          })}
        </FormGroup>
        <Typography variant="subtitle2" className="mt-6">
          HOTELS POPULAR FOR
        </Typography>
        <FormGroup>
          {hotelPopular.map(({ label, key }) => (
            <FormControlLabel
              label={label}
              control={<Checkbox size="small" defaultChecked />}
              key={key}
            />
          ))}
        </FormGroup>
      </Paper>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<{
  searchParamsJSON: string | null;
  destQueryUrl: string | null;
}> = async (context) => {
  const query = context.query;
  let searchParams: SearchParams | null = null;
  let destQueryUrl: string | null = null;

  if (query.uid) {
    searchParams = parsedQueryToSearchParams(query);
    const pricingSearchParams =
      Convert.searchParamsToPricingSearchParams(searchParams);
    destQueryUrl = Convert.buildDestinationPricingQueryUrl(pricingSearchParams);
  } else {
    console.error("Error retrieving search parameters from url query string.");
  }
  return {
    props: { searchParamsJSON: JSON.stringify(searchParams), destQueryUrl },
  };
};

export default function SearchResults({
      searchParamsJSON,
      destQueryUrl,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const maxItemsPerPage = 10;
  const searchParams: SearchParams | undefined = searchParamsJSON
    ? JSON.parse(searchParamsJSON)
    : undefined;
  console.log(searchParams);
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const checkSearchComplete = (data: DestinationPricing) => {
    if (!data || data.completed) return 0;
    return 500;
  };
  const { data }: { data: DestinationPricing } = useSWR(destQueryUrl, fetcher, {
    refreshInterval: checkSearchComplete,
  });

  return (
    <>
      <Head>
        <title>Search results for Singapore</title>
        <meta name="description" content="Search results for Singapore." />
      </Head>
      <TopBarWithSearch />
      {data && data.hotels && (
        <Container
          maxWidth="md"
          className="mt-3 flex w-full flex-row place-content-between items-baseline"
        >
          <Typography variant="body1">
            <span className="text-2xl font-semibold">{data.hotels.length}</span>{" "}
            hotels found matching your search results.
          </Typography>
          <Typography variant="body2">
            All prices are including taxes and fees.
          </Typography>
        </Container>
      )}
      <Container maxWidth="lg" className="pb-6 pt-3">
        <Stack direction="row" spacing={2}>
          <Sidebar />
          <HotelSearchResultList
            hotelsPricing={data?.hotels}
            currency="SGD"
            maxItemsPerPage={maxItemsPerPage}
            searchParams={searchParams}
          />
        </Stack>
      </Container>
    </>
  );
}
