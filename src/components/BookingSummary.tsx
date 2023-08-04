import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Box,
} from "@mui/material";

interface BookingSummaryProps {
  hotelName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  currency: string;
  roomCount: number;
  adultCount: number;
  roomPrice: number;
  roomRate: number;
  taxAndRecoveryCharges: number;
  grandTotal: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  hotelName,
  roomType,
  checkInDate,
  checkOutDate,
  numberOfNights,
  currency,
  roomCount,
  adultCount,
  roomPrice,
  roomRate,
  taxAndRecoveryCharges,
  grandTotal,
}) => {
  return (
    <Card>
      <CardHeader
        title="Booking Summary"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <Box marginBottom={2}>
          <Typography variant="h6">{hotelName}</Typography>
          <Typography fontWeight="bold">{roomType}</Typography>
          <Typography>Room Only</Typography>
          <Typography>
            {roomCount === 1 ? "1 Room" : `${roomCount} Rooms`} for{" "}
            {adultCount === 1 ? "1 Guest" : `${adultCount} Guests`}
          </Typography>
        </Box>
        <Divider />
        <Box marginBottom={2}>
          <Typography>Check-in: {checkInDate}</Typography>
          <Typography>Check-out: {checkOutDate}</Typography>
          <Typography>
            {numberOfNights === 1 ? "1 Night" : `${numberOfNights} Nights`}
          </Typography>
          <Typography>
            Average per room per night: {currency} {roomPrice}
          </Typography>
        </Box>
        <Divider />
        <Box fontWeight="bold" marginBottom={2}>
          <Typography>
            Room rate for{" "}
            {numberOfNights === 1 ? "1 Night" : `${numberOfNights} Nights`},
            {roomCount === 1 ? "1 Room" : `${roomCount} Rooms`} : {currency}{" "}
            {roomRate}
          </Typography>
          <Typography>
            Tax Recovery Charges And Service Fees: {currency}{" "}
            {taxAndRecoveryCharges}
          </Typography>
        </Box>
        <Divider />
        <Box fontWeight="bold">
          <Typography fontSize="1.2em">
            Total: {currency} {grandTotal}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
