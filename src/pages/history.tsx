import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

function BookingPreview() {
  return (
    <Box className="flex h-56 w-auto flex-col bg-orange-200">
      <Box className="">Image1</Box>
      <Container>
        <Typography>Hotel Name</Typography>
        <Typography>Hotel Address</Typography>
      </Container>
      <Box className="">Image2</Box>
      <Container>
        <Typography>Room Type</Typography>
        <Typography>Brief Booking Details</Typography>
      </Container>
      <Button variant="contained">View Full Details</Button>
    </Box>
  );
}

export default function BookingHistory() {
  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Profile</title>
        <meta name="description" content="View profile information." />
      </Head>
      <Box className="absolute h-32 w-full" bgcolor="secondary.main"></Box>
      <Stack className="mt-40" spacing={2}>
        <BookingPreview />
      </Stack>
    </>
  );
}
