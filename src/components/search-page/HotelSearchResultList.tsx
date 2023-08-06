import { Pagination, Stack } from "@mui/material";
import { Hotel } from "src/utils/destinationPricing";
import HotelSearchResultItem, {
  HotelSearchResultItemProps,
} from "./HotelSearchResultItem";
import { useEffect, useState } from "react";

export interface HotelSearchResultListProps {
  hotelsPricing: Hotel[];
  currency: string;
  maxItemsPerPage: number;
}

export default function HotelSearchResultList({
  hotelsPricing,
  currency,
  maxItemsPerPage,
}: HotelSearchResultListProps) {
  // Pagination options
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPricingSliced, setHotelsPricingSliced] = useState<Hotel[]>([]);
  const [hotelResultList, setHotelResultList] = useState<JSX.Element[]>([]);
  const totalPages =
    !hotelsPricing || hotelsPricing.length == 0
      ? 1
      : Math.ceil(hotelsPricing.length / maxItemsPerPage);

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (
      !hotelsPricing ||
      hotelsPricing.length == 0 ||
      currentPage > totalPages
    ) {
      setCurrentPage(1);
      return;
    }
    const newHotelsPricingSliced =
      hotelsPricing.slice(
        (currentPage - 1) * maxItemsPerPage,
        currentPage * maxItemsPerPage
      ) ?? [];
    setHotelsPricingSliced(newHotelsPricingSliced);
    setHotelResultList(
      newHotelsPricingSliced
        .map(
          (hotel): HotelSearchResultItemProps => ({
            url: `/hotels/${hotel.id}`,
            key: hotel.id,
            currency: currency,
            hotelPricing: hotel,
          })
        )
        .map((props) => <HotelSearchResultItem {...props} />)
    );
  }, [hotelsPricing, currentPage]);

  return (
    <Stack id='hotel-list' direction="column" className="w-full items-center" spacing={2}>
      {...hotelResultList}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPaginationChange}
      />
    </Stack>
  );
}
