import { Box, ClickAwayListener, Fade, Popper, Tooltip } from "@mui/material";
import { format } from "date-fns";
import { PropsWithChildren, useEffect, useState } from "react";
import DateSelectorCard, {
  getDefaultCheckInDate,
  getDefaultCheckOutDate,
} from "./DateSelectorCard";

export interface DateSelectorPopperProps {
  onCheckInDateChange: (newDate: Date) => void;
  onCheckOutDateChange: (newDate: Date) => void;
  onSetCheckInOutText: (text: string) => void;
  onClickAway: () => void;
  showError: boolean;
  showTextOnStart?: boolean;
  anchorEl: HTMLElement | null;
  defaultValues?: {
    checkInDate?: Date;
    checkOutDate?: Date;
  };
}

export const DateSelectorPopper = ({
  onCheckInDateChange,
  onCheckOutDateChange,
  onSetCheckInOutText,
  onClickAway,
  showError,
  showTextOnStart,
  anchorEl,
  children,
  defaultValues,
}: PropsWithChildren<DateSelectorPopperProps>) => {
  // Check in/out date range picker
  const defaultCheckInOutText = "Check-in/out";
  const [checkInDate, setCheckInDate] = useState<Date>(
    getDefaultCheckInDate(defaultValues)
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    getDefaultCheckOutDate(defaultValues)
  );
  const [isCheckInOutOpened, setIsCheckInOutOpened] = useState(
    showTextOnStart ?? false
  );
  const showCheckInOutDates = checkInDate && checkOutDate && isCheckInOutOpened;

  const onStartDateChanged = (date: Date) => {
    setCheckInDate(date);
    setIsCheckInOutOpened(true);
    onCheckInDateChange(date);
  };
  const onEndDateChanged = (date: Date) => {
    setCheckOutDate(date);
    setIsCheckInOutOpened(true);
    onCheckOutDateChange(date);
  };

  const setCheckInOutText = (text: string) => {
    onSetCheckInOutText(text);
  };

  useEffect(() => {
    setCheckInOutText(
      showCheckInOutDates
        ? `${format(checkInDate, "d MMMM")} - ${format(checkOutDate, "d MMMM")}`
        : defaultCheckInOutText
    );
  }, [checkInDate, checkOutDate]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Tooltip
        open={showError}
        onOpen={() => {}}
        onClose={() => {}}
        title="Please select valid check in/out dates"
        arrow
      >
        <Box
          sx={
            !showError
              ? {
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
            keepMounted
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={200}>
                <Box className="mx-4 my-2">
                  <DateSelectorCard
                    onStartDateChange={onStartDateChanged}
                    onEndDateChange={onEndDateChanged}
                    defaultValues={{
                      ...defaultValues,
                    }}
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
