import { Stack, Typography } from "@mui/material";
import { Room } from "~/utils/idPricing";
import { RoomTypeCard } from "./RoomTypeCard";
import ExpandableBox from "../ExpandableBox";
import { SearchParams } from "~/utils/searchParams";
import { DestinationHotel } from "~/utils/destinationHotel";

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export const RoomSection = ({
  hotelRooms,
  searchParams,
  hotelDetails,
}: {
  hotelRooms?: Room[];
  searchParams?: SearchParams;
  hotelDetails?: DestinationHotel;
}) => {
  hotelRooms &&
    hotelRooms.sort((a, b) => {
      if (!a.price || !b.price) return 0;
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });
  const roomGroupings = hotelRooms
    ? groupBy(hotelRooms, (room) => room.roomNormalizedDescription ?? "")
    : null;
  // console.log(roomGroupings);
  return (
    <ExpandableBox maxHeightRem={48} openText="Show More Rooms">
      <Stack spacing={3} className="mb-6">
        {roomGroupings &&
          Object.keys(roomGroupings).map((groupTitle) => (
            <RoomTypeCard
              key={groupTitle}
              groupTitle={groupTitle}
              hotelRooms={roomGroupings[groupTitle]}
              searchParams={searchParams}
              hotelDetails={hotelDetails}
            />
          ))}
      </Stack>
    </ExpandableBox>
  );
};
