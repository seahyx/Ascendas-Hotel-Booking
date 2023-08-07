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

export interface BookingSummaryProps {
  hotelName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  currency: string;
  roomCount: number;
  adultCount: number;
  childCount: number;
  roomPrice: number;
  roomRate: number;
  taxAndRecoveryCharges: number;
  grandTotal: number;
}

export default function BookingSummary({
  hotelName,
  roomType,
  checkInDate,
  checkOutDate,
  numberOfNights,
  currency,
  roomCount,
  adultCount,
  childCount,
  roomPrice,
  roomRate,
  taxAndRecoveryCharges,
  grandTotal,
}: BookingSummaryProps) {
  return (
    <Card variant="outlined">
      <CardHeader
        title="Booking Summary"
        titleTypographyProps={{ variant: "h5" }}
      />
      <Divider />
      <CardContent>
        <Stack spacing={1} divider={<Divider />}>
          <Box>
            <Typography variant="h6">{hotelName}</Typography>
            <Typography variant="subtitle2">{roomType}</Typography>
            <Typography>Room Only</Typography>
            <Typography>
              {roomCount === 1 ? "1 Room" : `${roomCount} Rooms`} for{" "}
              {adultCount === 1 ? "1 Adult" : `${adultCount} Adults `}
              {childCount === 0
                ? ""
                : childCount === 1
                ? "and 1 Child"
                : `and ${childCount} Children`}
            </Typography>
          </Box>
          <Box>
            <Stack
              direction="row"
              spacing={2}
              className="place-content-between"
            >
              <Typography>Check-in:</Typography>{" "}
              <Typography>{checkInDate}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              className="place-content-between"
            >
              <Typography>Check-out:</Typography>{" "}
              <Typography>{checkOutDate}</Typography>
            </Stack>
            <Typography variant="subtitle2" className="text-end">
              {numberOfNights === 1 ? "1 Night" : `${numberOfNights} Nights`}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              className="place-content-between items-baseline"
            >
              <Typography variant="body2">Avg per room per night:</Typography>
              <Typography className="shrink-0">
                {currency} {roomPrice.toFixed(2)}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack
              direction="row"
              spacing={2}
              className="place-content-between items-baseline"
            >
              <Typography variant="body2">
                Room rate for{" "}
                {numberOfNights === 1 ? "1 Night " : `${numberOfNights} Nights`}
                ,{roomCount === 1 ? "1 Room" : ` ${roomCount} Rooms`}:
              </Typography>
              <Typography>
                {currency} {roomRate.toFixed(2)}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              className="place-content-between items-baseline"
            >
              <Typography variant="body2">
                Tax, Recovery Charges, and Service Fees:
              </Typography>
              <Typography className="shrink-0">
                {currency} {taxAndRecoveryCharges.toFixed(2)}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack
              direction="row"
              spacing={2}
              className="place-content-between items-baseline"
            >
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h4" className="shrink-0">
                {currency} {grandTotal.toFixed(2)}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
