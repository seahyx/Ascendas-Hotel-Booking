import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import SearchBar from "~/components/SearchBar";
import SelectBtn from "~/components/SelectBtn"
import Head from "next/head";
import Image from "next/image";
import { getTheme } from "~/styles/theme";

export default function RoomOptionVariation(){
  return (
    
    <Box style={{ flex: 1, display: 'flex' }}>
      <Container maxWidth="md" className="flex flex-row w-full items-start" style={{ border: '2px solid #d8d8d8',padding: '10px',alignItems: 'center' }}>
      <Container maxWidth="md" className="flex flex-col w-full items-start" style={{ flex: 10  ,justifyContent: 'flex-start'}}>
      <Typography
             
             variant="h4"
             color="text.primary"
             
           >
             Room Only
      </Typography>
      <Typography
             
             variant="h6"
             color="text.warning"
            
           >
             Free cancellation (except for service fee)
      </Typography>
      <Typography
             
             variant="h6"
             color="text.primary"
             
           >
             Before Wed, 26 Jul
      </Typography>

      </Container>

      <Container maxWidth="md" className="flex flex-col w-full items-start" style={{ flex: 5 ,justifyContent: 'flex-start'}}>
        <Container maxWidth="md" className="flex flex-row w-full items-start">
        <Typography
             
             variant="h5"
             color="text.primary"
             fontWeight= "750"
            
           >
             SGD
        </Typography>
        <Typography
            
            variant="h5"
            color="text.primary"
            fontWeight= "750"
            
           
          >
            270
        </Typography>    
        </Container>
            
           <Typography
             
              variant="h6"
              color="text.secondary"
              
            >
              per room per night
           </Typography>

      </Container>
      <Container maxWidth="md" className="flex w-full items-start" style={{ flex: 1 ,justifyContent: 'flex-start'}}>
        <SelectBtn/>
      </Container>
      </Container>
   
   </Box>
  );
}