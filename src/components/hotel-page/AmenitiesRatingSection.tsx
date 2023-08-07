import { Stack, Typography } from "@mui/material";
import { DestinationHotel, AmenitiesRating } from "~/utils/destinationHotel";
import CircularRating from "./CircularRating";

export const AmenitiesRatingSection = ({
  hotelDetails,
}: {
  hotelDetails?: DestinationHotel;
}) => (
  <Stack direction="row" className="mt-6 flex-wrap place-content-center gap-6">
    {(hotelDetails?.amenities_ratings ?? []).map(
      (amenitiesRating: AmenitiesRating) => {
        const score: number | undefined = amenitiesRating.score;
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
          <CircularRating
            key={amenitiesRating.name}
            rating={amenitiesRating.score}
            maxRating={100}
            color={color}
          >
            <Stack direction="column" className="text-center">
              <Typography variant="h5" color={(color as string) + ".main"}>
                {amenitiesRating.score}
              </Typography>
              <Typography>{amenitiesRating.name}</Typography>
            </Stack>
          </CircularRating>
        );
      }
    )}
  </Stack>
);
