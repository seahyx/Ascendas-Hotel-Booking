import { Box, Button, Container, Rating, Typography, Stack } from "@mui/material";
import Head from "next/head";
import { useRef } from "react";
import TopBarWithSearch from "~/components/TopBarWithSearch";
import RoomOption from "../components/RoomOption";

function OverviewBox() {
  return (
    <Box className="my-10 w-10/12 h-64 flex bg-orange-100">
      <Container className="w-2/3 p-2">
        <Typography >Hotal Overview</Typography>
      </Container>
      <Container>

      </Container>
    </Box>
  );
}

function InformationBox() {
  return (
    <Box className="my-10 h-96 w-10/12 bg-gray-200">

    </Box>
  );
}

function RoomOptions() {
  return (
    <>
      <Typography className="font-bold text-lg">Room Options</Typography>
      <Stack className="my-10 w-auto" spacing={2}>
        <RoomOption/>
        <RoomOption/>
      </Stack>
    </>
  );
}

function Location() {
  return (
    <>
      <Typography className="font-bold text-lg">Location</Typography>
      <Box className="my-10 h-48 w-10/12 bg-yellow-200"></Box>
    </>
  );
}

export default function SearchResults() {
  const scrollToRooms = useRef(null);
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
        <Container className="flex h-auto w-full flex-col">
          <Typography className=" font-bold" fontSize={20}>Hotel Name</Typography>
          <Typography>Address</Typography>
          <Typography fontSize={12}>Map Hyperlink</Typography>
        </Container>
        </Box>
        <Box className="h-auto w-auto flex flex-col bg-slate-500">
          <Rating className="mx-2 pb-20" value={3} readOnly></Rating>
          <Typography className="pt-10">Price</Typography>
          <Button className=" w-28" variant="contained" onClick={()=>scrollToRooms.current.scrollIntoView()}>See Room Options</Button>
			  </Box>
      </Box>
      <OverviewBox />
      <InformationBox />
      <Box ref={scrollToRooms}>
        <RoomOptions />
      </Box>
      <Location />
    </>
  );
}
