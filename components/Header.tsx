import { Box, Container, Link, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      component="header"
      className="w-full py-4"
      sx={{ borderBottom: 1, borderColor: "divider.main" }}
    >
      <Container maxWidth="md" className="flex w-full justify-center">
        <Box className="grow">
          <Link
            href="/"
            color="inherit"
            underline="none"
            className="text-lg font-bold"
          >
            SUTDHotelBooking.com
          </Link>
        </Box>
        <Link
          href="/"
          color="text.secondary"
          underline="none"
          className="place-self-end"
        >
          Login/Register
        </Link>
      </Container>
    </Box>
  );
}
