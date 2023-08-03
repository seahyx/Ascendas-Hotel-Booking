import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

function BookingPreview() {
  return (
    <Box className="flex h-64 w-auto flex-row bg-orange-200">
      <Stack>
        <Box className="h-36 w-72 grow bg-green-200">Image1</Box>
        <Container className="h-auto py-1">
          <Typography>Hotel Name</Typography>
          <Typography>Hotel Address</Typography>
        </Container>
      </Stack>
      <Stack>
        <Box className="h-36 w-72 grow bg-green-300">Image2</Box>
        <Container className="h-auto py-1">
          <Typography>Room Type</Typography>
          <Typography>Brief Booking Details</Typography>
        </Container>
      </Stack>
      <Button variant="contained" className="w-24">
        View Full Details
      </Button>
    </Box>
  );
}

function BookingList() {
  const numberOfBookings = 4;
  const results = [];
  for (let i = 0; i < numberOfBookings; i++) {
    results.push(<BookingPreview />);
  }
  return <>{results}</>;
}

export default function BookingHistory() {
  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Profile</title>
        <meta name="description" content="View profile information." />
      </Head>
      <Box className="absolute h-32 w-full" bgcolor="secondary.main"></Box>
      <Stack className="mb-5 mt-40" spacing={6}>
        <BookingPreview />
        <BookingList />
      </Stack>
    </>
  );
}
