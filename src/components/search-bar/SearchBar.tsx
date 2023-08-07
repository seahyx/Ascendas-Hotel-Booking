import { DateRangeOutlined, HotelOutlined, Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { isBefore } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Destination } from "src/utils/destinations";
import DestinationAutocomplete from "./DestinationAutocomplete";
import {
  DefaultValues,
  SearchParams,
  searchParamsToQuery,
} from "~/utils/searchParams";
import { DateSelectorPopper } from "./DateSelectorPopper";
import { GuestSelectorPopper } from "./GuestSelectorPopper";

export interface SearchBarProps {
  onDestChange?: (value: Destination | null) => void;
  onSearchButtonClick?: (searchParams: SearchParams) => void;
  urlFunc?: (searchParams: SearchParams) => string;
  defaultValues?: DefaultValues;
}

export default function SearchBar({
  onDestChange,
  onSearchButtonClick,
  urlFunc,
  defaultValues,
}: SearchBarProps) {
  // URL function
  if (!urlFunc) {
    urlFunc = (searchParams: SearchParams) => {
      return `/search?${searchParamsToQuery(searchParams)}`;
    };
  }

  // Input error display toggles
  const [destErr, setDestErr] = useState(false);

  // Destination search
  const [dest, _setDest] = useState<Destination | null>(null);
  const setDest = (newDest: Destination | null) => {
    _setDest(newDest);
    onDestChange && onDestChange(newDest);
  };

  // Check in/out date range picker
  const searchBarRef = useRef(null);

  const defaultCheckInOutText = "Check-in/out";
  const [checkInOutErr, setCheckInOutErr] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date());
  const [checkInOutText, setCheckInOutText] = useState(defaultCheckInOutText);
  const [checkInOutPopperAnchor, setCheckInOutPopperAnchor] =
    useState<null | HTMLElement>(null);

  const handleCheckInOutClick = () => {
    setCheckInOutErr(false);
    setCheckInOutPopperAnchor(
      checkInOutPopperAnchor ? null : searchBarRef.current
    );
  };

  // Guest selector
  const guestRef = useRef(null);

  const defaultGuestText = "Guests/Rooms";
  const [guestErr, setGuestErr] = useState(false);
  const [guestText, setGuestText] = useState(defaultGuestText);
  const [guestPopperAnchor, setGuestPopperAnchor] =
    useState<null | HTMLElement>(null);

  const handleGuestSelectorClick = () => {
    setGuestErr(false);
    setGuestPopperAnchor(guestPopperAnchor ? null : guestRef.current);
  };

  const [numAdults, setNumAdults] = useState(1);
  const [numChild, setNumChild] = useState(0);
  const [numRooms, setNumRooms] = useState(1);

  // Search button
  const [searchParams, setSearchParams] = useState<SearchParams | null>();

  const handleSearchClick = () => {
    // Check for invalid values
    let hasInvalid = false;
    if (!dest) {
      setDestErr(true);
      hasInvalid = true;
    }
    if (!checkOutDate || !checkInDate || isBefore(checkOutDate, checkInDate)) {
      setCheckInOutErr(true);
      hasInvalid = true;
    }
    if (numAdults <= 0 || numRooms <= 0) {
      setGuestErr(true);
      hasInvalid = true;
    }
    if (hasInvalid) return;

    searchParams && onSearchButtonClick && onSearchButtonClick(searchParams);
  };

  useEffect(() => {
    // Check for invalid values
    let hasInvalid = false;
    if (!dest) {
      hasInvalid = true;
    }
    if (!checkOutDate || !checkInDate || isBefore(checkOutDate, checkInDate)) {
      hasInvalid = true;
    }
    if (numAdults <= 0 || numRooms <= 0) {
      hasInvalid = true;
    }
    if (hasInvalid) {
      setSearchParams(null);
      return;
    }

    dest &&
      checkInDate &&
      checkOutDate &&
      setSearchParams({
        ...dest,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: numAdults,
        child: numChild,
        rooms: numRooms,
      });
  }, [dest, checkOutDate, checkInDate, numAdults, numRooms, numChild]);

  return (
    <Card ref={searchBarRef} className="h-12 w-full">
      <Stack direction="row" className="h-full">
        <Tooltip
          open={destErr}
          onOpen={() => {}}
          onClose={() => {}}
          title="Please select a valid destination"
          arrow
        >
          <Box
            sx={
              !destErr
                ? {
                    borderColor: "divider",
                  }
                : {
                    border: 2,
                    borderColor: "error.main",
                  }
            }
            onClick={() => {
              setDestErr(false);
            }}
            className="peer flex grow-[3] basis-0 items-center rounded-s-xl transition-all focus-within:grow-[5] hover:grow-[5]"
          >
            <Search fontSize="medium" className="mx-3" />
            <DestinationAutocomplete
              className="w-full"
              onChange={setDest}
              defaultValues={defaultValues}
            />
          </Box>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <DateSelectorPopper
          onCheckInDateChange={setCheckInDate}
          onCheckOutDateChange={setCheckOutDate}
          onSetCheckInOutText={(text) => setCheckInOutText(text)}
          onClickAway={() => setCheckInOutPopperAnchor(null)}
          showError={checkInOutErr}
          anchorEl={checkInOutPopperAnchor}
          showTextOnStart={true}
          defaultValues={defaultValues}
        >
          <CardActionArea
            className="flex h-full"
            onClick={handleCheckInOutClick}
          >
            <DateRangeOutlined fontSize="medium" className="ms-3" />
            <Typography className="w-full truncate px-3 text-center">
              {checkInOutText}
            </Typography>
          </CardActionArea>
        </DateSelectorPopper>

        <Divider orientation="vertical" flexItem />

        <GuestSelectorPopper
          onAdultsChange={setNumAdults}
          onChildChange={setNumChild}
          onRoomsChange={setNumRooms}
          anchorEl={guestPopperAnchor}
          onClickAway={() => setGuestPopperAnchor(null)}
          onSetGuestsText={setGuestText}
          showError={guestErr}
          defaultValues={defaultValues}
        >
          <CardActionArea
            ref={guestRef}
            className="flex h-full"
            onClick={handleGuestSelectorClick}
          >
            <HotelOutlined fontSize="medium" className="ms-3" />
            <Typography className="w-full truncate px-3 text-center">
              {guestText}
            </Typography>
          </CardActionArea>
        </GuestSelectorPopper>

        <CardActionArea
          sx={{
            backgroundColor: "primary.main",
          }}
          LinkComponent={Link}
          className="flex w-36 flex-none"
          onClick={handleSearchClick}
          href={searchParams ? urlFunc(searchParams) : ""}
        >
          <Typography className="text-xl font-bold">SEARCH</Typography>
        </CardActionArea>
      </Stack>
    </Card>
  );
}
