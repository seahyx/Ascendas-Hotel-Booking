import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import SearchBar from "~/components/SearchBar";
import SelectBtn from "~/components/SelectBtn"
import Head from "next/head";
import Image from "next/image";
import { getTheme } from "~/styles/theme";

export default function RoomOptionVariation(){
  return (
    <Box
      sx={{ display: 'inline-flex' , flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center'}}
    >
      <Container maxWidth="md" className="flex flex-row w-full items-start">
      <Container maxWidth="md" className="flex flex-col w-full items-start" style={{ flex: 16 }}>
      <Typography
             
             variant="h5"
             color="text.primary"
             className="mb-2 font-bold drop-shadow"
           >
             Room Only
           </Typography>
           <Typography
             
             variant="h5"
             color="text.primary"
             className="mb-2 font-bold drop-shadow"
           >
             Free cancellation (except for service fee)
           </Typography>
           <Typography
             
             variant="h5"
             color="text.primary"
             className="mb-2 font-bold drop-shadow"
           >
             Before Wed, 26 Jul
           </Typography>

      </Container>

      <Container maxWidth="md" className="flex flex-col w-full items-start" style={{ flex: 10 }}>
        <Container maxWidth="md" className="flex flex-row w-full items-start">
        <Typography
             
             variant="h5"
             color="text.primary"
             className="mb-2 font-bold drop-shadow"
           >
             SGD
           </Typography>
           <Typography
            
            variant="h5"
            color="text.primary"
            className="mb-2 font-bold drop-shadow"
          >
            270
          </Typography>    
        </Container>
            
           <Typography
             
              variant="h5"
              color="text.primary"
              className="mb-2 font-bold drop-shadow"
            >
              per room per night
            </Typography>

      </Container>
      <Container maxWidth="md" className="flex w-full items-start" style={{ flex: 1 }}>
        <SelectBtn/>
      </Container>
      </Container>
    </Box>
  );
}