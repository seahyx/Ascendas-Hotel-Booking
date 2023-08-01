import { Checkbox, Box, Card, Slider, Container, Grid, Rating, Stack, Typography, FormGroup, FormControlLabel, CardContent, CardActionArea } from "@mui/material";
import Head from "next/head";
import TopBarWithSearch from "~/components/search-bar/TopBarWithSearch";
import RatingFilter from "~/components/RatingFilter";

function Sidebar() {
  return (
    <Stack className="pt-1 w-72" spacing={2}>
      <Box className="h-64" bgcolor="secondary.light"></Box>
      <Box className="relative h-[32rem] shadow-xl" bgcolor="info.main">
        <Typography className="pl-4 pt-2">Filters</Typography>
        <Container className="mt-1 object-center h-6">
          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" size="small"/>
        </Container>
        <Container className="mt-2 object-center h-6">
          <Slider aria-label="Default" valueLabelDisplay="auto" size="small"/>
        </Container>
        <RatingFilter/>
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
  const numberOfTestResults = 4;
  const results = [];
  const testPrice = "SGD 10.00"
  for (let i = 0; i < numberOfTestResults; i++) {
    results.push(<Card className="h-56 w-auto flex border-gray-500 hover:bg-gray-100">
      <Box className="w-1/3 h-auto" bgcolor="green">Image</Box>
      <Typography>Some Details</Typography>
    </Card>);
  }
  return(
    <Stack className="pt-8 w-full object-right" spacing={2}>
      <Card className="h-56 w-auto flex border-gray-500 hover:bg-gray-100">
      <CardActionArea className="w-full h-auto flex flex-initial" href="/details">
          <Box className="w-1/3 h-full" bgcolor="green">Image</Box>
          <Box className=" w-6/12 h-full bg-amber-100">
            <Container className="pt-2 pl-2 flex flex-col flex-auto">
              <Typography >Some Details, More Details, Even More Details, How Bout More Details</Typography>
            </Container>
          </Box>
          <Box className=" w-auto h-full flex flex-col flex-auto">
            <CardContent>
              <Rating className="pt-2 pb-8" value={1} readOnly/>
              <Typography className="pt-10">{testPrice}</Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
      
      <Card className="h-56 w-auto flex border-gray-500 hover:bg-gray-100">
        <Box className="w-1/3 h-auto" bgcolor="green">Image</Box>
        <Box className="w-6/12 h-auto pt-2 pl-2 flex flex-col">
          <Typography>Some Details</Typography>
        </Box>
        <Box className="w-2/9 h-auto pl-2 flex flex-col">
          <CardContent>
            <Rating className="pt-2 pb-8" value={1} readOnly/>
            <Typography className="pt-10">{testPrice}</Typography>
          </CardContent>
        </Box>
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
