import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, Button, Container, Link } from "@mui/material";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data, status } = useSession();
  return (
    <Box
      component="header"
      className="absolute left-0 right-0 top-0 z-50 w-full py-4"
    >
      <Container maxWidth="lg" className="flex w-full items-start">
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
          {status === "authenticated" ? (
            <>{data.user.name}</>
          ) : (
            "Login/register"
          )}
        </Button>
      </Container>
    </Box>
  );
}
