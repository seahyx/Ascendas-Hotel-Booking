import { Card, Typography, styled } from "@mui/material";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { addYears, isAfter, isBefore, isEqual, isSameDay } from "date-fns";
import { ComponentType, useState } from "react";

interface CustomPickerDayProps extends PickersDayProps<Date> {
  dayIsBetween: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isStartDate" && prop !== "isEndDate",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isStartDate, isEndDate }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isStartDate &&
    !isEndDate && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
  ...(isEndDate &&
    !isStartDate && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
})) as ComponentType<CustomPickerDayProps>;

function Day(
  props: PickersDayProps<Date> & {
    startDate?: Date | null;
    endDate?: Date | null;
  }
) {
  const { day, startDate, endDate, ...other } = props;

  if (!startDate || !endDate) {
    return <PickersDay day={day} {...other} />;
  }

  const isStartDate = isSameDay(day, startDate);
  const isEndDate = isSameDay(day, endDate);
  const dayIsBetween =
    isAfter(day, startDate) &&
    isBefore(day, endDate) &&
    (!isStartDate || !isEndDate);

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={
        (dayIsBetween || isStartDate || isEndDate) &&
        !(isStartDate && isEndDate)
          ? { px: 2.5, mx: 0 }
          : {}
      }
      dayIsBetween={dayIsBetween}
      isStartDate={isStartDate}
      isEndDate={isEndDate}
    />
  );
}

interface OnDateChange {
  (newDate: Date | null): void;
}

interface DateSelectorCardProps {
  onStartDateChange?: OnDateChange;
  onEndDateChange?: OnDateChange;
}

export default function DateSelectorCard({
  onStartDateChange,
  onEndDateChange,
}: DateSelectorCardProps) {
  const [startDate, _setStartDate] = useState<Date | null>(new Date());
  const [endDate, _setEndDate] = useState<Date | null>(new Date());
  const setStartDate = (date: Date | null) => {
    _setStartDate(date);
    if (onStartDateChange) onStartDateChange(date);
  };
  const setEndDate = (date: Date | null) => {
    _setEndDate(date);
    if (onEndDateChange) onEndDateChange(date);
  };

  const today = new Date();
  const maxDate = addYears(today, 2);
  return (
    <Card id="calendar" className="grid grid-cols-2 p-4">
      <Typography
        component="p"
        variant="h6"
        color="text.secondary"
        className="px-6"
      >
        From
      </Typography>
      <Typography
        component="p"
        variant="h6"
        color="text.secondary"
        className="px-6"
      >
        To
      </Typography>
      <DateCalendar
        value={startDate}
        onChange={(newDate) => {
          setStartDate(newDate);
          if (newDate && endDate && isAfter(newDate, endDate)) {
            setEndDate(newDate);
          }
        }}
        maxDate={maxDate}
        disablePast
        slots={{ day: Day }}
        slotProps={{
          day: {
            startDate: startDate,
            endDate: endDate,
          } as any,
        }}
      />
      <DateCalendar
        id='endDate'
        value={endDate}
        onChange={(newDate) => {
          setEndDate(newDate);
          if (newDate && startDate && isBefore(newDate, startDate)) {
            setStartDate(newDate);
          }
        }}
        maxDate={maxDate}
        disablePast
        slots={{ day: Day }}
        slotProps={{
          day: {
            startDate: startDate,
            endDate: endDate,
          } as any,
        }}
      />
    </Card>
  );
}
