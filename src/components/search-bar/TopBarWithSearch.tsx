import { Box, Container } from "@mui/material";
import SearchBar, { SearchBarProps } from "./SearchBar";

export default function TopBarWithSearch(props: SearchBarProps) {
  return (
    <Box className="relative mb-6 h-32 w-full" bgcolor="secondary.main">
      <Container
        maxWidth="lg"
        className="absolute -bottom-6 left-0 right-0 z-20"
      >
        <SearchBar {...props} />
      </Container>
    </Box>
  );
}
