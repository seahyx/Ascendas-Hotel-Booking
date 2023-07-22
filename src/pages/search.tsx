import { Checkbox, Box, Card, Slider, Container, Grid, Rating, Stack, Typography, FormGroup, FormControlLabel, Slide } from "@mui/material";
import Head from "next/head";
import TopBarWithSearch from "~/components/TopBarWithSearch";

function Sidebar() {
  return (
    <Stack className="pt-1 w-72" spacing={2}>
      <Box className="h-64" bgcolor="secondary.light"></Box>
      <Box className="relative h-[32rem] shadow-xl" bgcolor="info.main">
        <Typography className="pl-4 pt-2">Filters</Typography>
        <Container className="mt-2 object-center">
          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </Container>
        <Container className="mt-2 object-center">
          <Slider aria-label="Default" valueLabelDisplay="auto" />
        </Container>
        <Typography className="pl-4 font-bold text-xs">HOTEL STAR RATING</Typography>
        <FormGroup className="pl-6">
          <FormControlLabel control={<Checkbox size="small"/>} label={<Rating name="5stars" value={5} readOnly />} />
          <FormControlLabel control={<Checkbox size="small"/>} label={<Rating name="4stars" value={4} readOnly />} />
          <FormControlLabel control={<Checkbox size="small"/>} label={<Rating name="3stars" value={3} readOnly />} />
          <FormControlLabel control={<Checkbox size="small"/>} label={<Rating name="2stars" value={2} readOnly />} />
          <FormControlLabel control={<Checkbox size="small"/>} label={<Rating name="1stars" value={1} readOnly />} />
        </FormGroup>
        <Typography className="pl-4 mt-1 font-bold text-xs">HOTELS POPULAR FOR</Typography>
        <FormGroup className="pl-6">
          <FormControlLabel control={<Checkbox size="small"/>} label="Business Travellers"/>
          <FormControlLabel control={<Checkbox size="small"/>} label="Families"/>
          <FormControlLabel control={<Checkbox size="small"/>} label="Couples"/>
          <FormControlLabel control={<Checkbox size="small"/>} label="Singles"/>
        </FormGroup>
      </Box>
    </Stack>
  );
}

function ResultList() {
  const numberOfTestResults = 6;
  const results = [];
  for (let i = 0; i < numberOfTestResults; i++) {
    results.push(<Card className="h-56 w-auto flex border-gray-500 hover:bg-gray-100">
      <Box className="w-1/3 h-auto" bgcolor="green">Image</Box>
      <Typography>Some Details</Typography>
    </Card>);
  }
  return(
    <Stack className="pt-4 w-full object-right" spacing={2}>
      <Card className="h-56 w-auto flex border-gray-500 hover:bg-gray-100">
        <Box className="w-1/3 h-auto" bgcolor="green">Image</Box>
        <Typography>Some Details</Typography>
      </Card>
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
