import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography,TextField, useTheme,Stack } from "@mui/material";
import SearchBar from "~/components/SearchBar";
import SelectBtn from "~/components/SelectBtn"
import Head from "next/head";
import Image from "next/image";
import { getTheme } from "~/styles/theme";
import RoomOptionVariation from "~/components/RoomOptionVariation";



export default function PrimaryGuestBox() {
  return (
    <Box className="relative h-[20rem] w-full">
    <Container maxWidth="md" className="flex flex-row w-full items-start" style={{ border: '2px solid #d8d8d8',padding: '10px',alignItems: 'center',background: '#808080' }}>
      <Typography 
             variant="h4"
             color="text.primary"
           >
             Primary Guest (must be an adult)
      </Typography>
    </Container>
   
    <Container maxWidth="md" className="flex flex-row w-full items-start" style={{ border: '2px solid #d8d8d8',alignItems: 'center' }}>
    <Container maxWidth="md" className="flex flex-row w-full items-start" style={{ alignItems: 'center' }}>
      <Container maxWidth="md" className="flex flex-col w-full items-start" style={{ flex: 1  ,justifyContent: 'flex-start'}}>
      <TextField
      helperText=" "
      id="demo-helper-text-aligned-no-helper"
      label="First Name"/>
      </Container>
      <Container maxWidth="md" className="flex flex-col w-full items-start" style={{ display: 'flex',flex: 8,justifyContent: 'flex-start' }}>
      <TextField
      helperText=" "
      id="demo-helper-text-aligned-no-helper"
      label="Last Name"/>
      </Container>
      </Container>
      <Container>
        
      </Container>

    </Container>
    </Box> 
  );
}


