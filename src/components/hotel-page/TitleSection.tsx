import { StarRounded, LocationOnRounded } from "@mui/icons-material";
import { Box, Stack, Typography, Rating } from "@mui/material";
import { ReactNode } from "react";
import { DestinationHotel } from "~/utils/destinationHotel";

export const TitleSection = ({
  hotelDetails,
}: {
  hotelDetails?: DestinationHotel;
}) => {
  const SubItemContainer = ({ children }: { children?: ReactNode }) => (
    <Box className="flex flex-row items-center gap-2">{children}</Box>
  );
  const city = hotelDetails?.original_metadata.city;
  const state = hotelDetails?.original_metadata.state;

  return (
    <Stack direction="row" className="w-full">
      <Stack direction="column" spacing={1}>
        <Typography component="h1" variant="h2">
          {hotelDetails?.name}
        </Typography>
        <Stack direction="row" spacing={3} className="items-center">
          <SubItemContainer>
            <StarRounded color="primary" />
            <Typography variant="subtitle1">
              <strong>{hotelDetails?.trustyou.score.kaligo_overall}</strong>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              TrustYou™ Rating
            </Typography>
          </SubItemContainer>
          <SubItemContainer>
            <Rating
              value={hotelDetails?.rating}
              precision={0.5}
              sx={{ color: "primary.light" }}
              readOnly
            />
            <Typography color="text.secondary">
              {hotelDetails?.rating}-Star Hotel
            </Typography>
          </SubItemContainer>
          <SubItemContainer>
            <LocationOnRounded color="primary" />
            <Typography color="text.secondary">
              {hotelDetails?.address}
              {city ? `, ${city}` : ""}
              {state ? `, ${state}` : ""}
            </Typography>
          </SubItemContainer>
        </Stack>
      </Stack>
    </Stack>
  );
};
