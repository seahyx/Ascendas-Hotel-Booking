import { Checkbox, Box, Slider, Container, Grid, Rating, Stack, Typography, TextField, FormGroup, FormControlLabel } from "@mui/material";
import Head from "next/head";
import TopBarWithSearch from "~/components/TopBarWithSearch";

function Sidebar() {
  return (
    <Stack className="pt-1 w-72" spacing={2}>
      <Box className="h-64" bgcolor="secondary.light"></Box>
      <Box className="relative h-[32rem] shadow-xl" bgcolor="info.main">
        <Typography className="pl-4 pt-2">Filters</Typography>
        <Container className="mt-4 object-center">
          <TextField size="small"></TextField>
          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </Container>
        <Container className="mt-4 object-center">
          <TextField size="small"></TextField>
          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </Container>
        <Container className="w-2/3 object-center">
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<Rating name="5stars" value={5} readOnly />} />
            <FormControlLabel control={<Checkbox />} label={<Rating name="4stars" value={4} readOnly />} />
            <FormControlLabel control={<Checkbox />} label={<Rating name="3stars" value={3} readOnly />} />
            <FormControlLabel control={<Checkbox />} label={<Rating name="2stars" value={2} readOnly />} />
            <FormControlLabel control={<Checkbox />} label={<Rating name="1stars" value={1} readOnly />} />
          </FormGroup>
        </Container>
      </Box>
    </Stack>
  );
}

function ResultList() {
  const numberOfTestResults = 6;
  const results = [];
  for (let i = 0; i < numberOfTestResults; i++) {
    results.push(<Box className="h-56" bgcolor="green">
      
    </Box>);
  }
  return(
    <Stack className="pt-4 w-full object-right" spacing={2}>
      <Container className="h-56 border-solid border-black hover:bg-gray-200">
        <Grid container spacing={1} columns={9}>
          <Grid item xs={3}>
            <Box className="w-full h-56" bgcolor="green"></Box>
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
        </Grid>
      </Container>
      {results}
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
