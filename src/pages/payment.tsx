import {
  TextField,
  Box,
  Button,
  Container,
  Rating,
  Typography,
  Stack,
} from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import TopBarWithSearch from "~/components/TopBarWithSearch";
import RoomOption from "~/components/RoomOption";
import RoomOptionVariation from "~/components/RoomOptionVariation";
import DropdownTitle from "~/components/DropdownTitle";
import CountryCodePicker from "~/components/CountryCodePicker";
import PhoneNumberTextField from "~/components/PhoneNumberTextField";

function PrimaryGuestBox() {
  //Title Dropdown
  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setPhoneNumber("");
  };

  //Phone Number Text Field
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (number: string) => {
    setPhoneNumber(number);
  };

  return (
    <Box
      className="my-10 flex h-auto w-10/12 bg-green-100"
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
          Special Requests
        </Box>
        <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
          <TextField
            id="special-requests"
            placeholder="We will pass on the requests to the hotel."
            multiline
            rows={4}
            defaultValue=""
            style={{ width: 1000 }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function PaymentInformationBillingAddress() {
  return (
    <Box
      className="my-10 h-auto w-10/12 bg-purple-200"
      style={{ display: "flex", flexDirection: "column", padding: "10px" }}
    >
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Typography>Payment Information</Typography>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Card Number
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField
              id="card-number"
              variant="outlined"
              placeholder="1234 1234 1234 1234"
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
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
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
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
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
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
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
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
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
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            City
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <TextField id="address" variant="outlined" />
          </Box>
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
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
              id="zip-post-code" // Update the id to reflect CVC/CVV
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
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
        >
          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            Country
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function confirmBookingForm() {
  return (
    <Box className="my-10 h-96 w-10/12 bg-pink-200"></Box>
    /**<Stack className="my-10 h-96 w-10/12 bg-gray-200" spacing={6}>
    <Box className="h-48 w-10/12" ><RoomOption/></Box>
    
  </Stack>*/
  );
}

function bookingSummaryBox() {
  return <Box className="my-10 h-48 w-10/12 bg-yellow-200"></Box>;
}

function cancellationPolicyBox() {}

export default function Book() {
  return (
    <>
      <Head>
        <title>Hotel Details</title>
        <meta name="description" content="Details of chosen hotel here." />
      </Head>
      <Box>Primary Guest Box</Box>
      <PrimaryGuestBox />
      <PaymentInformationBillingAddress />
    </>
  );
}
