import { Box, Container, Stack } from "@mui/material";
import TopBarWithSearch from "components/TopBarWithSearch";
import Head from "next/head";

function Sidebar() {
  return (
    <Stack className="w-72" spacing={2}>
      <Box className="h-64" bgcolor="secondary.light"></Box>
      <Box className="h-[32rem]" bgcolor="info.main"></Box>
    </Stack>
  );
}

export default function SearchResults() {
  const placeholderCountry = "Singapore";
  return (
    <>
      <Head>
        <title>Search Hotels in {placeholderCountry}!</title>
        <meta name="description" content="Search results details here." />
      </Head>
      <TopBarWithSearch />
      <Container maxWidth="lg" className="">
        <Sidebar />
      </Container>
    </>
  );
}
