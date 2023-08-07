import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import BookingSummary from "~/components/BookingSummary";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Convert, Hotels } from "~/server/api/idHotel";
// const hotels = Convert.toHotels(json);

export default function Confirmation() {
  const bookingData = {
    bookerName: "Mr John Doe",
    bookingID: 123456789,
    paymentID: 333444555,
    payerID: 111222333,
    hotelName: "Hotel California",
    roomType: "Deluxe Room",
    checkInDate: "2023-08-08",
    checkOutDate: "2023-08-10",
    numberOfNights: 2,
    currency: "SGD",
    adultCount: 2,
    childCount: 2,
    roomPrice: 200, // Example room price
    roomRate: 400,
    taxAndRecoveryCharges: 50, // Example tax and charges
    grandTotal: 500, // Example total
    messageToHotel: "Please prepare a baby cot for my child.",
  };
  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Booking Confirmation</title>
        <meta name="description" content="Booking Confirmation" />
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

        
          <Box style={{ flex: 1 }}>
            <BookingSummary {...bookingData} />
          </Box>

          <Box style={{ flex: 1 }}>
            <Accordion className="mt-6 mb-6 w-full border-gray-300" variant="outlined">
              <AccordionSummary>
                <Typography variant="h6">Cancellation Policy</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  This booking is non-refundable from 22/4/2023, 16:00 onwards. Cancellation
                  before 22/4/2023 16:00 will incur a 50% cancellation fee. All times indicated
                  are in the GTC +8 timezone. Regardless of the cancellation policy, a 10%
                  cancellation fee of the total refundable amount of the booking will be
                  charged.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className="mt-6 mb-6 w-full border-gray-300" variant="outlined">
              <AccordionSummary>
                <Typography variant="h6">Amendment Policy</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  To amend your booking in any way, you will have to cancel your current
                  reservation booking subject to the current cancellation policy before making
                  a new booking based on the prevailing rates and availability.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className="mt-6 mb-6 w-full border-gray-300" variant="outlined">
              <AccordionSummary>
                <Typography variant="h6">Further Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Club benefits are not included in this booking. If you would like to add on
                  any club benefits, please contact the hotel directly at hotel@hotel.com.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

        
      </Container>
    </>
  );
}
