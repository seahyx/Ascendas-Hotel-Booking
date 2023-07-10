import {
  DateRange,
  DateRangeOutlined,
  HotelOutlined,
  Search,
} from "@mui/icons-material";
import {
  Card,
  Stack,
  CardActionArea,
  Divider,
  Typography,
} from "@mui/material";

export default function SearchBar() {
  return (
    <Card className="h-12 w-full rounded-xl">
      <Stack direction="row" className="h-full">
        <CardActionArea
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderLeft: 1,
            borderColor: "divider",
          }}
          className="flex"
        >
          <Search fontSize="medium" className="ms-3" />
          <Typography className="grow text-center text-lg">
            Destination
          </Typography>
        </CardActionArea>
        <Divider orientation="vertical" flexItem />
        <CardActionArea
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
          className="flex"
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
          className="flex"
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
