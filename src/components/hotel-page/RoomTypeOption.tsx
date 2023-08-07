import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Room, mapBreakfastInfoToText } from "~/utils/idPricing";
import { AdditionalDetailsModal } from "./AdditionalDetailsModal";
import { SearchParams } from "~/utils/searchParams";
import { differenceInDays } from "date-fns";

export const RoomTypeOption = ({
  room,
  onImageViewAllClick,
  searchParams,
}: {
  room: Room;
  onImageViewAllClick?: () => void;
  searchParams?: SearchParams;
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const currency = "SGD";

  return (
    <>
      <CardActionArea onClick={() => setDetailsOpen(true)}>
        <CardContent>
          <Stack direction="row" className="place-content-between">
            <Box>
              <Typography variant="h6">
                {mapBreakfastInfoToText(room.roomAdditionalInfo?.breakfastInfo)}
              </Typography>
              <Typography className="mt-3" color="text.secondary">
                {room.free_cancellation
                  ? "Free cancellation ✓"
                  : "Cancellation fees apply"}
              </Typography>
            </Box>
            <Box className="flex flex-col place-items-end">
              <Typography variant="h6">
                {currency}{" "}
                {(searchParams && room.price
                  ? room.price /
                    differenceInDays(
                      searchParams.checkOutDate,
                      searchParams.checkInDate
                    ) /
                    searchParams.rooms
                  : room.price ?? 0
                ).toFixed(0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per room per night
              </Typography>
              <Button
                className="mt-2"
                component="span"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
              >
                Select Room
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
      <AdditionalDetailsModal
        room={room}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onImageViewAllClick={onImageViewAllClick}
      />
    </>
  );
};
