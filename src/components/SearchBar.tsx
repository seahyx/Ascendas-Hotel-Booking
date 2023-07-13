import { DateRangeOutlined, HotelOutlined, Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import DestinationAutocomplete from "./DestinationAutocomplete";

export default function SearchBar() {
  return (
    <Card className="h-12 w-full rounded-xl">
      <Stack direction="row" className="h-full">
        <Box
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderLeft: 1,
            borderColor: "divider",
          }}
          className="peer flex basis-[40%] items-center transition-all focus-within:basis-[50%] hover:basis-[50%]"
        >
          <Search fontSize="medium" className="mx-3" />
          <DestinationAutocomplete className="w-full" />
        </Box>
        <Divider orientation="vertical" flexItem />
        <CardActionArea
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
          className="flex basis-[30%] transition-all hover:basis-[50%] focus-visible:basis-[50%] peer-focus-within:basis-[30%]"
        >
          <DateRangeOutlined fontSize="medium" className="ms-3" />
          <Typography className="grow text-center text-lg">
            Check-in/out
          </Typography>
        </CardActionArea>
        <Divider orientation="vertical" flexItem />
        <CardActionArea
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
          className="flex basis-[30%] transition-all hover:basis-[50%] focus-visible:basis-[50%] peer-focus-within:basis-[30%]"
        >
          <HotelOutlined fontSize="medium" className="ms-3" />
          <Typography className="grow text-center text-lg">
            Guests/Rooms
          </Typography>
        </CardActionArea>
        <CardActionArea
          sx={{
            backgroundColor: "primary.main",
          }}
          className="flex w-36 flex-none"
        >
          <Typography className="text-xl font-bold">SEARCH</Typography>
        </CardActionArea>
      </Stack>
    </Card>
  );
}
