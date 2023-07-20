import { Box, Slider, Container, Grid, Rating, Stack, Typography, TextField } from "@mui/material";
import Head from "next/head";
import TopBarWithSearch from "~/components/TopBarWithSearch";

function Sidebar() {
  return (
    <Stack className="pt-1 w-72" spacing={2}>
      <Box className="h-64" bgcolor="secondary.light"></Box>
      <Box className="relative h-[32rem] shadow-xl" bgcolor="info.main">
        <title>Test</title>
        <Container className="w-2/3 object-center">
          <Typography component="legend">Rating1</Typography>
          <Rating name="rating1" value={2}/>
        </Container>
        <Container className="mt-4 w-2/3 object-center">
          <Typography component="legend">Rating2</Typography>
          <Rating name="rating2" value={3}/>
        </Container>
        <Container className="mt-4 object-center">
          <TextField size="small"></TextField>
          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </Container>
      </Box>
    </Stack>
  );
}

function ResultList() {
  const numberOfTestResults = 6;
  const results = [];
  for (let i = 0; i < numberOfTestResults; i++) {
    results.push(<Box className="h-56" bgcolor="green"></Box>);
  }
  return(
    <Stack className="pt-4 w-full object-right" spacing={2}>
      {results}
      <Box className="h-56" bgcolor="green"></Box>
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
      <Grid container spacing={1} columns={12} lg>
        <Grid item xs={3}>
          <Container maxWidth="lg" className="sticky top-0">
            <Sidebar />
          </Container>
        </Grid>
        <Grid item xs={9}>
          <Container maxWidth="lg" className="">
            <ResultList />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
