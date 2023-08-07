import { Box, Card, CardActionArea, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { DestinationHotel } from "~/utils/destinationHotel";
import { CustomLightbox } from "./CustomLightbox";

export const ImageSection = ({
  hotelDetails,
}: {
  hotelDetails?: DestinationHotel;
}) => {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const slides = [...Array(hotelDetails?.image_details.count).keys()].map(
    (i) => ({
      src: hotelDetails
        ? `${hotelDetails.image_details.prefix}${i}${hotelDetails.image_details.suffix}`
        : "",
    })
  );

  return (
    <>
      <Box
        className="grid h-96 w-full grid-flow-dense grid-cols-4 gap-4 overflow-hidden"
        borderRadius={1}
      >
        <Card className="col-span-2 row-span-2 overflow-hidden bg-slate-600">
          <CardActionArea
            className="relative h-full w-full"
            onClick={() => {
              setIndex(0);
              setLightboxOpen(true);
            }}
          >
            <Image
              src={
                hotelDetails
                  ? `${hotelDetails.image_details.prefix}0${hotelDetails.image_details.suffix}`
                  : "/img/hotelplaceholder.jpg"
              }
              sizes="32rem"
              alt="Hotel Image"
              className="object-cover"
              loading="eager"
              fill
            />
          </CardActionArea>
        </Card>
        {[1, 2, 3, 4].map((i) => (
          <Card className="relative overflow-hidden bg-slate-300" key={i}>
            <CardActionArea
              className="relative h-full w-full"
              onClick={() => {
                setIndex(i);
                setLightboxOpen(true);
              }}
            >
              {i === 4 && (
                <>
                  <Box className="absolute top-0 z-20 flex h-full w-full place-content-center items-center">
                    <Box
                      className="px-4 py-2"
                      bgcolor="primary.main"
                      borderRadius={1}
                    >
                      <Typography variant="button" color="primary.contrastText">
                        See more
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className="absolute top-0 z-10 h-full w-full opacity-30"
                    bgcolor="primary.dark"
                  />
                </>
              )}
              <Image
                src={
                  hotelDetails
                    ? `${hotelDetails.image_details.prefix}${i}${hotelDetails.image_details.suffix}`
                    : ""
                }
                sizes="32rem"
                alt="Hotel Image"
                className="object-cover"
                loading="eager"
                fill
              />
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <CustomLightbox
        index={index}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
      />
    </>
  );
};
