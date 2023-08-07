import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Booking, Prisma } from "@prisma/client";
import { format, parseJSON } from "date-fns";
import { matchIsValidTel } from "mui-tel-input";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import BookingSummary, {
  BookingSummaryProps,
} from "~/components/BookingSummary";
import CountrySelect from "~/components/CountrySelect";
import DropdownTitle from "~/components/DropdownTitle";
import EmailInput from "~/components/EmailInput";
import PhoneNumber from "~/components/PhoneNumber";
import useStorage from "~/utils/useStorage";

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
  }, [title, phoneNumber, validEmail, firstName, lastName, specialRequest]);

  return (
    <Paper className="flex flex-col gap-6 p-6" variant="outlined">
      <Typography variant="h5">Primary Guest Details</Typography>
      <Stack direction="row" spacing={2}>
        <DropdownTitle
          className="w-1/6"
          label="Title"
          value={title}
          onChange={handleTitleChange}
          inputProps={{
            required: true,
          }}
        />
        <TextField
          id="first-name"
          className="shrink-0 grow"
          label="First Name"
          onChange={(event) => handleFirstNameChange(event.target.value)}
          required
        />
        <TextField
          id="last-name"
          className="shrink-0 grow"
          label="Last Name"
          onChange={(event) => handleLastNameChange(event.target.value)}
          required
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <PhoneNumber
          className="w-1/3 shrink-0"
          label="Contact Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          inputProps={{
            required: true,
          }}
        />
        <EmailInput
          label="Email Address"
          onValidEmailChange={handleValidEmailChange}
          inputProps={{
            required: true,
          }}
        />
      </Stack>
      <TextField
        id="special-requests"
        label="Special Requests"
        placeholder="We will pass on the requests to the hotel."
        rows={4}
        onChange={(event) => handleSpecialRequestChange(event.target.value)}
        multiline
      />
    </Paper>
  );
}

interface PaymentInformationBillingAddressData {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvvcvc: string;
  address: string;
  city: string;
  zipPostCode: string;
  country: string;
}

interface PaymentInformationBillingAddressProps {
  onEnteredPaymentInformationBillingAddressDataChange: React.Dispatch<
    React.SetStateAction<PaymentInformationBillingAddressData>
  >;
}

