import { TextField, Box, Button, Container, Rating, Typography, Stack } from "@mui/material";
import Head from "next/head";
import { useRef } from "react";
import TopBarWithSearch from "~/components/TopBarWithSearch";
import RoomOption from "~/components/RoomOption";
import RoomOptionVariation from "~/components/RoomOptionVariation";

function PrimaryGuestBox() {
  return (
    <Box className="my-10 w-10/12 h-auto flex bg-green-100"style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
      <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}><Typography >Primary Guest</Typography></Box>
      <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
        <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Title</Box>
        </Box>
        <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>First name</Box>
        
        </Box>
        <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Last name</Box>  
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
        <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Country Code</Box>  
        </Box>
        <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Phone Number</Box> 
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
        <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Special Requests</Box> 
        </Box>
      </Box>
      
     
    </Box>
    
    
  );
}

function PaymentInformationBillingAddress() {
  return (
    <Box className="my-10 h-auto w-10/12 bg-purple-200"style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
        
        <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}><Typography >Payment Information</Typography></Box>
        <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Card Number</Box> 
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Name on Card</Box> 
          </Box>
        </Box>
        <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Expiry Date</Box> 
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>CVV/CVC</Box> 
          </Box>
        </Box>
        <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}><Typography >Billing Address</Typography></Box>
        <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Address</Box> 
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>City</Box> 
          </Box>
        </Box>
        <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Zip/Post code</Box> 
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" , padding: "10px" }}>
            <Box style={{ display: "flex", flexDirection: "row" , padding: "10px" }}>Country</Box> 
          </Box>
        </Box>
    </Box>
  );
}

function confirmBookingForm() {
  return (
    <Box className="my-10 h-96 w-10/12 bg-pink-200">

    </Box>
    /**<Stack className="my-10 h-96 w-10/12 bg-gray-200" spacing={6}>
    <Box className="h-48 w-10/12" ><RoomOption/></Box>
    
  </Stack>*/
  );
}

function bookingSummaryBox() {
  return (
    <Box className="my-10 h-48 w-10/12 bg-yellow-200"></Box>
  );
}

function cancellationPolicyBox(){

}

export default function Book() {
 
  return (
    <>
      <Head>
        <title>Hotel Details</title>
        <meta name="description" content="Details of chosen hotel here." />
      </Head>
      <Box>Primary Guest Box</Box>
      <PrimaryGuestBox/>
      <PaymentInformationBillingAddress/>
    </>
  );
}
