-(
  /* eslint-disable @typescript-eslint/no-misused-promises */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  ""
);
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useState, type FormEvent } from "react";

export default function Register(props) {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await res.json();
    if (!data.user) return null;
    await signIn("credentials", {
      email: data.user.email,
      password: form.get("password"),
      callbackUrl: "/",
    });
  }

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter your email";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter a password";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Passwords do not match";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please repeat your password";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Passwords do not match";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

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
            <form onSubmit={handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Name"
                type="name"
                margin="dense"
                autoComplete="name"
                autoFocus
                required
                fullWidth
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                value={input.email}
                onChange={onInputChange}
                onBlur={validateInput}
                type="email"
                margin="dense"
                autoComplete="email"
                autoFocus
                required
                fullWidth
              />
              {error.email && <span className="err">{error.email}</span>}
              <TextField
                id="password"
                name="password"
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}
                label="Password"
                type="password"
                margin="dense"
                autoComplete="new-password"
                required
                fullWidth
              />
              {error.password && <span className="err">{error.password}</span>}
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
                label="Repeat password"
                type="password"
                margin="dense"
                autoComplete="new-password"
                required
                fullWidth
              />
              {error.confirmPassword && (
                <span className="err">{error.confirmPassword}</span>
              )}
              <FormControlLabel
                control={<Checkbox required />}
                className="mt-2"
                label="I agree to the terms of use and privacy policy."
              />
              <Button
                id='submit'
                name='submit'
                variant="contained"
                type="submit"
                className="mt-3"
                disableElevation
                size="large"
                fullWidth
                disabled={input.password !== input.confirmPassword}
              >
                Submit
              </Button>
            </form>
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
