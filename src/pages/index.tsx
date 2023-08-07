import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchBar from "src/components/search-bar/SearchBar";
import { getTheme } from "src/styles/theme";

export default function Home(props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <ThemeProvider theme={getTheme("dark")}>
        <Box className="relative mb-6 h-[20rem] w-full">
          <Container
            maxWidth="md"
            className="absolute bottom-0 left-0 right-0 z-20"
          >
            <Typography
              component="h1"
              variant="h3"
              color="text.primary"
              className="mb-2 font-bold drop-shadow"
            >
              TRAVELLING SOMEWHERE?
            </Typography>
            <Typography
              component="p"
              variant="h5"
              color="text.secondary"
              className="mb-16 drop-shadow"
            >
              Find your perfect stay from over 50,000 hotels in 80 destinations
              <br />
              around the world.
            </Typography>
          </Container>
          <Image
            src="/img/home/underwater_bedroom.jpg"
            fill={true}
            alt="underwater hotel bedroom"
            className="object-cover"
          />
          <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.5)]"></div>
          <ThemeProvider theme={theme}>
            <Container
              maxWidth="md"
              className="absolute -bottom-6 left-0 right-0 z-20"
            >
              <SearchBar onSearchButtonClick={onSearchButtonClick} />
            </Container>
          </ThemeProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}
