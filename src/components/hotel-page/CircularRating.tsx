import { Box, CircularProgress } from "@mui/material";
import { PropsWithChildren } from "react";

export interface CircularRatingProps {
  rating: number;
  maxRating: number;
  color?: any;
}

export default function CircularRating({
  rating,
  maxRating,
  color,
  children,
}: PropsWithChildren<CircularRatingProps>) {
  return (
    <Box className="relative flex h-32 w-32 place-content-center items-center">
      {children}
      <Box className="absolute h-full w-full rotate-[-135deg]">
        <CircularProgress
          className=""
          variant="determinate"
          value={(rating / maxRating) * 75}
          size="8rem"
          color={color}
        />
      </Box>
    </Box>
  );
}