function PaymentInformationBillingAddress({
  onEnteredPaymentInformationBillingAddressDataChange,
}: PaymentInformationBillingAddressProps) {
  //Card Number field
  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (value: string) => {
    setCardNumber(value);
  };

  //Name on Card field
  const [nameOnCard, setNameOnCard] = useState("");

  const handleNameOnCardChange = (value: string) => {
    setNameOnCard(value);
  };

  //Expiry Date field

  const isNotInPast = (mmYyString: string): boolean => {
    try {
      const currentDate = new Date();
      const [month, year] = mmYyString.split("/");
      const inputDate = new Date(
        parseInt(`20${year}`, 10),
        parseInt(`${month}`, 10) - 1
      );

      if (inputDate < currentDate) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      // Handle invalid input format
      return false;
    }
  };
  const [expiryDate, setExpiryDate] = useState("");
  const expiryDateError = () => !isNotInPast(expiryDate) && expiryDate !== "";

  const handleExpiryDateChange = (value: string) => {
    setExpiryDate(value);
  };

  //cvvcvc field
  const [cvvcvc, setCvvcvc] = useState("");

  const handleCvvcvcChange = (value: string) => {
    setCvvcvc(value);
  };

  //address field
  const [address, setAddress] = useState("");

  const handleAddressChange = (value: string) => {
    setAddress(value);
  };

  //city field
  const [city, setCity] = useState("");

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  //ZipPostCode field
  const [zipPostCode, setZipPostCode] = useState("");

  const handleZipPostCodeChange = (value: string) => {
    setZipPostCode(value);
  };

  //Country field
  const [country, setCountry] = useState("");

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const getEnteredData = () => {
    return {
      cardNumber,
      nameOnCard,
      expiryDate,
      cvvcvc,
      address,
      city,
      zipPostCode,
      country,
    };
  };

  useEffect(() => {
    // Notify parent component whenever entered data changes
    onEnteredPaymentInformationBillingAddressDataChange(getEnteredData());
  }, [
    cardNumber,
    nameOnCard,
    expiryDate,
    cvvcvc,
    address,
    city,
    zipPostCode,
    country,
  ]);

  return (
    <Paper variant="outlined" className="flex flex-col gap-6 p-6">
      <Typography variant="h5">Payment Information</Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          id="card-number"
          className="shrink-0"
          label="Credit Card Number"
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
            handleCardNumberChange(event.target.value);
          }}
          required
        />
        <TextField
          id="name-oncard"
          className="w-full"
          label="Name on Card"
          onChange={(event) => handleNameOnCardChange(event.target.value)}
          required
        />
      </Stack>
      <Stack direction="row" spacing={2} className="w-full">
        <TextField
          id="expiry-date"
          className="w-1/5 shrink-0"
          placeholder="MM/YY"
          label="Expiry Date"
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
            handleExpiryDateChange(event.target.value);
          }}
          error={expiryDateError()}
          helperText={expiryDateError() ? "Invalid expiry date" : ""}
          required
        />
        <TextField
          id="CVV-CVC"
          className="w-1/6 shrink-0"
          label="CVC"
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
            handleCvvcvcChange(event.target.value);
          }}
          required
        />
      </Stack>
      <Typography variant="h5">Billing Address</Typography>
      <Stack direction="row" spacing={2} className="w-full">
        <TextField
          id="address"
          label="Address"
          fullWidth
          onChange={(event) => handleAddressChange(event.target.value)}
          required
        />
        <TextField
          id="city"
          className="w-1/3 shrink-0"
          label="City"
          onChange={(event) => handleCityChange(event.target.value)}
          required
        />
      </Stack>
      <Stack direction="row" spacing={2} className="w-full">
        <TextField
          id="zip-post-code"
          label="Zip/Postal Code"
          inputProps={{
            maxLength: 6,
          }}
          onChange={(event) => {
            const { value } = event.target;
            // Remove all non-digit characters from the input value
            const formattedValue = value.replace(/\D/g, "");
            // Limit the input length to 4 characters
            const formattedValueLimited = formattedValue.slice(0, 6);
            // Update the value of the input field
            event.target.value = formattedValueLimited;
            handleZipPostCodeChange(event.target.value);
          }}
          required
        />
        <CountrySelect
          className="shrink-0 grow"
          label="Country"
          handleCountryChange={handleCountryChange}
          inputProps={{ required: true }}
        />
      </Stack>
    </Paper>
  );
}

interface ConfirmBookingFormProps {
  enteredPrimaryGuestData: PrimaryGuestData;
  enteredPaymentInformationBillingAddressData: PaymentInformationBillingAddressData;
  paymentProps: PaymentProps;
}

