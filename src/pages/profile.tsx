import { useState } from "react";
import {
  AppBar,
  Box,
  Paper,
  Stack,
  Grid,
  Typography,
  Tabs,
  Tab,
  Toolbar,
  IconButton,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [number, setEditedNumber] = useState("");

  const firstName = "Test";
  const lastName = "Account";
  const email = "testaccount@gmail.com";
  const editedNumber = "91234567";

  const bookings = [
    {
      id: 1,
      bookingDate: "2023-08-10",
      roomType: "Deluxe Suite",
      hotel: 'Ritz Carlton',
      lengthOfStay: 5, 
      adults: 2,
      children: 1, 
      bookingID: "ABC123", 
      paymentID: "XYZ789", 
      payeeID: "DEF456",
      payment: '500' 
    },
    {
      id: 2,
      bookingDate: "2023-08-15",
      roomType: "Standard Room",
      hotel: 'Marina Bay Sands',
      lengthOfStay: 3,
      adults: 1,
      children: 0,
      bookingID: "DEF456",
      paymentID: "GHI789",
      payeeID: "JKL123",
      payment: '300'
    },
    // Add more bookings as needed
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveChanges = () => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedEmail(email);
    setEditedNumber(number);
  };

  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Profile</title>
        <meta name="description" content="View profile information." />
      </Head>
      <Box className="absolute h-32 w-full" bgcolor="secondary.main"></Box>
      <Box>
      <AppBar className="mt-36" position="sticky" color="transparent">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Profile" />
          <Tab label="Bookings" />
          <Tab label="Profile Settings" />
        </Tabs>
      </AppBar>
      </Box>
      
      <Grid
        className="mt-16"
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <Paper className="h-auto w-96 p-4 mb-8">
          {activeTab === 0 && (
            <>
              <Typography
                component="h1"
                variant="h5"
                align="center"
                className="pb-4 font-semibold"
              >
                Profile Details
              </Typography>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      value={editedFirstName || firstName}
                      onChange={(e) => setEditedFirstName(e.target.value)}
                      fullWidth
                      InputProps={{ style: { color: "gray" } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      value={editedLastName || lastName}
                      onChange={(e) => setEditedLastName(e.target.value)}
                      fullWidth
                      InputProps={{ style: { color: "gray" } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      value={editedNumber || number}
                      fullWidth
                      InputProps={{ style: { color: "gray" } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={editedEmail || email}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      fullWidth
                      InputProps={{ style: { color: "gray" } }}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Box>
            </>
            )}
            {activeTab === 1 && (
              <>
                <Typography
                  component="h1"
                  variant="h5"
                  align="center"
                  className="pb-4 font-semibold"
                >
                  Bookings
                </Typography>
                {bookings.map((booking) => (
                  <Accordion key={booking.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>
                        {booking.hotel}
                        <br />
                        {booking.bookingDate} - ({booking.roomType})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Length of Stay: {booking.lengthOfStay} nights
                        <br />
                        Adults: {booking.adults}
                        <br />
                        Children: {booking.children}
                        <br />
                        Booking ID: {booking.bookingID}
                        <br />
                        Payment ID: {booking.paymentID}
                        <br />
                        Payee ID: {booking.payeeID}
                        <br />
                        Payment Cost: <strong> ${booking.payment} </strong>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            )}
            {activeTab === 2 && (
              <>
              <Typography
                component="h1"
                variant="h5"
                align="center"
                className="pb-4 font-semibold"
              >
                Profile Settings
              </Typography>
              <Stack spacing={2}>
                <Typography component="div" variant="body1" className="font-semibold">
                  Miscellaneous Settings:
                </Typography>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Misc Setting 1"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Misc Setting 2"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Misc Setting 3"
                />
                <Button variant="contained" color="primary" /*onClick={}*/>
                  Delete Account
                </Button>
                <Button variant="contained" color="primary" /*onClick={}*/>
                  Logout
                </Button>
              </Stack>
            </>
            )}
            {/* Add more conditions for other pages */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
