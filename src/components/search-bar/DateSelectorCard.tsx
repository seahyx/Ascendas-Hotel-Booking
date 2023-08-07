import { Card, Typography, styled } from "@mui/material";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { add, addYears, isAfter, isBefore, isSameDay, set } from "date-fns";
import { ComponentType, useEffect, useState } from "react";

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
    startDate?: Date;
    endDate?: Date;
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
  (newDate: Date): void;
}

interface DateSelectorCardProps {
  onStartDateChange?: OnDateChange;
  onEndDateChange?: OnDateChange;
  defaultValues?: {
    checkInDate?: Date;
    checkOutDate?: Date;
  };
}

export default function DateSelectorCard({
  onStartDateChange,
  onEndDateChange,
  defaultValues,
}: DateSelectorCardProps) {
  const nextDay = (date: Date) => add(date, { days: 1 });
  const prevDay = (date: Date) => add(date, { days: -1 });
  const clearTime = (date: Date) =>
    set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

  const [startDate, _setStartDate] = useState<Date>(
    defaultValues?.checkInDate ??
      clearTime(
        add(new Date(), {
          weeks: 1,
        })
      )
  );
  const [endDate, _setEndDate] = useState<Date>(
    defaultValues?.checkOutDate ??
      clearTime(
        add(new Date(), {
          weeks: 1,
          days: 1,
        })
      )
  );
  const setStartDate = (date: Date) => {
    _setStartDate(date);
    if (onStartDateChange) onStartDateChange(date);
  };
  const setEndDate = (date: Date) => {
    _setEndDate(date);
    if (onEndDateChange) onEndDateChange(date);
  };
  const onChangeStart = (newDate: Date | null) => {
    if (!newDate) return;
    newDate = clearTime(newDate);
    setStartDate(newDate);
    if (newDate && endDate && isAfter(nextDay(newDate), endDate)) {
      setEndDate(nextDay(newDate));
    }
  };
  const onChangeEnd = (newDate: Date | null) => {
    if (!newDate) return;
    newDate = clearTime(newDate);
    setEndDate(newDate);
    if (newDate && startDate && isBefore(prevDay(newDate), startDate)) {
      setStartDate(prevDay(newDate));
    }
  };

  const today = new Date();
  const maxDate = addYears(today, 2);

  useEffect(() => {
    onChangeStart(startDate);
    onChangeEnd(endDate);
  }, []);

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
        onChange={onChangeStart}
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
        value={endDate}
        onChange={onChangeEnd}
        maxDate={maxDate}
        minDate={nextDay(today)}
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
