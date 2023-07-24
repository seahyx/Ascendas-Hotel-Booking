import { Box, Button, Container } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data, status } = useSession();

  return (
    <Box
      component="header"
      className="absolute left-0 right-0 top-0 z-50 w-full py-4"
    >
      <Container maxWidth="md" className="flex w-full items-start">
        <Box className="grow">
          <Image src="/logo.png" width={60} height={60} alt="Site Logo" />
        </Box>
        <Button
          variant="contained"
          startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
          href="login"
        > {status === 'authenticated' ? <>{data.user.email}</> : 'Login/register'}
        
      
        </Button>
        <Button 
          variant="contained"
          startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
          >
          Sign Out
        </Button>
      </Container>
    </Box>
  );
}
