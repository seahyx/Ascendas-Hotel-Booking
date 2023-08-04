import {
  Box,
  Rating,
  Stack,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Hotel } from "src/utils/destinationPricing";
import { DestinationHotel } from "src/utils/destinationHotel";
import useSWR from "swr";

export interface HotelSearchResultItemProps {
  key: string;
  url: string;
  currency: string;
  hotelPricing: Hotel;
}

export default function HotelSearchResultItem({
  key,
  url,
  currency,
  hotelPricing,
}: HotelSearchResultItemProps) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const title = "Placeholder";
  const rating = 3;
  const address = "Test address 123";
  const [queryUrl, setQueryUrl] = useState<string | null>(null);
  const { data: hotelDetails }: { data: DestinationHotel } = useSWR(
    queryUrl,
    fetcher,
    {
      onSuccess(data, key, config) {
        console.log(data);
      },
    }
  );

  useEffect(() => {
    setQueryUrl(`/hotelapi/hotels/${hotelPricing.id}`);
  }, [hotelPricing]);

  return (
    <Card className="h-40 w-full" key={key}>
      <CardActionArea href={url} className="flex h-full flex-row">
        <Box className="relative h-full w-64 shrink-0">
          <Image
            src={
              hotelDetails
                ? `${hotelDetails.image_details.prefix}${hotelDetails.default_image_index}${hotelDetails.image_details.suffix}`
                : "/img/hotelplaceholder.jpg"
            }
            sizes="32rem"
            alt="Hotel Image"
            className="object-cover"
            quality={20}
            fill
          />
        </Box>
        <Stack className="h-full grow p-4" direction="column">
          <Stack direction="row">
            <Typography
              className="me-2 grow font-semibold"
              component="h1"
              variant="h5"
            >
              {hotelDetails?.name ?? title}
            </Typography>
            <Rating
              value={hotelDetails?.rating ?? rating}
              precision={0.5}
              readOnly
            />
          </Stack>
          <Typography component="h2" variant="subtitle1">
            {hotelDetails?.address ?? address}
          </Typography>
          <Box className="grow" />
          <Stack className="mt-2" direction="row" alignItems="baseline">
            <Typography
              className="me-2 grow"
              whiteSpace="nowrap"
              component="p"
              variant="body2"
            >
              Select a room starting from:
            </Typography>
            <Typography whiteSpace="nowrap" component="h3" variant="h6">
              {currency} {hotelPricing.price}
            </Typography>
            <Typography component="p" variant="body2">
              /night
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
