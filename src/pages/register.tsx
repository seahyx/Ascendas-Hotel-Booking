import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";

export default function Login(props) {
  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Create new account</title>
        <meta name="description" content="Create a new account." />
      </Head>
      <Box className="absolute h-32 w-full" bgcolor="secondary.main"></Box>
      <Container
        maxWidth="lg"
        className="z-10 flex grow flex-col place-content-center items-center"
      >
        <Paper className="w-[28rem] max-w-full p-6" elevation={4}>
          <Stack direction="column">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              className="pb-4 pt-3 font-semibold"
            >
              Create a new account
            </Typography>
            <TextField
              id="register-email"
              label="Email"
              type="email"
              margin="dense"
              autoComplete="username"
              autoFocus
              required
            />
            <TextField
              id="register-password"
              label="Password"
              type="password"
              margin="dense"
              autoComplete="new-password"
              required
            />
            <TextField
              id="register-password-repeat"
              label="Repeat password"
              type="password"
              margin="dense"
              autoComplete="new-password"
              required
            />
            <FormControlLabel
              control={<Checkbox required />}
              className="mt-2"
              label="I agree to the terms of use and privacy policy."
            />
            <Button
              variant="contained"
              className="mt-3"
              disableElevation
              size="large"
            >
              Submit
            </Button>
          </Stack>
        </Paper>
        <Typography className="mt-3 font-semibold">
          <Link href="/login" underline="hover">
            Already have an account? Sign in.
          </Link>
        </Typography>
      </Container>
    </>
  );
}
