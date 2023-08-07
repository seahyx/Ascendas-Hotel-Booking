import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Room } from "~/utils/idPricing";
import { CustomLightbox } from "./CustomLightbox";
import { RoomTypeOption } from "./RoomTypeOption";
import { groupBy } from "./RoomSection";
import { SearchParams } from "~/utils/searchParams";

export const RoomTypeCard = ({
  groupTitle,
  hotelRooms,
  searchParams,
}: {
  groupTitle: string;
  hotelRooms?: Room[];
  searchParams?: SearchParams;
}) => {
  let uniqueRoomOptions: Room[] | undefined;
  if (hotelRooms) {
    const roomOptionGroups = groupBy(
      hotelRooms,
      (room) => room.roomAdditionalInfo?.breakfastInfo ?? ""
    );
    uniqueRoomOptions = Object.keys(roomOptionGroups).reduce<Room[]>(
      (prev, curr) => {
        const roomGroup = roomOptionGroups[curr];
        if (roomGroup && roomGroup[0]) {
          prev.push(roomGroup[0]);
        }
        return prev;
      },
      []
    );
  }
  let heroImageUrl: string | undefined;
  if (uniqueRoomOptions && uniqueRoomOptions[0]?.images) {
    for (let i = 0; i < uniqueRoomOptions[0]?.images.length; i++) {
      if (uniqueRoomOptions[0]?.images[i]?.hero_image) {
        heroImageUrl = uniqueRoomOptions[0].images[i]?.url;
        break;
      }
      if (!heroImageUrl && uniqueRoomOptions[0].images[i]?.url) {
        heroImageUrl = uniqueRoomOptions[0].images[i]?.url;
      }
    }
  }
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const slides = (
    uniqueRoomOptions ? uniqueRoomOptions[0]?.images ?? [] : []
  ).map((image) => ({
    src: image.high_resolution_url ?? "",
  }));
  return (
    <Card variant="outlined">
      <CardHeader title={groupTitle} />
      <Stack direction="row">
        <CardActionArea
          className="mx-4 mb-4 h-fit w-fit overflow-hidden"
          sx={{ borderRadius: 1 }}
          onClick={() => setLightboxOpen(true)}
        >
          <Box className="group relative h-60 w-96 shrink-0">
            <Image
              src={heroImageUrl ?? ""}
              alt={groupTitle}
              className="object-cover"
              fill
            />
            <Box className="absolute top-0 h-full w-full">
              <Box
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
                bgcolor="primary.main"
                borderRadius={1}
              >
                <Typography variant="button" color="primary.contrastText">
                  See more
                </Typography>
              </Box>
              <Box
                className="z-10 h-full w-full opacity-0 transition-all  duration-300 ease-out group-hover:opacity-20"
                bgcolor="primary.main"
              />
            </Box>
          </Box>
        </CardActionArea>

        <Stack className="grow" divider={<Divider />}>
          {uniqueRoomOptions?.map((room) => (
            <RoomTypeOption
              key={room.key}
              room={room}
              onImageViewAllClick={() => setLightboxOpen(true)}
              searchParams={searchParams}
            />
          ))}
        </Stack>
      </Stack>
      <CustomLightbox
        index={index}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
      />
    </Card>
  );
};
