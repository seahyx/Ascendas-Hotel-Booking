import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import BookingSummary, {
  BookingSummaryProps,
} from "~/components/BookingSummary";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { getBookingWithId } from "~/server/api/bookingFunctions";
import { format, parseJSON } from "date-fns";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Prisma, type Booking } from "@prisma/client";

export const getServerSideProps: GetServerSideProps<{
  bookingId: string;
  bookingDataJSON?: string;
}> = async (context) => {
  const query = context.query;
  const bookingId = (query.bookingId ?? "") as string;
  const bookingData = await getBookingWithId(parseInt(bookingId));
  console.log(bookingData);
  return {
    props: {
      bookingId,
      bookingDataJSON: bookingData ? JSON.stringify(bookingData) : undefined,
    },
  };
};

export default function Confirmation(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { bookingId, bookingDataJSON } = props;
  const obj = bookingDataJSON ? JSON.parse(bookingDataJSON) : undefined;
  if (obj) {
    obj.startDate = parseJSON(obj.startDate);
    obj.endDate = parseJSON(obj.endDate);
    obj.roomRate = new Prisma.Decimal(obj.roomRate);
    obj.tax = new Prisma.Decimal(obj.tax);
    obj.avgRoomCost = new Prisma.Decimal(obj.avgRoomCost);
  }
  const bookingData: Booking | undefined = obj;

  const bookingSummaryProps: BookingSummaryProps = {
    hotelName: "",
    roomType: bookingData?.roomType ?? "",
    checkInDate: format(bookingData?.startDate ?? new Date(), "dd MMM yyyy"),
    checkOutDate: format(bookingData?.endDate ?? new Date(), "dd MMM yyyy"),
    numberOfNights: bookingData?.numberOfNights ?? 0,
    currency: "SGD",
    roomCount: bookingData?.numberOfRooms ?? 0,
    adultCount: bookingData?.adults ?? 0,
    childCount: bookingData?.children ?? 0,
    roomPrice: bookingData?.avgRoomCost.toNumber() ?? 0,
    roomRate: bookingData?.roomRate.toNumber() ?? 0,
    taxAndRecoveryCharges: bookingData?.tax.toNumber() ?? 0,
    grandTotal: bookingData
      ? bookingData.tax.toNumber() + bookingData.roomRate.toNumber()
      : 0,
  };

  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Booking Confirmation</title>
        <meta name="description" content="Booking Confirmation" />
      </Head>
      <Box className="h-32 w-full" bgcolor="secondary.main"></Box>
      <Container maxWidth="md" className="my-8 w-full">
        <Box className="my-8 flex w-full place-content-center">
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
        <Typography className="my-6 text-center">
          We are pleased to inform you that your booking is complete and your
          reservation has been confirmed.
        </Typography>

        <Box className="flex w-full flex-col">
          <BookingSummary {...bookingSummaryProps} />
        </Box>

        <Box className="flex flex-col">
          <Accordion className="mt-6 w-full" variant="outlined">
            <AccordionSummary>
              <Typography variant="h6">Cancellation Policy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                This booking is non-refundable from 22/4/2023, 16:00 onwards.
                Cancellation before 22/4/2023 16:00 will incur a 50%
                cancellation fee. All times indicated are in the GTC +8
                timezone. Regardless of the cancellation policy, a 10%
                cancellation fee of the total refundable amount of the booking
                will be charged.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="w-full" variant="outlined">
            <AccordionSummary>
              <Typography variant="h6">Amendment Policy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                To amend your booking in any way, you will have to cancel your
                current reservation booking subject to the current cancellation
                policy before making a new booking based on the prevailing rates
                and availability.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="w-full" variant="outlined">
            <AccordionSummary>
              <Typography variant="h6">Further Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Club benefits are not included in this booking. If you would
                like to add on any club benefits, please contact the hotel
                directly at hotel@hotel.com.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
