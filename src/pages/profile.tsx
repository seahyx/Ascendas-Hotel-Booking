import { Box, Button, Paper, Stack, Grid, Typography } from "@mui/material";
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
      <Grid
        className="mt-40"
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item>
          <Paper className="h-auto w-80 p-4">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              className="pb-4 font-semibold"
            >
              Profile
            </Typography>
            <Stack spacing={2}>
              <Typography className="">First Name: {firstName}</Typography>
              <Typography className="">Last Name: {lastName}</Typography>
              <Typography className="">Email: {email}</Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item>
          <Button variant="contained">View Bookings</Button>
        </Grid>
      </Grid>
    </>
  );
}
