import { Box, Container } from "@mui/material";
import SearchBar from "./SearchBar";

export default function TopBarWithSearch() {
  return (
    <Box className="relative h-32 w-full" bgcolor="secondary.main">
      <Container
        maxWidth="md"
        className="absolute -bottom-6 left-0 right-0 z-20"
      >
        <SearchBar />
      </Container>
    </Box>
  );
}
