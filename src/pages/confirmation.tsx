import {
  Box,
  Button,
  Card,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export default function Confirmation() {
  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Login</title>
        <meta name="description" content="Login or register a new account." />
      </Head>
      <Box className="h-32 w-full" bgcolor="secondary.main"></Box>
      <Container className="mt-4 w-full">
        <Box className="mt-16 flex w-full place-content-center">
          <Image
            src="/BookingTick.png"
            alt="Booking Confirmed"
            width={100}
            height={100}
          />
        </Box>
        <Typography
          className="font-semibold "
          component="h1"
          variant="h4"
          align="center"
        >
          Booking Confirmed
        </Typography>
        <Typography className="mt-6 text-center">
          We are pleased to inform you that your booking is complete and your
          reservation has been confirmed.
        </Typography>
        <Stack className="mb-10 mt-10" direction="row" spacing={2}>
          <Card className="mt-6 w-8/12 border-gray-300" variant="outlined">
            <Typography
              className="ml-3 mt-1 font-semibold underline"
              component="h3"
              variant="h5"
            >
              Booking Details
            </Typography>
            <Typography className="ml-3 text-base/loose">
              Booking ID: 123456789
              <br />
              Room Type: Deluxe Room with Queen-size Beds
              <br />
              Check-in Date/Time: 23/4/2023 16:00
              <br />
              Check-out Date/Time: 24/4/2023 12:00
              <br />
              Number of Adults/Children: 2/0
            </Typography>
            <Typography className="ml-3 mt-5 text-xl font-semibold">
              Total Price: $200
            </Typography>
          </Card>
          <Card className="mt-6 w-4/12 border-gray-300" variant="outlined">
            <Typography
              className="ml-3 mt-1 font-semibold underline"
              component="h3"
              variant="h5"
            >
              Additional Information
            </Typography>
            <Typography className="ml-3 mt-2 text-lg underline">
              Cancellation Policy
            </Typography>
            <Typography className="ml-3 text-sm">
              This booking is non-refundable from 22/4/2023, 16:00 onwards.
              Cancellation before 22/4/2023 16:00 will incur a 50% cancellation
              fee. All times indicated are in the GTC +8 timezone. Regardless of
              the cancellation policy, a 10% cancellation fee of the total
              refundable amount of the booking will be charged.
            </Typography>
            <Typography className="ml-3 mt-2 text-lg underline">
              Amendment Policy
            </Typography>
            <Typography className="ml-3 text-sm">
              To amend your booking in any way, you will have to cancel your
              current reservation booking subject to the current cancellation
              policy before making a new booking based on the prevailing rates
              and availability.
            </Typography>
            <Typography className="ml-3 mt-2 text-lg underline">
              Further Information
            </Typography>
            <Typography className="ml-3 text-sm">
              Club benefits are not included in this booking. If you would like
              to add on any club benefits, please contact the hotel directly at
              hotel@hotel.com.
            </Typography>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