function ConfirmBookingForm({
  enteredPrimaryGuestData,
  enteredPaymentInformationBillingAddressData,
  paymentProps,
}: ConfirmBookingFormProps) {
  const session = useSession();

  const [isFirstCheckboxChecked, setIsFirstCheckboxChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showCheckingBoxErrorAlert, setShowCheckingBoxErrorAlert] =
    useState(false);

  const [showPrimaryGuestErrorAlert, setShowPrimaryGuestErrorAlert] =
    useState(false);

  const [
    showPaymentInformationBillingAddressErrorAlert,
    setShowPaymentInformationBillingAddressErrorAlert,
  ] = useState(false);

  function handleFirstCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setIsFirstCheckboxChecked(event.target.checked);
  }

  function handleSecondCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setIsSecondCheckboxChecked(event.target.checked);
  }

  const isPrimaryGuestInputValid = (
    enteredPrimaryGuestData: PrimaryGuestData
  ) => {
    const { title, phoneNumber, validEmail, firstName, lastName } =
      enteredPrimaryGuestData;
    return (
      title !== "" &&
      matchIsValidTel(phoneNumber) &&
      validEmail !== "" &&
      firstName !== "" &&
      lastName !== ""
    );
  };
  const isNotInPast = (mmYyString: string): boolean => {
    try {
      const currentDate = new Date();
      const [month, year] = mmYyString.split("/");
      const inputDate = new Date(
        parseInt(`20${year}`, 10),
        parseInt(`${month}`, 10) - 1
      );

      if (inputDate < currentDate) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      // Handle invalid input format
      return false;
    }
  };

  const isPaymentInformationBillingAddressInputValid = (
    enteredPaymentInformationBillingAddressData: PaymentInformationBillingAddressData
  ) => {
    const {
      cardNumber,
      nameOnCard,
      expiryDate,
      cvvcvc,
      address,
      city,
      zipPostCode,
      country,
    } = enteredPaymentInformationBillingAddressData;
    return (
      cardNumber.length === 19 &&
      nameOnCard !== "" &&
      isNotInPast(expiryDate) && //make seperate validity checker
      expiryDate.length === 5 &&
      (cvvcvc.length === 3 || cvvcvc.length === 4) &&
      address !== "" &&
      city !== "" &&
      zipPostCode !== "" &&
      country !== ""
    );
  };
  async function fetchLatestBooking(uid: string) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/getlatestbooking/${uid}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function fetchBookingWithId(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/api/booking/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  function handleConfirmBooking() {
    if (!isPrimaryGuestInputValid(enteredPrimaryGuestData)) {
      console.log("Enter all required details in Primary Guest Form correctly");
      setShowPrimaryGuestErrorAlert(true);
      setShowSuccessAlert(false);
      setShowPaymentInformationBillingAddressErrorAlert(false);
      setShowCheckingBoxErrorAlert(false);
    } else if (
      !isPaymentInformationBillingAddressInputValid(
        enteredPaymentInformationBillingAddressData
      )
    ) {
      // Display an error message or take appropriate action
      console.log(
        "Enter all required details in Payment Information and Billing Address Form correctly"
      );
      setShowPaymentInformationBillingAddressErrorAlert(true);
      setShowSuccessAlert(false);
      setShowCheckingBoxErrorAlert(false);
      setShowPrimaryGuestErrorAlert(false);
    } else if (!(isFirstCheckboxChecked && isSecondCheckboxChecked)) {
      // Display an error message or take appropriate action
      console.log("Please check both checkboxes before confirming the booking");
      setShowCheckingBoxErrorAlert(true);
      setShowSuccessAlert(false);
      setShowPrimaryGuestErrorAlert(false);
      setShowPaymentInformationBillingAddressErrorAlert(false);
    } else {
      // Both checkboxes are checked, you can proceed with booking logic here
      const bookingData: Booking = {
        destinationId: paymentProps.destinationId,
        hotelId: paymentProps.hotelId,
        roomId: paymentProps.roomId,
        nameTitle: enteredPrimaryGuestData.title,
        firstName: enteredPrimaryGuestData.firstName,
        lastName: enteredPrimaryGuestData.lastName,
        phoneNumber: enteredPrimaryGuestData.phoneNumber,
        email: enteredPrimaryGuestData.validEmail,
        numberOfNights: paymentProps.numberOfNights,
        numberOfRooms: paymentProps.numberOfRooms,
        startDate: paymentProps.startDate,
        endDate: paymentProps.endDate,
        adults: paymentProps.adults,
        children: paymentProps.children,
        messageToHotel: enteredPrimaryGuestData.specialRequest,
        roomType: paymentProps.roomType,
        avgRoomCost: new Prisma.Decimal(paymentProps.avgRoomCost),
        roomRate: new Prisma.Decimal(paymentProps.roomRate),
        tax: new Prisma.Decimal(paymentProps.tax),
        additionalInfo: paymentProps.additionalInfo,
        payeeId: "",
        paymentId: "",
        uid: session.data?.user.id,
      } as Booking;
      fetch("http://localhost:3001/api/createbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("bookingId", data.id);
        })
        .catch((error) => console.error("Error:", error));

      console.log("Booking confirmed");
      setShowSuccessAlert(true);
      setShowCheckingBoxErrorAlert(false);
      setShowPrimaryGuestErrorAlert(false);
      setShowPaymentInformationBillingAddressErrorAlert(false);
    }
  }
  return (
    <Paper className="flex flex-col gap-4 p-6" variant="outlined">
      <Typography variant="h5">Terms and Conditions</Typography>
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
      </FormGroup>
      <Button variant="contained" onClick={handleConfirmBooking} size="large">
        Confirm Booking
      </Button>

      {/* Alert to display on successful booking confirmation */}
      {showSuccessAlert && (
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Booking confirmed. We will redirect you to the confirmation page in a
          short while.
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
          the Primary Guest Form.
        </Alert>
      )}

      {showPaymentInformationBillingAddressErrorAlert && (
        <Alert
          severity="error"
          onClose={() =>
            setShowPaymentInformationBillingAddressErrorAlert(false)
          }
        >
          Please check that you have entered all required inputs correctly in
          the Payment Information and Billing Address form.
        </Alert>
      )}
    </Paper>
  );
}

