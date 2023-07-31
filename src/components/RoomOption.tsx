import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import SearchBar from "~/components/SearchBar";
import SelectBtn from "~/components/SelectBtn"
import Head from "next/head";
import Image from "next/image";
import { getTheme } from "~/styles/theme";
import RoomOptionVariation from "~/components/RoomOptionVariation";



export default function RoomOptions() {
  return (
    <Box className="relative h-[20rem] w-full">
    <Container maxWidth="md" className="flex flex-row w-full items-start" style={{ border: '2px solid #d8d8d8',padding: '10px',alignItems: 'center',background: '#808080' }}>
      <Typography 
             variant="h4"
             color="text.primary"
           >
             Room Option Name
      </Typography>
    </Container>
   
    <Container maxWidth="md" className="flex flex-row w-full items-start" style={{ border: '2px solid #d8d8d8',alignItems: 'center' }}>
      <Container maxWidth="md" className="flex flex-col w-full items-start" style={{ flex: 1  ,justifyContent: 'flex-start'}}>
      <Typography 
             variant="h4"
             color="text.primary"
           >
             Image
      </Typography>
      </Container>
      <Container className="flex flex-col w-full items-start bg-gray-500" style={{ display: 'flex',flex: 8,justifyContent: 'flex-start' }}>
      <RoomOptionVariation/>
      </Container>
    </Container>
    </Box> 
  );
}


