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
import { parseJSON } from "date-fns";
import GoogleMapReact from "google-map-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopBarWithSearch from "src/components/search-bar/TopBarWithSearch";
import HotelSearchResultList from "src/components/search-page/HotelSearchResultList";
import {
  Convert,
  DestinationPricing,
  PricingSearchQueryParams,
} from "src/utils/destinationPricing";
import useSWR from "swr";
import { SearchParams } from "../components/search-bar/SearchBar";

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
    zoom: 11,
  };

  return (
    <Stack className="w-64 shrink-0 self-start" spacing={2}>
      <Paper className="h-52 overflow-hidden">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultMapProps.center}
          defaultZoom={defaultMapProps.zoom}
        ></GoogleMapReact>
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

export default function SearchResults(props) {
  const maxItemsPerPage = 10;

  // Search result update
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const checkSearchComplete = (data: DestinationPricing) => {
    // console.log(data);
    if (!data || data.completed) return 0;
    return 500;
  };
  const [url, setUrl] = useState<string | null>(null);
  const { data }: { data: DestinationPricing } = useSWR(url, fetcher, {
    refreshInterval: checkSearchComplete,
  });

  // Attempt to extract search params
  const { search } = router.query;

  useEffect(() => {
    if (search) {
      const searchParams: SearchParams = JSON.parse(search as string);
      searchParams.checkInDate = searchParams.checkInDate
        ? parseJSON(searchParams.checkInDate)
        : new Date();
      searchParams.checkOutDate = searchParams.checkOutDate
        ? parseJSON(searchParams.checkOutDate)
        : new Date();
      // console.log(searchParams);
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
      // console.log(pricingSearchParams);
      const url = Convert.buildDestinationPricingQueryUrl(pricingSearchParams);
      console.log(url);
      setUrl(url);
    }
  }, [search]);

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
          />
        </Stack>
      </Container>
    </>
  );
}
