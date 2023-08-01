import {
  Checkbox,
  Box,
  Card,
  Slider,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  CardContent,
  CardActionArea,
} from "@mui/material";
import Head from "next/head";
import TopBarWithSearch from "~/components/search-bar/TopBarWithSearch";
import RatingFilter from "~/components/RatingFilter";

function Sidebar() {
  return (
    <Stack className="w-72 pt-1" spacing={2}>
      <Box className="h-64" bgcolor="secondary.light"></Box>
      <Box className="relative h-[32rem] shadow-xl" bgcolor="info.main">
        <Typography className="pl-4 pt-2">Filters</Typography>
        <Container className="mt-1 h-6 object-center">
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            size="small"
          />
        </Container>
        <Container className="mt-2 h-6 object-center">
          <Slider aria-label="Default" valueLabelDisplay="auto" size="small" />
        </Container>
        <RatingFilter />
        <Typography className="mt-1 pl-4 text-xs font-bold">
          HOTELS POPULAR FOR
        </Typography>
        <FormGroup className="pl-6">
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Business Travellers"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Families"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Couples"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Singles"
          />
        </FormGroup>
      </Box>
    </Stack>
  );
}

function ResultList() {
  const numberOfTestResults = 4;
  const results = [];
  const testPrice = "SGD 10.00";
  for (let i = 0; i < numberOfTestResults; i++) {
    results.push(
      <Card className="flex h-56 w-auto border-gray-500 hover:bg-gray-100">
        <Box className="h-auto w-1/3" bgcolor="green">
          Image
        </Box>
        <Typography>Some Details</Typography>
      </Card>
    );
  }
  return (
    <Stack className="w-full object-right pt-8" spacing={2}>
      <Card className="flex h-56 w-auto border-gray-500 hover:bg-gray-100">
        <CardActionArea
          className="flex h-auto w-full flex-initial"
          href="/details"
        >
          <Box className="h-full w-1/3" bgcolor="green">
            Image
          </Box>
          <Box className=" h-full w-6/12 bg-amber-100">
            <Container className="flex flex-auto flex-col pl-2 pt-2">
              <Typography>
                Some Details, More Details, Even More Details, How Bout More
                Details
              </Typography>
            </Container>
          </Box>
          <Box className=" flex h-full w-auto flex-auto flex-col">
            <CardContent>
              <Rating className="pb-8 pt-2" value={1} readOnly />
              <Typography className="pt-10">{testPrice}</Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>

      <Card className="flex h-56 w-auto border-gray-500 hover:bg-gray-100">
        <Box className="h-auto w-1/3" bgcolor="green">
          Image
        </Box>
        <Box className="flex h-auto w-6/12 flex-col pl-2 pt-2">
          <Typography>Some Details</Typography>
        </Box>
        <Box className="w-2/9 flex h-auto flex-col pl-2">
          <CardContent>
            <Rating className="pb-8 pt-2" value={1} readOnly />
            <Typography className="pt-10">{testPrice}</Typography>
          </CardContent>
        </Box>
      </Card>
      {results}
    </Stack>
  );
}

export default function SearchResults(props) {
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
