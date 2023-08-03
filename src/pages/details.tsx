import {
  Box,
  Button,
  Container,
  Rating,
  Typography,
  Stack,
} from "@mui/material";
import Head from "next/head";
import { useRef } from "react";
import TopBarWithSearch from "~/components/TopBarWithSearch";
import RoomOption from "~/components/RoomOption";
import parse from "html-react-parser";

function TrustYouBox() {
  return (
    <Box className="my-10 flex h-64 w-10/12 bg-orange-100">
      <Container className="w-2/3 p-2">
        <Typography>Trust You Box</Typography>
      </Container>
      <Container></Container>
    </Box>
  );
}

interface OverviewBoxProps {
  description: string;
}

function OverviewBox({ description }: OverviewBoxProps) {
  /*const paragraphs = description
    .split("</p>")
    .map((paragraph, index) => (
      <Typography key={index}>{parse(paragraph + "</p>")}</Typography>
    ));*/

  return (
    <Box className="my-10 h-auto w-10/12 bg-gray-200">
      <Typography>Hotel overview</Typography>
      <Typography>{description}</Typography>
      {/*{paragraphs}*/}
    </Box>
  );
}

function RoomOptions() {
  return (
    <Stack className="my-10 w-10/12" spacing={6}>
      <RoomOption roomOptionName="Deluxe Room" imageURL="image" />
    </Stack>
  );
}

function Location() {
  return <Box className="my-10 h-48 w-10/12 bg-yellow-200"></Box>;
}

export default function SearchResults() {
  const scrollToRooms = useRef();
  const description = "Description";
  /*"<p><b>Property Location</b> <br />With a stay at The Fullerton Hotel Singapore, you'll be centrally located in Singapore, steps from Cavenagh Bridge and Anderson Bridge.  This 5-star hotel is close to Chinatown Heritage Center and <b>Universal Studios Singapore</b>®.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 400 individually furnished guestrooms, featuring refrigerators and plasma televisions. Complimentary wired and wireless Internet access keeps you connected, and satellite programming provides entertainment. Private bathrooms with separate bathtubs and showers feature deep soaking bathtubs and complimentary toiletries. Conveniences include phones, as well as laptop-compatible safes and desks.</p><p><b>Amenities</b> <br />Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. If you're looking for recreational opportunities, you'll find an outdoor pool and a fitness center. This Colonial hotel also features complimentary wireless Internet access, concierge services, and gift shops/newsstands. Guests can get to nearby shops on the complimentary shuttle.</p><p><b>Dining</b> <br />Grab a bite at one of the hotel's 5 restaurants, or stay in and take advantage of 24-hour room service. Quench your thirst with your favorite drink at a bar/lounge. Buffet breakfasts are available for a fee.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include complimentary high-speed (wired) Internet access, a 24-hour business center, and limo/town car service. Planning an event in Singapore? This hotel has 7524 square feet (699 square meters) of space consisting of a conference center and meeting rooms. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and free self parking is available onsite.</p>";*/
  return (
    <>
      <Head>
        <title>Hotel Details</title>
        <meta name="description" content="Details of chosen hotel here." />
      </Head>
      <TopBarWithSearch />
      <Box className="m-10 flex h-64 w-auto bg-orange-100">
        <Box className="h-auto w-72 bg-green-400 object-left">Image</Box>
        <Box className="h-auto w-96 bg-slate-400">
          <Container className="mt-2 flex h-auto w-full flex-col">
            <Typography className=" font-bold" fontSize={20}>
              Hotel Name
            </Typography>
            <Typography>Address</Typography>
            <Typography fontSize={12}>Map Hyperlink</Typography>
          </Container>
        </Box>
        <Box className="flex h-auto w-auto flex-col bg-slate-500">
          <Rating className="mx-2 pb-20" value={3} readOnly></Rating>
          <Typography className="pt-10">Price</Typography>
          <Button
            className=" w-28"
            variant="contained"
            onClick={() => scrollToRooms.current.scrollIntoView()}
          >
            See Room Options
          </Button>
        </Box>
      </Box>
      <OverviewBox description={description} />
      <TrustYouBox />
      <Box ref={scrollToRooms}>
        <RoomOptions />
      </Box>
      <Location />
    </>
  );
}
