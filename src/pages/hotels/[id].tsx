import {
  Box,
  Button,
  CardActionArea,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import GoogleMap from "google-maps-react-markers";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import TopBarWithSearch from "src/components/search-bar/TopBarWithSearch";
import useSWR from "swr";
import ExpandableBox from "~/components/ExpandableBox";
import Marker from "~/components/google-map/Marker";
import { AmenitiesRatingSection } from "~/components/hotel-page/AmenitiesRatingSection";
import { ImageSection } from "~/components/hotel-page/ImageSection";
import { OverviewChips } from "~/components/hotel-page/OverviewChips";
import { RoomSection } from "~/components/hotel-page/RoomSection";
import { TitleSection } from "~/components/hotel-page/TitleSection";
import { toCapitalizedWords } from "~/utils/camelToCapitalized";
import { DestinationHotel } from "~/utils/destinationHotel";
import { Convert } from "~/utils/destinationPricing";
import { IdPricing, Room } from "~/utils/idPricing";
import {
  DefaultValues,
  SearchParams,
  jsonToSearchParams,
  parsedQueryToSearchParams,
  searchParamsToDefaultValues,
} from "~/utils/searchParams";
import { DateSelectorPopper } from "../../components/search-bar/DateSelectorPopper";
import { GuestSelectorPopper } from "~/components/search-bar/GuestSelectorPopper";
import { differenceInDays } from "date-fns";

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
  const roomsHeaderRef = useRef<HTMLHeadingElement>(null);
  const currency = "SGD";
  const [startingPrice, setStartingPrice] = useState(0);

  // console.log(hotelDetails);
  // console.log(pricingQueryUrl);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const checkSearchComplete = (data: IdPricing) => {
    if (!data || data.completed) return 0;
    return 500;
  };
  const onPricingResponse = (data: IdPricing) => {
    // console.log(data);
    if (data.completed) {
      const rooms: Room[] = data.rooms ?? [];
      setStartingPrice(
        rooms.reduce((prev, curr) => {
          if (prev === -1 || (curr.price && prev > curr.price)) {
            return curr.price ?? -1;
          }
          return prev;
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

  const searchParams: SearchParams | undefined = searchParamsJSON
    ? jsonToSearchParams(searchParamsJSON)
    : undefined;
  const defaultValues: DefaultValues | undefined =
    searchParamsToDefaultValues(searchParams);
  // console.log(searchParams);

  // Check in/out date range picker
  const checkInOutRef = useRef(null);

  const defaultCheckInOutText = "Check-in/out";
  const [checkInOutErr, setCheckInOutErr] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date>(
    searchParams?.checkInDate ?? new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    searchParams?.checkOutDate ?? new Date()
  );
  const [checkInOutText, setCheckInOutText] = useState(defaultCheckInOutText);
  const [checkInOutPopperAnchor, setCheckInOutPopperAnchor] =
    useState<null | HTMLElement>(null);

  const handleCheckInOutClick = () => {
    setCheckInOutErr(false);
    setCheckInOutPopperAnchor(
      checkInOutPopperAnchor ? null : checkInOutRef.current
    );
  };

  // Guest selector
  const guestRef = useRef(null);

  const defaultGuestText = "Guests/Rooms";
  const [guestErr, setGuestErr] = useState(false);
  const [guestText, setGuestText] = useState(defaultGuestText);
  const [guestPopperAnchor, setGuestPopperAnchor] =
    useState<null | HTMLElement>(null);

  const handleGuestSelectorClick = () => {
    setGuestErr(false);
    setGuestPopperAnchor(guestPopperAnchor ? null : guestRef.current);
  };

  const [numAdults, setNumAdults] = useState(searchParams?.adults ?? 1);
  const [numChild, setNumChild] = useState(searchParams?.child ?? 0);
  const [numRooms, setNumRooms] = useState(searchParams?.rooms ?? 1);

  return (
    <>
      <Head>
        <title>{hotelDetails?.name} - SUTDHotelBooking</title>
        <meta name="description" content="Details of chosen hotel here." />
      </Head>
      <TopBarWithSearch defaultValues={defaultValues} />
      <Container maxWidth="lg" className="my-6">
        <Stack direction="column" spacing={3}>
          <TitleSection hotelDetails={hotelDetails} />
          <ImageSection hotelDetails={hotelDetails} />
          <Stack direction="row" spacing={2}>
            <Stack direction="column" className="grow">
              <Typography component="h2" variant="h4">
                Hotel Overview
              </Typography>
              <OverviewChips hotelDetails={hotelDetails} />
              <ExpandableBox maxHeightRem={20}>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: hotelDetails?.description ?? "",
                  }}
                />
              </ExpandableBox>
              <Typography component="h2" variant="h4" className="mt-6">
                Ratings
              </Typography>
              <AmenitiesRatingSection hotelDetails={hotelDetails} />
              <Typography component="h2" variant="h4" className="mt-6">
                Location
              </Typography>
              <Box className="mt-3 h-[32rem] overflow-hidden" borderRadius={1}>
                <GoogleMap
                  apiKey=""
                  defaultCenter={
                    hotelDetails?.latitude && hotelDetails.longitude
                      ? {
                          lat: hotelDetails.latitude,
                          lng: hotelDetails.longitude,
                        }
                      : undefined
                  }
                  defaultZoom={18}
                >
                  {hotelDetails && (
                    <Marker
                      lat={hotelDetails.latitude}
                      lng={hotelDetails.longitude}
                      tooltip={hotelDetails.name}
                      color="primary"
                    />
                  )}
                </GoogleMap>
              </Box>
            </Stack>
            <Stack direction="column" className="w-96 shrink-0" spacing={2}>
              <Paper variant="outlined" className="p-6">
                <Typography>Rooms available starting from</Typography>
                <Stack
                  direction="row"
                  className="place-content-between items-baseline"
                >
                  <Typography variant="h5">
                    {currency}{" "}
                    {startingPrice > 0 && searchParams
                      ? (
                          startingPrice /
                          differenceInDays(
                            searchParams?.checkOutDate,
                            searchParams?.checkInDate
                          ) /
                          searchParams.rooms
                        ).toFixed(0)
                      : startingPrice}
                  </Typography>
                  <Typography
                    className="shrink-0"
                    color="text.secondary"
                    variant="body2"
                  >
                    *incl. taxes and fees
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  per room per night
                </Typography>

                <DateSelectorPopper
                  onCheckInDateChange={setCheckInDate}
                  onCheckOutDateChange={setCheckOutDate}
                  onSetCheckInOutText={(text) => setCheckInOutText(text)}
                  onClickAway={() => setCheckInOutPopperAnchor(null)}
                  showError={checkInOutErr}
                  showTextOnStart={true}
                  anchorEl={checkInOutPopperAnchor}
                  defaultValues={defaultValues}
                >
                  <CardActionArea
                    className="mt-4 p-3"
                    ref={checkInOutRef}
                    sx={{
                      border: 1,
                      borderRadius: 1,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    onClick={handleCheckInOutClick}
                  >
                    <Typography className="text-center">
                      {checkInOutText}
                    </Typography>
                  </CardActionArea>
                </DateSelectorPopper>
                <GuestSelectorPopper
                  onAdultsChange={setNumAdults}
                  onChildChange={setNumChild}
                  onRoomsChange={setNumRooms}
                  anchorEl={guestPopperAnchor}
                  onClickAway={() => setGuestPopperAnchor(null)}
                  onSetGuestsText={setGuestText}
                  showError={guestErr}
                  defaultValues={defaultValues}
                >
                  <CardActionArea
                    className="p-3"
                    sx={{
                      border: 1,
                      borderTop: 0,
                      borderRadius: 1,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                    ref={guestRef}
                    onClick={handleGuestSelectorClick}
                  >
                    <Typography className="text-center">{guestText}</Typography>
                  </CardActionArea>
                </GuestSelectorPopper>

                <Typography color="text.secondary" className="mt-4">
                  {hotelPricing?.rooms?.length} rooms available
                </Typography>
                <Button
                  variant="contained"
                  className="mt-3 w-full"
                  onClick={() =>
                    roomsHeaderRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  See Room Options
                </Button>
              </Paper>
              <Paper variant="outlined" className="p-6">
                <Typography component="h3" variant="h6">
                  Amenities
                </Typography>
                <Stack direction="row" className="mt-3 flex-wrap gap-2">
                  {Object.keys(hotelDetails?.amenities ?? {}).map((key) => (
                    <Chip key={key} label={toCapitalizedWords(key)} />
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Stack>
          <Typography ref={roomsHeaderRef} component="h2" variant="h4">
            Room Options
          </Typography>
          <RoomSection
            hotelRooms={hotelPricing?.rooms}
            searchParams={searchParams}
            hotelDetails={hotelDetails}
          />
        </Stack>
      </Container>
    </>
  );
}
