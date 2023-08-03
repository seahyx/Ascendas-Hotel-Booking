import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, Button, Container, Link } from "@mui/material";
import Image from "next/image";

export default function Header() {
  return (
    <Box
      component="header"
      className="absolute left-0 right-0 top-0 z-50 w-full py-4"
    >
      <Container maxWidth="md" className="flex w-full items-start">
        <Box className="grow">
          <Link href="/">
            <Image src="/logo.png" width={60} height={60} alt="Site Logo" />
          </Link>
        </Box>
        <Button
          variant="contained"
          startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
          href="/login"
        >
          Login/Register
        </Button>
      </Container>
    </Box>
  );
}
