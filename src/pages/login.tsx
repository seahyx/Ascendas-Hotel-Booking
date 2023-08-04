import {
  Box,
  Button,
  Card,
  Container,
  Link as LinkPage,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { type FormEvent } from 'react';

export default function Login() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    await signIn('credentials', { 
      email: form.get('email'), 
      password: form.get('password'), 
      callbackUrl: '/',
    });
  }

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
            <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              name = 'email'
              label="email"
              type="email"
              margin="dense"
              autoComplete="email"
              autoFocus
              required
              fullWidth
            />
            <TextField
              id="password"
              name = 'password'
              label="password"
              type="password"
              margin="dense"
              autoComplete="current-password"
              required
              fullWidth
            />
            <Button
              type= 'submit'
              fullWidth
              variant="contained"
              className="mt-3"
              disableElevation
              size="large"
            >
              Submit
            </Button>
            </form>
          </Stack>
        </Paper>
        <Typography className="mt-3 font-semibold">
          <LinkPage href="/register" underline="hover">
            Not registered yet? Register here.
          </LinkPage>
        </Typography>
      </Container>
    </>
  );
}
