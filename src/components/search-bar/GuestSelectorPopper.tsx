import { HotelOutlined } from "@mui/icons-material";
import {
  ClickAwayListener,
  Tooltip,
  Box,
  CardActionArea,
  Typography,
  Popper,
  Fade,
} from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import GuestSelectorCard from "./GuestSelectorCard";

export interface GuestSelecterPopperProps {
  onAdultsChange: (newVal: number) => void;
  onChildChange: (newVal: number) => void;
  onRoomsChange: (newVal: number) => void;
  onSetGuestsText: (text: string) => void;
  onClickAway: () => void;
  showError: boolean;
  anchorEl: HTMLElement | null;
  defaultValues?: {
    adults?: number;
    child?: number;
    rooms?: number;
  };
}

export const GuestSelectorPopper = ({
  onAdultsChange,
  onChildChange,
  onRoomsChange,
  onSetGuestsText,
  onClickAway,
  showError,
  anchorEl,
  defaultValues,
  children,
}: PropsWithChildren<GuestSelecterPopperProps>) => {
  const defaultGuestText = "Guests/Rooms";

  const [numAdults, _setNumAdults] = useState(defaultValues?.adults ?? 1);
  const [numChild, _setNumChild] = useState(defaultValues?.child ?? 0);
  const [numRooms, _setNumRooms] = useState(defaultValues?.rooms ?? 1);
  const setNumAdults = (val: number) => {
    _setNumAdults(val);
    onAdultsChange(val);
  };
  const setNumChild = (val: number) => {
    _setNumChild(val);
    onChildChange(val);
  };
  const setNumRooms = (val: number) => {
    _setNumRooms(val);
    onRoomsChange(val);
  };

  useEffect(() => {
    onSetGuestsText(
      numAdults === 0 && numChild === 0 && numRooms === 0
        ? defaultGuestText
        : `${numAdults} Adult${numAdults !== 1 ? "s" : ""}${
            numChild > 0 ? `/${numChild} Children` : ""
          }/${numRooms} Room${numRooms !== 1 ? "s" : ""}`
    );
  }, [numAdults, numChild, numRooms]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Tooltip
        open={showError}
        onOpen={() => {}}
        onClose={() => {}}
        title="Please select a valid number of guests/rooms"
        arrow
      >
        <Box
          sx={
            !showError
              ? {
                  borderTop: 0,
                  borderBottom: 0,
                  borderColor: "divider",
                }
              : {
                  border: 2,
                  borderColor: "error.main",
                }
          }
          className="min-w-0 grow-[3] basis-0 transition-all focus-within:grow-[4] hover:grow-[4]"
        >
          {children}
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            sx={{
              zIndex: 20,
            }}
            disablePortal
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Box className="mx-4 my-2">
                  <GuestSelectorCard
                    onSetAdults={setNumAdults}
                    onSetChild={setNumChild}
                    onSetRooms={setNumRooms}
                    defaultValues={{ ...defaultValues }}
                  />
                </Box>
              </Fade>
            )}
          </Popper>
        </Box>
      </Tooltip>
    </ClickAwayListener>
  );
};
