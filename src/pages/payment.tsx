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
  Alert,
} from "@mui/material";
import Head from "next/head";
import React, { useState, useEffect } from "react";

import DropdownTitle from "~/components/DropdownTitle";
import CountrySelect from "~/components/CountrySelect";
import PhoneNumber from "~/components/PhoneNumber";
import EmailInput from "~/components/EmailInput";
import BookingSummary from "~/components/BookingSummary";

interface PrimaryGuestData {
  title: string;
  phoneNumber: string;
  validEmail: string;
  firstName: string;
  lastName: string;
  specialRequest: string;
}
interface PrimaryGuestBoxProps {
  onEnteredPrimaryGuestDataChange: React.Dispatch<
    React.SetStateAction<PrimaryGuestData>
  >;
}

function PrimaryGuestBox({
  onEnteredPrimaryGuestDataChange,
}: PrimaryGuestBoxProps) {
  //Title Dropdown
  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    console.log(title);
  };

  //First name field
  const [firstName, setFirstName] = useState("");

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  //Last name field
  const [lastName, setLastName] = useState("");

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  //Phone Number Text Field
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    console.log(phoneNumber);
  };

  //Email Field
  const [validEmail, setValidEmail] = useState("");

  const handleValidEmailChange = (email: string) => {
    setValidEmail(email);
  };

  //Special Request field
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSpecialRequestChange = (value: string) => {
    setSpecialRequest(value);
  };

  const getEnteredData = () => {
    return {
      title,
      phoneNumber,
      validEmail,
      firstName,
      lastName,
      specialRequest,
    };
  };

  useEffect(() => {
    // Notify parent component whenever entered data changes
    onEnteredPrimaryGuestDataChange(getEnteredData());
    console.log("from useEffect", validEmail);
  }, [title, phoneNumber, validEmail, firstName, lastName, specialRequest]);

  return (
    <Box
      className="my-10 flex h-auto w-auto "
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        border: "1px solid grey",
      }}
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
          <TextField
            id="first-name"
            variant="outlined"
            onChange={(event) => handleFirstNameChange(event.target.value)}
          />
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
          <TextField
            id="last-name"
            variant="outlined"
            onChange={(event) => handleLastNameChange(event.target.value)}
          />
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
            Phone Number
          </Box>

          <Box
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <PhoneNumber
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
            Email
          </Box>

          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              width: "w-full",
            }}
          >
            <EmailInput onValidEmailChange={handleValidEmailChange} />

            {/*{validEmail && <p>Valid Email: {validEmail}</p>}*/}
          </Box>
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
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
              onChange={(event) =>
                handleSpecialRequestChange(event.target.value)
              }
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
      className="my-10 h-auto w-auto "
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        border: "1px solid grey",
      }}
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
  enteredPrimaryGuestData: PrimaryGuestData;
}

