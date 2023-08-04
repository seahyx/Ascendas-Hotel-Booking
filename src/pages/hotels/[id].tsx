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
import { useRef } from "react";
import TopBarWithSearch from "src/components/search-bar/TopBarWithSearch";
import { DestinationHotel } from "~/utils/destinationHotel";
import { Convert } from "~/utils/destinationPricing";
import { IdPricing } from "~/utils/idPricing";
import { SearchParams, parsedQueryToSearchParams } from "~/utils/searchParams";

export const getServerSideProps: GetServerSideProps<{
  searchParamsJSON?: string;
  hotelDetails?: DestinationHotel;
  hotelPricing?: IdPricing;
}> = async (context) => {
  const query = context.query;
  const id = context.params?.id;
  let searchParams: SearchParams | undefined;
  let hotelDetails: DestinationHotel | undefined;
  let hotelPricing: IdPricing | undefined;

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
      const priceQueryUrl = `https://hotelapi.loyalty.dev/api/hotels/${id}/price?${destQuery}`;
      const resHotelPricing = await fetch(priceQueryUrl);
      hotelPricing = await resHotelPricing.json();
    }
  } else {
    console.error("Error retrieving search parameters from url query string.");
  }
  return {
    props: {
      searchParamsJSON: JSON.stringify(searchParams),
      hotelDetails,
      hotelPricing,
    },
  };
};

export default function HotelDetails({
      searchParamsJSON: searchParams,
      hotelDetails,
      hotelPricing,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const scrollToRooms = useRef();
  const currency = "SGD";

  console.log(searchParams);
  console.log(hotelDetails);
  console.log(hotelPricing);

  return (
    <>
      <Head>
        <title>Hotel Details</title>
        <meta name="description" content="Details of chosen hotel here." />
      </Head>
      <TopBarWithSearch />
      <Container maxWidth="lg" className="my-6">
        <Stack direction="column" spacing={2}>
          <Paper className="flex h-64 w-full flex-row overflow-hidden">
            <Box className="relative h-full w-96 shrink-0">
              <Image
                src={
                  hotelDetails
                    ? `${hotelDetails.image_details.prefix}${hotelDetails.default_image_index}${hotelDetails.image_details.suffix}`
                    : "/img/hotelplaceholder.jpg"
                }
                fill
                alt="Hotel Image"
              />
            </Box>
            <Stack className="h-full grow p-4" direction="column">
              <Stack direction="row">
                <Typography
                  className="me-2 grow font-semibold"
                  component="h1"
                  variant="h4"
                >
                  {hotelDetails?.name}
                </Typography>
                <Rating value={hotelDetails?.rating} precision={0.5} readOnly />
              </Stack>
              <Typography component="h2" variant="subtitle1">
                {hotelDetails?.address}
              </Typography>
              <Link
                href="#"
                component="a"
                underline="hover"
                color="primary.dark"
              >
                See on map
              </Link>
              <Box className="grow" />
              <Stack className="mt-2" direction="row" alignItems="baseline">
                <Typography className="me-2 grow" whiteSpace="nowrap">
                  Select a room starting from:
                </Typography>
                <Typography whiteSpace="nowrap" component="h3" variant="h4">
                  {currency} {123}
                </Typography>
                <Typography>/night</Typography>
              </Stack>
              <Button
                variant="contained"
                size="large"
                className="my-3 w-fit self-end"
              >
                View room options
              </Button>
            </Stack>
          </Paper>

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
