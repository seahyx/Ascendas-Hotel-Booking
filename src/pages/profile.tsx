import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Profile() {
  const firstName = "Test";
  const lastName = "Account";
  const email = "testaccount@gmail.com";
  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Profile</title>
        <meta name="description" content="View profile information." />
      </Head>
      <Box className="absolute h-32 w-full" bgcolor="secondary.main"></Box>
      <Container
        maxWidth="lg"
        className="z-10 flex grow flex-col place-content-center items-center"
      >
        <Paper className="w-96 max-w-full place-content-center p-6">
          <Stack direction={"column"} spacing={2}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              className="pb-4 pt-3 font-semibold"
            >
              Profile
            </Typography>
            <Container className="flex h-14 w-auto flex-row content-center">
              <Typography className="pt-3 align-middle">First Name</Typography>
              <TextField
                id="first-name"
                defaultValue={firstName}
                required
              ></TextField>
            </Container>
            <Container className="flex h-14 w-auto flex-row content-center">
              <Typography className="pt-3 align-middle">Last Name</Typography>
              <TextField
                id="last-name"
                defaultValue={lastName}
                required
              ></TextField>
            </Container>
            <Container className="flex h-14 w-auto flex-row content-center">
              <Typography className="pr-1 pt-3 align-middle">Email</Typography>
              <TextField id="email" defaultValue={email} required></TextField>
            </Container>
            <Container className="h-14 w-auto content-center">
              <Button variant="contained">View Bookings</Button>
            </Container>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
