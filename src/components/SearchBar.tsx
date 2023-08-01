import { DateRangeOutlined, HotelOutlined, Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  ClickAwayListener,
  Divider,
  Fade,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Destination } from "~/utils/destinations";
import DateSelectorCard from "./DateSelectorCard";
import DestinationAutocomplete from "./DestinationAutocomplete";
import GuestSelectorCard from "./GuestSelectorCard";

export interface SearchParams {
  dest: Destination | null;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guests: {
    adults: number;
    child: number;
    rooms: number;
  };
}
interface SearchBarProps {
  onDestChange?: (value: Destination | null) => void;
  onSearchParams?: (searchParams: SearchParams) => void;
}

export default function SearchBar({
  onDestChange,
  onSearchParams,
}: SearchBarProps) {
  // Destination search
  const [dest, _setDest] = useState<Destination | null>(null);
  const setDest = (newDest: Destination | null) => {
    _setDest(newDest);
    onDestChange && onDestChange(newDest);
  };

  // Check in/out date range picker
  const searchBarRef = useRef(null);

  const defaultCheckInOutText = "Check-in/out";
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date());
  const [isCheckInOutOpened, setIsCheckInOutOpened] = useState(false);
  const [checkInOutText, setCheckInOutText] = useState(defaultCheckInOutText);
  const [checkInOutPopperAnchor, setCheckInOutPopperAnchor] =
    useState<null | HTMLElement>(null);
  const datePickerOpen = Boolean(checkInOutPopperAnchor);
  const showCheckInOutDates = checkInDate && checkOutDate && isCheckInOutOpened;

  const onStartDateChanged = (date: Date | null) => {
    setCheckInDate(date);
    setIsCheckInOutOpened(true);
  };
  const onEndDateChanged = (date: Date | null) => {
    setCheckOutDate(date);
    setIsCheckInOutOpened(true);
  };

  const handleCheckInOutClick = () => {
    setCheckInOutPopperAnchor(
      checkInOutPopperAnchor ? null : searchBarRef.current
    );
  };
  const handleCheckInOutClickAway = () => setCheckInOutPopperAnchor(null);

  useEffect(() => {
    setCheckInOutText(
      showCheckInOutDates
        ? `${format(checkInDate, "d MMM y")} - ${format(
            checkOutDate,
            "d MMM y"
          )}`
        : defaultCheckInOutText
    );
  }, [checkInDate, checkOutDate]);

  // Guest selector
  const guestButtonRef = useRef(null);

  const defaultGuestText = "Guests/Rooms";
  const [guestText, setGuestText] = useState(defaultGuestText);
  const [guestPopperAnchor, setGuestPopperAnchor] =
    useState<null | HTMLElement>(null);
  const guestSelectorOpen = Boolean(guestPopperAnchor);

  const handleGuestSelectorClick = () => {
    setGuestPopperAnchor(guestPopperAnchor ? null : guestButtonRef.current);
  };
  const handleGuestSelectorClickAway = () => setGuestPopperAnchor(null);

  const [numAdults, setNumAdults] = useState(0);
  const [numChild, setNumChild] = useState(0);
  const [numRooms, setNumRooms] = useState(0);

  useEffect(() => {
    setGuestText(
      numAdults === 0 && numChild === 0 && numRooms === 0
        ? defaultGuestText
        : `${numAdults} Adult${numAdults !== 1 ? "s" : ""}${
            numChild > 0 ? `/${numChild} Children` : ""
          }/${numRooms} Room${numRooms !== 1 ? "s" : ""}`
    );
  }, [numAdults, numChild, numRooms]);

  // Search button
  const handleSearchClick = () => {
    onSearchParams &&
      onSearchParams({
        dest,
        checkInDate,
        checkOutDate,
        guests: {
          adults: numAdults,
          child: numChild,
          rooms: numRooms,
        },
      });
  };

  return (
    <Card ref={searchBarRef} className="h-12 w-full rounded-xl">
      <Stack direction="row" className="h-full">
        <Box
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderLeft: 1,
            borderColor: "divider",
          }}
          className="peer flex grow-[3] basis-0 items-center transition-all focus-within:grow-[5] hover:grow-[5]"
        >
          <Search fontSize="medium" className="mx-3" />
          <DestinationAutocomplete className="w-full" onChange={setDest} />
        </Box>
        <Divider orientation="vertical" flexItem />

        <ClickAwayListener onClickAway={handleCheckInOutClickAway}>
          <Box
            sx={{
              borderTop: 1,
              borderBottom: 1,
              borderColor: "divider",
            }}
            className="min-w-0 grow-[3] basis-0 transition-all focus-within:grow-[4] hover:grow-[4]"
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
            <Popper
              open={datePickerOpen}
              anchorEl={checkInOutPopperAnchor}
              keepMounted
              disablePortal
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={200}>
                  <Box className="mt-2">
                    <DateSelectorCard
                      onStartDateChange={onStartDateChanged}
                      onEndDateChange={onEndDateChanged}
                    />
                  </Box>
                </Fade>
              )}
            </Popper>
          </Box>
        </ClickAwayListener>

        <Divider orientation="vertical" flexItem />

        <ClickAwayListener onClickAway={handleGuestSelectorClickAway}>
          <Box
            sx={{
              borderTop: 1,
              borderBottom: 1,
              borderColor: "divider",
            }}
            className="min-w-0 grow-[3] basis-0 transition-all focus-within:grow-[4] hover:grow-[4]"
          >
            <CardActionArea
              ref={guestButtonRef}
              className="flex h-full"
              onClick={handleGuestSelectorClick}
            >
              <HotelOutlined fontSize="medium" className="ms-3" />
              <Typography className="w-full truncate px-3 text-center">
                {guestText}
              </Typography>
            </CardActionArea>
            <Popper
              open={guestSelectorOpen}
              anchorEl={guestPopperAnchor}
              keepMounted
              disablePortal
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={250}>
                  <Box className="mt-2">
                    <GuestSelectorCard
                      onSetAdults={setNumAdults}
                      onSetChild={setNumChild}
                      onSetRooms={setNumRooms}
                    />
                  </Box>
                </Fade>
              )}
            </Popper>
          </Box>
        </ClickAwayListener>

        <CardActionArea
          sx={{
            backgroundColor: "primary.main",
          }}
          className="flex w-36 flex-none"
          onClick={handleSearchClick}
        >
          <Typography className="text-xl font-bold">SEARCH</Typography>
        </CardActionArea>
      </Stack>
    </Card>
  );
}