function ConfirmBookingForm({
  currency,
  totalPrice,
  enteredPrimaryGuestData,
}: confirmBookingFormProps) {
  const [isFirstCheckboxChecked, setIsFirstCheckboxChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showCheckingBoxErrorAlert, setShowCheckingBoxErrorAlert] =
    useState(false);

  const [showPrimaryGuestErrorAlert, setShowPrimaryGuestErrorAlert] =
    useState(false);

  function handleFirstCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setIsFirstCheckboxChecked(event.target.checked);
    console.log("first checked");
  }

  function handleSecondCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setIsSecondCheckboxChecked(event.target.checked);
    console.log("second checked");
  }

  const isPrimaryGuestInputValid = (
    enteredPrimaryGuestData: PrimaryGuestData
  ) => {
    const { title, phoneNumber, validEmail, firstName, lastName } =
      enteredPrimaryGuestData;
    console.log("from isPrimaryGuestInputValid:", validEmail);
    console.log(phoneNumber.length);
    return (
      title !== "" &&
      phoneNumber.length === 13 &&
      validEmail !== "" &&
      firstName !== "" &&
      lastName !== ""
    );
  };

  function handleConfirmBooking() {
    if (!isPrimaryGuestInputValid(enteredPrimaryGuestData)) {
      console.log("Enter all required details in Primary Guest Form correctly");
      setShowPrimaryGuestErrorAlert(true);
      setShowSuccessAlert(false);
    } else if (!(isFirstCheckboxChecked && isSecondCheckboxChecked)) {
      // Display an error message or take appropriate action
      console.log("Please check both checkboxes before confirming the booking");
      setShowCheckingBoxErrorAlert(true);
      setShowSuccessAlert(false);
    } else {
      // Both checkboxes are checked, you can proceed with booking logic here
      console.log("Booking confirmed");
      setShowSuccessAlert(true);
      setShowCheckingBoxErrorAlert(false);
      setShowPrimaryGuestErrorAlert(false);
    }
  }
  return (
    <Box
      className="my-10 h-auto w-auto "
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ border: "1px solid grey" }}
    >
      <FormGroup>
        <FormControlLabel
          required
          control={
            <Checkbox
              checked={isFirstCheckboxChecked}
              onChange={handleFirstCheckboxChange}
            />
          }
          label="I agree to the Cancellation Policy and Kaligo's Terms of Use and Privacy policy"
        />
        <Divider
          variant="middle"
          sx={{ marginY: 2, borderColor: "transparent" }}
        />

        <FormControlLabel
          required
          control={
            <Checkbox
              checked={isSecondCheckboxChecked}
              onChange={handleSecondCheckboxChange}
            />
          }
          label="I confirm that my payment details and preferred loyalty program are correct."
        />
        <Divider
          variant="middle"
          sx={{ marginY: 2, borderColor: "transparent" }}
        />

        <Button variant="contained" onClick={handleConfirmBooking}>
          Confirm Booking
        </Button>

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

      {/* Alert to display on successful booking confirmation */}
      {showSuccessAlert && (
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Booking confirmed for {enteredPrimaryGuestData.title}{" "}
          {enteredPrimaryGuestData.firstName} {enteredPrimaryGuestData.lastName}
          . Phone number: {enteredPrimaryGuestData.phoneNumber}. Email:{" "}
          {enteredPrimaryGuestData.validEmail}. specialRequest:{" "}
          {enteredPrimaryGuestData.specialRequest}.
        </Alert>
      )}

      {/* Alert to display error message */}
      {showCheckingBoxErrorAlert && (
        <Alert
          severity="error"
          onClose={() => setShowCheckingBoxErrorAlert(false)}
        >
          Please check both checkboxes before confirming the booking.
        </Alert>
      )}

      {showPrimaryGuestErrorAlert && (
        <Alert
          severity="error"
          onClose={() => setShowPrimaryGuestErrorAlert(false)}
        >
          Please check that you have entered all required inputs correctly in
          the Primary Guest Form. {enteredPrimaryGuestData.title}{" "}
          {enteredPrimaryGuestData.firstName} {enteredPrimaryGuestData.lastName}
          . Phone number: {enteredPrimaryGuestData.phoneNumber}. Email:{" "}
          {enteredPrimaryGuestData.validEmail}. specialRequest:{" "}
          {enteredPrimaryGuestData.specialRequest}.
        </Alert>
      )}
    </Box>
  );
}

export default function Book() {
  const [enteredPrimaryGuestData, setEnteredPrimaryGuestData] =
    useState<PrimaryGuestData>({
      title: "",
      phoneNumber: "",
      validEmail: "",
      firstName: "",
      lastName: "",
      specialRequest: "",
    });

  const bookingData = {
    hotelName: "Sample Hotel",
    roomType: "Deluxe Room",
    checkInDate: "2023-08-02",
    checkOutDate: "2023-08-10",
    numberOfNights: 2,
    currency: "SGD",
    roomCount: 2,
    adultCount: 2,
    childCount: 2,
    roomPrice: 200, // Example room price
    roomRate: 400,
    taxAndRecoveryCharges: 50, // Example tax and charges
    grandTotal: 500, // Example total
  };
  return (
    <>
      <Head>
        <title>Payment</title>
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
          <PrimaryGuestBox
            onEnteredPrimaryGuestDataChange={setEnteredPrimaryGuestData}
          />
          <PaymentInformationBillingAddress />
          <ConfirmBookingForm
            currency="SGD"
            totalPrice="500"
            enteredPrimaryGuestData={enteredPrimaryGuestData}
          />
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
