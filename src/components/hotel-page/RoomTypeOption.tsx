import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { differenceInDays } from "date-fns";
import { useState } from "react";
import { Room, mapBreakfastInfoToText } from "~/utils/idPricing";
import { SearchParams } from "~/utils/searchParams";
import { AdditionalDetailsModal } from "./AdditionalDetailsModal";
import { PaymentProps } from "~/pages/payment";
import { DestinationHotel } from "~/utils/destinationHotel";
import useStorage from "~/utils/useStorage";
import { useRouter } from "next/router";

export const RoomTypeOption = ({
  room,
  onImageViewAllClick,
  searchParams,
  hotelDetails,
}: {
  room: Room;
  onImageViewAllClick?: () => void;
  searchParams?: SearchParams;
  hotelDetails?: DestinationHotel;
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const currency = "SGD";
  const router = useRouter();

  const { setItem } = useStorage();

  const avgRoomCost =
    searchParams && room.price
      ? room.price /
        differenceInDays(searchParams.checkOutDate, searchParams.checkInDate) /
        searchParams.rooms
      : room.price ?? 0;
  const roomOptionInfo = mapBreakfastInfoToText(
    room.roomAdditionalInfo?.breakfastInfo
  );

  const paymentProps: PaymentProps = {
    destinationId: searchParams?.uid ?? "",
    hotelName: hotelDetails?.name ?? "",
    hotelId: hotelDetails?.id ?? "",
    roomId: room.key ?? "",
    startDate: searchParams?.checkInDate ?? new Date(),
    endDate: searchParams?.checkOutDate ?? new Date(),
    adults: searchParams?.adults ?? 1,
    children: searchParams?.child ?? 0,
    numberOfRooms: searchParams?.rooms ?? 1,
    numberOfNights: searchParams
      ? differenceInDays(searchParams?.checkOutDate, searchParams?.checkInDate)
      : 0,
    roomType: room.roomNormalizedDescription ?? "",
    tax: 0,
    additionalInfo: roomOptionInfo,
    roomRate: room.price ?? 0,
    avgRoomCost: avgRoomCost,
  };

  return (
    <>
      <CardActionArea onClick={() => setDetailsOpen(true)}>
        <CardContent>
          <Stack direction="row" className="place-content-between">
            <Box>
              <Typography variant="h6">{roomOptionInfo}</Typography>
              <Typography className="mt-3" color="text.secondary">
                {room.free_cancellation
                  ? "Free cancellation ✓"
                  : "Cancellation fees apply"}
              </Typography>
            </Box>
            <Box className="flex flex-col place-items-end">
              <Typography variant="h6">
                {currency} {avgRoomCost.toFixed(0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per room per night
              </Typography>

              <Button
                component="span"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setItem(
                    "paymentProps",
                    JSON.stringify(paymentProps),
                    "session"
                  );
                  router.push("/payment");
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
