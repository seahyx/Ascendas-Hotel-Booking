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

  const firstName = "Test";
  const lastName = "Account";
  const email = "testaccount@gmail.com";

  const bookings = [
    {
      id: 1,
      bookingDate: "2023-08-10",
      roomType: "Deluxe Suite",
      hotel: 'Ritz Carlton',
    },
    {
      id: 2,
      bookingDate: "2023-08-15",
      roomType: "Standard Room",
      hotel: 'Marina Bay Sands',
    },
    // Add more bookings as needed
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveChanges = () => {
    // Here you can save the changes made to firstName, lastName, and email
    // You can update the state, make API calls, etc.
    // For this example, let's just update the state with the edited values.
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedEmail(email);
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
        alignItems="flex-start"
      >
        <Grid item>
          <Paper className="h-auto w-80 p-4">
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
                  <TextField
                    label="First Name"
                    variant="outlined"
                    value={editedFirstName || firstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    fullWidth
                    InputProps={{
                      style: { color: "gray" }, }}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    value={editedLastName || lastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    fullWidth
                    InputProps={{
                      style: { color: "gray" }, }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={editedEmail || email}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    fullWidth
                    InputProps={{
                      style: { color: "gray" }, }}
                  />
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
                        <br/>
                        {booking.bookingDate} - ({booking.roomType})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Additional details for each booking can be added here */}
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
                  Other Page
                </Typography>
                {/* Display content for other page here */}
              </>
            )}
            {/* Add more conditions for other pages */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
