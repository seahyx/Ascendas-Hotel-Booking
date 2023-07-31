import {
  Box,
  Button,
  Card,
  Container,
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
        <title>SUTDHotelBooking - Login</title>
        <meta name="description" content="Login or register a new account." />
      </Head>
      <Box className="absolute h-32 w-full" bgcolor="secondary.main"></Box>
      <Container
        maxWidth="lg"
        className="z-10 flex grow flex-col place-content-center items-center"
      >
        <Paper className="w-96 max-w-full p-6" elevation={4}>
          <Stack direction="column">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              className="pb-4 pt-3 font-semibold"
            >
              Sign In
            </Typography>
            <TextField
              id="login-email"
              label="Email"
              type="email"
              margin="dense"
              autoComplete="username"
              autoFocus
              required
            />
            <TextField
              id="login-password"
              label="Password"
              type="password"
              margin="dense"
              autoComplete="current-password"
              required
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
          <Link href="/register" underline="hover">
            Not registered yet? Register here.
          </Link>
        </Typography>
      </Container>
    </>
  );
}
