import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="secondary.contrastText" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        SUTDHotelBooking.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      bgcolor="secondary.main"
      className="flex h-32 justify-center py-8"
    >
      <Container maxWidth="sm">
        <Typography
          variant="body1"
          color="secondary.contrastText"
          align="center"
        >
          Hotel booking case study site. Not for commercial usage.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
