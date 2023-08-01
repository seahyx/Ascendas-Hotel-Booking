import { ThemeProvider } from "@emotion/react";
import { Stack, Box, Container, Typography, useTheme } from "@mui/material";
import SearchBar from "~/components/SearchBar";
import SelectBtn from "~/components/SelectBtn"
import Head from "next/head";
import Image from "next/image";
import { getTheme } from "~/styles/theme";
import RoomOptionVariation from "~/components/RoomOptionVariation";



export default function RoomOptions() {
  return (
    <Box className="relative h-[20rem] w-full">
    <Container  className="mt-2 flex h-auto w-full flex-col" style={{ border: '2px solid #d8d8d8',background: '#808080' }}>
      <Typography 
             variant="h4"
             color="text.primary"
           >
             Room Option Name
      </Typography>
    </Container>
   
    <Box className="flex flex-row w-full h-auto items-start" style={{ border: '2px solid #d8d8d8',alignItems: 'center' }}>
      <Box className="flex flex-col h-auto w-full items-start" style={{ flex: 1  ,justifyContent: 'flex-start'}}>
      <Typography 
             variant="h4"
             color="text.primary"
           >
             Image
      </Typography>
      </Box>
      <Box className="flex flex-col h-auto w-full items-start bg-orange-500" style={{ display: 'flex',flex: 3,justifyContent: 'flex-start' }}>
      <Stack className="my-10 h-full w-full bg-green-500" style={{ flexGrow: 1 }} >
        <RoomOptionVariation/>
        
      
        
       
      </Stack>
      
      </Box>
    </Box>
    </Box> 
  );
}