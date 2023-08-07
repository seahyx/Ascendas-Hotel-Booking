import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Room } from "~/utils/idPricing";
import ExpandableBox from "../ExpandableBox";

export const AdditionalDetailsModal = ({
  room,
  open,
  onClose,
  onImageViewAllClick,
}: {
  room: Room;
  open: boolean;
  onClose: () => void;
  onImageViewAllClick?: () => void;
}) => {
  let heroImageUrl: string | undefined;
  if (room.images) {
    for (let i = 0; i < room.images.length; i++) {
      if (room.images[i]?.hero_image) {
        heroImageUrl = room.images[i]?.high_resolution_url;
        break;
      }
      if (!heroImageUrl && room.images[i]?.high_resolution_url) {
        heroImageUrl = room.images[i]?.high_resolution_url;
      }
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="md"
        className="no-scrollbar absolute left-1/2 top-1/2 max-h-screen -translate-x-1/2 -translate-y-1/2 overflow-x-scroll py-[15vh]"
      >
        <Paper className="overflow-hidden">
          <Box className="relative h-[28rem]">
            <Image
              src={heroImageUrl ?? ""}
              alt={room.roomNormalizedDescription ?? "Room Image"}
              className="object-cover"
              fill
            />
            <Button
              variant="contained"
              color="primary"
              className="absolute bottom-6 right-6"
              onClick={onImageViewAllClick}
            >
              See More
            </Button>
          </Box>
          <Stack className="p-12 pt-6" spacing={2}>
            <Typography variant="h4">
              {room.roomNormalizedDescription}
            </Typography>
            <Box>
              <Typography variant="h5" className="mb-2">
                Details
              </Typography>
              <ExpandableBox maxHeightRem={20}>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: room?.long_description ?? "",
                  }}
                />
              </ExpandableBox>
            </Box>
            <Box>
              <Typography variant="h5" className="mb-4">
                Amenities
              </Typography>
              <ExpandableBox maxHeightRem={20}>
                <Box className="mb-3 grid grid-flow-row grid-cols-3 gap-2">
                  {room.amenities &&
                    room.amenities.map((value) => (
                      <Typography key={value}>{value}</Typography>
                    ))}
                </Box>
              </ExpandableBox>
            </Box>
            <Box>
              <Typography variant="h5" className="mb-4">
                Additional Details
              </Typography>
              <Stack spacing={2}>
                <Typography>
                  Breakfast included:{" "}
                  {room.roomAdditionalInfo?.breakfastInfo ===
                  "hotel_detail_room_only"
                    ? "Yes"
                    : "No"}
                </Typography>
                {room.roomAdditionalInfo?.displayFields
                  ?.check_in_instructions && (
                  <Box>
                    <Typography variant="h6">Check-in Instructions</Typography>
                    <Typography>
                      {
                        room.roomAdditionalInfo?.displayFields
                          ?.check_in_instructions
                      }
                    </Typography>
                  </Box>
                )}
                {room.roomAdditionalInfo?.displayFields
                  ?.special_check_in_instructions && (
                  <Box>
                    <Typography variant="h6">
                      Special Check-in Instructions
                    </Typography>
                    <Typography>
                      {
                        room.roomAdditionalInfo?.displayFields
                          ?.special_check_in_instructions
                      }
                    </Typography>
                  </Box>
                )}
                {room.roomAdditionalInfo?.displayFields?.know_before_you_go && (
                  <Box>
                    <Typography variant="h6">Know Before You Go</Typography>
                    <Typography>
                      {
                        room.roomAdditionalInfo?.displayFields
                          ?.know_before_you_go
                      }
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  );
};