export interface PaymentProps {
  destinationId: string;
  hotelName: string;
  hotelId: string;
  roomId: string;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  numberOfRooms: number;
  numberOfNights: number;
  roomType: string;
  avgRoomCost: number;
  roomRate: number;
  tax: number;
  additionalInfo: string;
}

export default function Payment(props) {
  const { getItem } = useStorage();
  const paymentJson = getItem("paymentProps", "session");
  const obj: any | undefined = paymentJson
    ? JSON.parse(paymentJson)
    : undefined;
  if (obj) {
    obj.startDate = parseJSON(obj.startDate);
    obj.endDate = parseJSON(obj.endDate);
  }
  const paymentProps: PaymentProps = obj ?? {
    destinationId: "",
    hotelName: "",
    hotelId: "",
    roomId: "",
    startDate: new Date(),
    endDate: new Date(),
    adults: 0,
    children: 0,
    numberOfRooms: 0,
    numberOfNights: 0,
    roomType: "",
    avgRoomCost: 0,
    roomRate: 0,
    tax: 0,
    additionalInfo: "",
  };

  console.log(paymentJson);
  console.log(obj);
  console.log(paymentProps);

  const [enteredPrimaryGuestData, setEnteredPrimaryGuestData] =
    useState<PrimaryGuestData>({
      title: "",
      phoneNumber: "",
      validEmail: "",
      firstName: "",
      lastName: "",
      specialRequest: "",
    });

  const [
    enteredPaymentInformationBillingAddressData,
    setEnteredPaymentInformationBillingAddressData,
  ] = useState<PaymentInformationBillingAddressData>({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvvcvc: "",
    address: "",
    city: "",
    zipPostCode: "",
    country: "",
  });

  const bookingSummary: BookingSummaryProps = {
    hotelName: paymentProps.hotelName,
    roomType: paymentProps.roomType,
    checkInDate: format(paymentProps.startDate, "dd MMM yyyy"),
    checkOutDate: format(paymentProps.endDate, "dd MMM yyyy"),
    numberOfNights: paymentProps.numberOfNights,
    currency: "SGD",
    roomCount: paymentProps.numberOfRooms,
    adultCount: paymentProps.adults,
    childCount: paymentProps.children,
    roomPrice: paymentProps.avgRoomCost,
    roomRate: paymentProps.roomRate,
    taxAndRecoveryCharges: paymentProps.tax, // Example tax and charges
    grandTotal: paymentProps.roomRate + paymentProps.tax,
  };
  return (
    <>
      <Head>
        <title>Payment - SUTDHotelBooking</title>
        <meta name="description" content="Confirm your booking now!" />
      </Head>
      <Box className="h-32 w-full" bgcolor="secondary.main"></Box>
      <Container maxWidth="lg" className="flex flex-row gap-3 py-6">
        <Stack className="w-full" spacing={2}>
          <PrimaryGuestBox
            onEnteredPrimaryGuestDataChange={setEnteredPrimaryGuestData}
          />
          <PaymentInformationBillingAddress
            onEnteredPaymentInformationBillingAddressDataChange={
              setEnteredPaymentInformationBillingAddressData
            }
          />
          <ConfirmBookingForm
            enteredPrimaryGuestData={enteredPrimaryGuestData}
            enteredPaymentInformationBillingAddressData={
              enteredPaymentInformationBillingAddressData
            }
            paymentProps={paymentProps}
          />
        </Stack>
        <Box className="w-96 shrink-0">
          <BookingSummary {...bookingSummary} />
        </Box>
      </Container>
    </>
  );
}
