import {
  TextField,
  Box,
  Button,
  Container,
  Rating,
  Typography,
  Stack,
  FormControl,
  FormControlLabel,
  Divider,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import TopBarWithSearch from "~/components/TopBarWithSearch";
import RoomOption from "~/components/RoomOption";
import RoomOptionVariation from "~/components/RoomOptionVariation";
import DropdownTitle from "~/components/DropdownTitle";
import CountrySelect from "~/components/CountrySelect";
import PhoneNumber from "~/components/PhoneNumber";
import BookingSummary from "~/components/bookingSummary";

function PrimaryGuestBox() {
  //Title Dropdown
  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  //Phone Number Text Field
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
  };
  return (
    <Box
      className="my-10 flex h-auto w-auto bg-green-100"
      style={{ display: "flex", flexDirection: "column", padding: "10px" }}
    >
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Typography>Primary Guest</Typography>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Title
          </Box>
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <DropdownTitle
              label="Title"
              value={title}
              onChange={handleTitleChange}
            />
          </Box>
        </Box>
        <Box
          style={{
            flex: 5,
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            First name
          </Box>
          <TextField id="first-name" variant="outlined" />
        </Box>
        <Box
          style={{
            flex: 5,
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Last name
          </Box>
          <TextField id="last-name" variant="outlined" />
        </Box>
      </Box>
      <Box
        style={{ display: "flex", flexDirection: "column", padding: "10px" }}
      >
        <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
          Phone Number
        </Box>
        <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
          <PhoneNumber
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Box>
        <Box />
        <Box
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Special Requests
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField
              id="special-requests"
              placeholder="We will pass on the requests to the hotel."
              multiline
              rows={4}
              defaultValue=""
              style={{ width: 700 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function PaymentInformationBillingAddress() {
  return (
    <Box
      className="my-10 h-auto w-auto bg-purple-200"
      style={{ display: "flex", flexDirection: "column", padding: "10px" }}
    >
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Typography>Payment Information</Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            width: "w-full",
            flex: 1, // Set flex property to 1 to make it take equal space within the row
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              width: "w-full",
            }}
          >
            Card Number
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              width: "w-full",
            }}
          >
            <TextField
              id="card-number"
              variant="outlined"
              placeholder="1234 1234 1234 1234"
              style={{ width: "w-full" }}
              inputProps={{
                maxLength: 19, // Set the maximum allowed length (including spaces) to 19 characters
              }}
              onChange={(event) => {
                const { value } = event.target;
                // Remove all non-digit characters (e.g., spaces) from the input value
                const formattedValue = value.replace(/\D/g, "");
                // Insert spaces at appropriate positions to achieve the desired format
                const formattedValueWithSpaces = formattedValue.replace(
                  /(\d{4})(?=\d)/g,
                  "$1 "
                );
                // Update the value of the input field
                event.target.value = formattedValueWithSpaces;
              }}
            />
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Name on Card
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField id="name-oncard" variant="outlined" />
          </Box>
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Expiry Date
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField
              id="expiry-date"
              variant="outlined"
              placeholder="MM/YY"
              inputProps={{
                maxLength: 5, // Set the maximum allowed length (including the slash) to 5 characters
              }}
              onChange={(event) => {
                const { value } = event.target;
                // Remove all non-digit characters (e.g., slashes) from the input value
                const formattedValue = value.replace(/\D/g, "");
                // Insert a slash after the first 2 characters to achieve the desired format
                const formattedValueWithSlash = formattedValue
                  .replace(/^(\d\d)(\d)/g, "$1/$2")
                  .slice(0, 5); // Limit the input length to 5 characters (including the slash)
                // Update the value of the input field
                event.target.value = formattedValueWithSlash;
              }}
            />
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            CVV/CVC
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField
              id="CVV-CVC"
              variant="outlined"
              placeholder="CVC"
              inputProps={{
                maxLength: 4, // Set the maximum allowed length (including the slash) to 5 characters
              }}
              onChange={(event) => {
                const { value } = event.target;
                // Remove all non-digit characters from the input value
                const formattedValue = value.replace(/\D/g, "");
                // Limit the input length to 4 characters
                const formattedValueLimited = formattedValue.slice(0, 4);
                // Update the value of the input field
                event.target.value = formattedValueLimited;
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Typography>Billing Address</Typography>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Address
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField id="address" variant="outlined" />
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            City
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField id="city" variant="outlined" />
          </Box>
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Zip/Post code
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField
              id="zip-post-code"
              variant="outlined"
              inputProps={{
                maxLength: 6, // Set the maximum allowed length to 4 characters (CVC/CVV is usually 3 or 4 digits)
              }}
              onChange={(event) => {
                const { value } = event.target;
                // Remove all non-digit characters from the input value
                const formattedValue = value.replace(/\D/g, "");
                // Limit the input length to 4 characters
                const formattedValueLimited = formattedValue.slice(0, 6);
                // Update the value of the input field
                event.target.value = formattedValueLimited;
              }}
            />
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Country
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <CountrySelect />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

interface confirmBookingFormProps {
  currency: string;
  totalPrice: string;
}

function ConfirmBookingForm({ currency, totalPrice }: confirmBookingFormProps) {
  return (
    <Box
      className="my-10 h-auto w-auto bg-pink-200"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <FormGroup>
        <FormControlLabel
          required
          control={<Checkbox />}
          label="I agree to the Cancellation Policy and Kaligo's Terms of Use and Privacy policy"
        />
        <Divider
          variant="middle"
          sx={{ marginY: 2, borderColor: "transparent" }}
        />

        <FormControlLabel
          required
          control={<Checkbox />}
          label="I confirm that my payment details and preferred loyalty program are correct."
        />
        <Divider
          variant="middle"
          sx={{ marginY: 2, borderColor: "transparent" }}
        />

        <Button variant="contained">Confirm Booking</Button>

        <Divider
          variant="middle"
          sx={{ marginY: 2, borderColor: "transparent" }}
        />

        <Typography display="flex" justifyContent="center" alignItems="center">
          {currency} {totalPrice} will be charged to your card immediately
        </Typography>
        <Divider
          variant="middle"
          sx={{ marginY: 2, borderColor: "transparent" }}
        />
      </FormGroup>
    </Box>
  );
}

export default function Book() {
  const bookingData = {
    hotelName: "Sample Hotel",
    roomType: "Deluxe Room",
    checkInDate: "2023-08-02",
    checkOutDate: "2023-08-10",
    numberOfNights: 2,
    currency: "SGD",
    roomCount: 2,
    adultCount: 2,
    roomPrice: 200, // Example room price
    roomRate: 400,
    taxAndRecoveryCharges: 50, // Example tax and charges
    grandTotal: 500, // Example total
  };
  return (
    <>
      <Head>
        <title>Hotel Details</title>
        <meta name="description" content="Details of chosen hotel here." />
      </Head>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 5,
          }}
        >
          <PrimaryGuestBox />
          <PaymentInformationBillingAddress />
          <ConfirmBookingForm currency="SGD" totalPrice="500" />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 5,
          }}
        >
          <Divider
            variant="middle"
            sx={{ marginY: 5, borderColor: "transparent" }}
          />
          <BookingSummary {...bookingData} />
        </Box>
      </Box>
    </>
  );
}
