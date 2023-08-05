import {
  LocationOnRounded,
  StarRounded,
  StarsRounded,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import TopBarWithSearch from "src/components/search-bar/TopBarWithSearch";
import useSWR from "swr";
import { DestinationHotel } from "~/utils/destinationHotel";
import { Convert } from "~/utils/destinationPricing";
import { IdPricing, Room } from "~/utils/idPricing";
import { SearchParams, parsedQueryToSearchParams } from "~/utils/searchParams";

const TitleSection = ({
  hotelDetails,
}: {
  hotelDetails?: DestinationHotel;
}) => {
  const SubItemContainer = ({ children }: { children?: ReactNode }) => (
    <Box className="flex flex-row items-center gap-2">{children}</Box>
  );
  const city = hotelDetails?.original_metadata.city;
  const state = hotelDetails?.original_metadata.state;

  return (
    <Stack direction="row" className="w-full">
      <Stack direction="column" spacing={1}>
        <Typography component="h1" variant="h2">
          {hotelDetails?.name}
        </Typography>
        <Stack direction="row" spacing={3} className="items-center">
          <SubItemContainer>
            <StarRounded color="primary" />
            <Typography variant="subtitle1">
              <strong>{hotelDetails?.trustyou.score.kaligo_overall}</strong>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              TrustYou™ Rating
            </Typography>
          </SubItemContainer>
          <SubItemContainer>
            <Rating
              value={hotelDetails?.rating}
              precision={0.5}
              sx={{ color: "primary.light" }}
              readOnly
            />
            <Typography color="text.secondary">
              {hotelDetails?.rating}-Star Hotel
            </Typography>
          </SubItemContainer>
          <SubItemContainer>
            <LocationOnRounded color="primary" />
            <Typography color="text.secondary">
              {hotelDetails?.address}
              {city ? `, ${city}` : ""}
              {state ? `, ${state}` : ""}
            </Typography>
          </SubItemContainer>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<{
  searchParamsJSON?: string;
  hotelDetails?: DestinationHotel;
  hotelPricing?: IdPricing;
  pricingQueryUrl?: string;
}> = async (context) => {
  const query = context.query;
  const id = context.params?.id as string;
  let searchParams: SearchParams | undefined;
  let hotelDetails: DestinationHotel | undefined;
  let hotelPricing: IdPricing | undefined;
  let pricingQueryUrl: string | undefined;

  if (id) {
    const resHotelDetails = await fetch(
      `https://hotelapi.loyalty.dev/api/hotels/${id}`
    );
    hotelDetails = await resHotelDetails.json();
  }

  if (query.uid) {
    searchParams = parsedQueryToSearchParams(query);
    if (id) {
      const pricingSearchParams =
        Convert.searchParamsToPricingSearchParams(searchParams);
      const destQuery = Convert.buildDestinationPricingQueryUrl(
        pricingSearchParams,
        true
      );
      // API url to be called from the server to pre-load the request
      pricingQueryUrl = `https://hotelapi.loyalty.dev/api/hotels/${id}/price?${destQuery}`;
      const resHotelPricing = await fetch(pricingQueryUrl);
      hotelPricing = await resHotelPricing.json();

      // Change url to be client-side compatible
      pricingQueryUrl = Convert.buildHotelPricingQueryUrl(
        pricingSearchParams,
        id
      );
    }
  } else {
    console.error("Error retrieving search parameters from url query string.");
  }
  return {
    props: {
      searchParamsJSON: JSON.stringify(searchParams),
      hotelDetails,
      hotelPricing,
      pricingQueryUrl,
    },
  };
};

export default function HotelDetails({
      searchParamsJSON,
      hotelDetails,
      pricingQueryUrl,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const scrollToRooms = useRef();
  const currency = "SGD";
  const [startingPrice, setStartingPrice] = useState(0);

  // console.log(hotelDetails);
  console.log(pricingQueryUrl);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const checkSearchComplete = (data: IdPricing) => {
    if (!data || data.completed) return 0;
    return 500;
  };
  const onPricingResponse = (data: IdPricing) => {
    console.log(data);
    if (data.completed) {
      const rooms: Room[] = data.rooms ?? [];
      setStartingPrice(
        rooms.reduce((prev, curr) => {
          if (
            prev === -1 ||
            (curr.lowest_converted_price && prev > curr.lowest_converted_price)
          ) {
            return curr.lowest_converted_price ?? -1;
          }
          return -1;
        }, -1)
      );
    }
  };
  const { data: hotelPricing }: { data: IdPricing } = useSWR(
    pricingQueryUrl,
    fetcher,
    {
      refreshInterval: checkSearchComplete,
      onSuccess: onPricingResponse,
    }
  );

  return (
    <>
      <Head>
        <title>{hotelDetails?.name} - SUTDHotelBooking</title>
        <meta name="description" content="Details of chosen hotel here." />
      </Head>
      <TopBarWithSearch />
      <Container maxWidth="lg" className="my-6">
        <Stack direction="column" spacing={2}>
          <TitleSection hotelDetails={hotelDetails} />
          <Box
            className="grid h-96 w-full grid-flow-dense grid-cols-4 gap-4 overflow-hidden"
            borderRadius={1}
          >
            <Box className="col-span-2 row-span-2 bg-slate-600"></Box>
            <Box className="bg-slate-300"></Box>
            <Box className="bg-slate-300"></Box>
            <Box className="bg-slate-300"></Box>
            <Box className="bg-slate-300"></Box>
          </Box>
          <Box>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  component="h2"
                  variant="h5"
                  className="font-semibold"
                >
                  Hotel overview
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: hotelDetails?.description ?? "",
                  }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  component="h2"
                  variant="h5"
                  className="font-semibold"
                >
                  Facilities and features
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Hotel description go here</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  component="h2"
                  variant="h5"
                  className="font-semibold"
                >
                  Room options
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Hotel description go here</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  component="h2"
                  variant="h5"
                  className="font-semibold"
                >
                  Reviews
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Hotel description go here</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  component="h2"
                  variant="h5"
                  className="font-semibold"
                >
                  Location
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Hotel description go here</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
