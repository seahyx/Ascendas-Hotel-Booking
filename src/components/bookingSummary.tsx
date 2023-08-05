import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Box,
  Stack,
} from "@mui/material";

interface BookingSummaryProps {
  bookerName: string;
  bookingID: number;
  paymentID: number;
  payerID: number;
  hotelName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  currency: string;
  adultCount: number;
  childCount: number;
  roomPrice: number;
  roomRate: number;
  taxAndRecoveryCharges: number;
  grandTotal: number;
  messageToHotel: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookerName,
  bookingID,
  paymentID,
  payerID,
  hotelName,
  roomType,
  checkInDate,
  checkOutDate,
  numberOfNights,
  currency,
  adultCount,
  childCount,
  roomPrice,
  roomRate,
  taxAndRecoveryCharges,
  grandTotal,
  messageToHotel,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}>
    <Card variant="outlined" className='mt-8'>
      <Typography
        className="ml-4 mt-2 mb-2 font-semibold"
        component="h3"
        variant="h5"  
      >
        Booking Summary
      </Typography>
      <Divider />
      <CardContent>
        <Box marginBottom={1}>
          <Typography className='text-base/loose'>
            Booker Name: {bookerName}
            <br />
            Hotel Name: <strong>{hotelName}</strong>
            <br />
            Room Type: {roomType}
            <br />
            Number of Guests: {adultCount} Adults and {childCount} Children
          </Typography>
        </Box>
        <Divider />
        <Box marginBottom={1}>
          <Typography className='text-base/loose'>
            Check-In Date: {checkInDate}
            <br />
            Check-Out Date: {checkOutDate}
            <br />
            Number of Nights: {numberOfNights}
            <br />
            Booking ID : {bookingID}
            <br />
            Payment ID : {paymentID}
            <br />
            Payer ID : {payerID}
          </Typography>
        </Box>
        <Divider />
        <Box marginBottom={1}>
          <Typography className='text-base/loose'>
            Message to Hotel: {messageToHotel}
          </Typography>
        </Box>
      </CardContent>
    </Card>
    <Card variant="outlined" className='mt-8'>
      <Typography
        className="ml-4 mt-2 mb-2 font-semibold"
        component="h3"
        variant="h5"  
      >
        Invoice
      </Typography>
      <Divider />
      <CardContent>
        <Stack
        direction='row'>
        <Box marginBottom={1} >
          <Typography className='text-base/loose'>
            Total Booking Fee: 
            <br />
            <br />
            Tax Recovery Charges And Service Fees: 
            <br />
            <br />

          </Typography>
        </Box>
        <Box marginBottom={1} className='flex-1' >
          <Typography className='text-base/loose text-right'>
            {currency} {roomPrice} x {numberOfNights} Night(s)
            <br />
            <br />
            {currency} {taxAndRecoveryCharges}
            <br />
            <br />

          </Typography>
        </Box>
        </Stack>
        <Divider />
        <Stack
        direction='row'>
        <Box marginBottom={1} >
          <Typography className='text-base/loose'>
            <br />
            <strong>Total:</strong> 
            <br />

          </Typography>
        </Box>
        <Box marginBottom={1} className='flex-1'>
          <Typography className='text-base/loose text-right'>
            <br />
            {currency} {+roomRate + +taxAndRecoveryCharges} 
            <br />
          </Typography>
        </Box>
        </Stack>
      </CardContent>
    </Card>
    </Stack>
  );
};

export default BookingSummary;