import { Stack, Chip } from "@mui/material";
import { DestinationHotel } from "~/utils/destinationHotel";

export const OverviewChips = ({
  hotelDetails,
}: {
  hotelDetails?: DestinationHotel;
}) => (
  <Stack direction="row" className="mt-3 flex-wrap gap-2">
    {Object.keys(hotelDetails?.categories ?? {}).map((key) => {
      const score: number | undefined = hotelDetails?.categories[key]?.score;
      let color: any;
      if (score) {
        color = "success";
        if (score < 33) {
          color = "error";
        } else if (score < 66) {
          color = "warning";
        }
      }
      return (
        <Chip
          key={key}
          label={`${score}% ${hotelDetails?.categories[key]?.name}`}
          color={color}
        />
      );
    })}
  </Stack>
);
