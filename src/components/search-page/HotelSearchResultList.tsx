import { Pagination, Stack } from "@mui/material";
import { Hotel } from "src/utils/destinationPricing";
import HotelSearchResultItem, {
  HotelSearchResultItemProps,
} from "./HotelSearchResultItem";
import { useEffect, useState } from "react";
import { SearchParams, searchParamsToQuery } from "~/utils/searchParams";

export interface HotelSearchResultListProps {
  hotelsPricing: Hotel[];
  currency: string;
  maxItemsPerPage: number;
  searchParams?: SearchParams;
}

export default function HotelSearchResultList({
  hotelsPricing,
  currency,
  maxItemsPerPage,
  searchParams,
}: HotelSearchResultListProps) {
  // Pagination options
  const [currentPage, setCurrentPage] = useState(1);
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
    setHotelResultList(
      newHotelsPricingSliced
        .map(
          (hotel): HotelSearchResultItemProps => ({
            url: `/hotels/${hotel.id}?${
              searchParams ? searchParamsToQuery(searchParams) : ""
            }`,
            key: hotel.id,
            currency: currency,
            hotelPricing: hotel,
          })
        )
        .map((props) => <HotelSearchResultItem {...props} />)
    );
  }, [hotelsPricing, currentPage]);

  return (
    <Stack direction="column" className="w-full items-center" spacing={2}>
      {...hotelResultList}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPaginationChange}
      />
    </Stack>
  );
}
