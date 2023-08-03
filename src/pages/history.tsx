import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

interface SampleBooking {
  name: string;
  address: string;
  type: string;
  details: string;
}

function BookingPreview({ name, address, type, details }: SampleBooking) {
  return (
    <Box className="flex min-h-fit w-auto flex-row bg-orange-200">
      <Stack className="max-w-xs">
        <Box className=" h-44 w-80 grow bg-green-200">Image1</Box>
        <Container className="h-auto py-1">
          <Typography>{name}</Typography>
          <Typography>{address}</Typography>
        </Container>
      </Stack>
      <Stack className="max-w-xs">
        <Box className="h-36 w-80 grow bg-green-300">Image2</Box>
        <Container className="h-auto py-1">
          <Typography>{type}</Typography>
          <Typography>{details}</Typography>
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
    results.push(
      <BookingPreview
        name="Some Hotel"
        address="Some Place"
        type="Double Room"
        details="Some Information"
      />
    );
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
        <BookingPreview
          name="A Hotel"
          address="A Place"
          type="Single Room"
          details="Something about booking"
        />
        <BookingList />
      </Stack>
    </>
  );
}
