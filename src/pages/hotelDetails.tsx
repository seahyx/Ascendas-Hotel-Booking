import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import SearchBar from "~/components/SearchBar";
import RoomOptionVariation from "~/components/RoomOptionVariation";
import Head from "next/head";
import Image from "next/image";
import { getTheme } from "~/styles/theme";

export default function HotelDetails() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Hotel Details Page</title>
        <meta
          name="description"
          content="View Hotel Details."
        />
      </Head>
      
    </>
  );
}
