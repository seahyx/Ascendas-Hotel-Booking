import { Box, Button, Stack } from "@mui/material";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

export interface ExpandableBoxProps {
  maxHeightRem: number;
  openText?: string;
  closeText?: string;
  fadeHeightRem?: number;
}

export default function ExpandableBox({
  maxHeightRem,
  openText,
  closeText,
  fadeHeightRem,
  children,
}: PropsWithChildren<ExpandableBoxProps>) {
  const ref = useRef<HTMLElement>(null);

  const [isClipped, setIsClipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  openText = openText ?? "Read More";
  closeText = closeText ?? "Show Less";
  fadeHeightRem = fadeHeightRem ?? 6;

  const fadePercent = Math.max((1 - fadeHeightRem / maxHeightRem) * 100, 0);

  useEffect(() => {
    const contentHeight = ref.current?.clientHeight ?? 0;
    const maxHeightPx =
      maxHeightRem *
      parseFloat(getComputedStyle(document.documentElement).fontSize);
    setIsClipped(contentHeight > maxHeightPx);
  }, [children]);

  return (
    <Stack direction="column">
      <Box
        className="transition-all"
        maxHeight={expanded ? "none" : `${maxHeightRem}rem`}
        sx={
          isClipped && !expanded
            ? {
                overflowY: "clip",
                maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) ${fadePercent}%, transparent 100%)`,
              }
            : {}
        }
      >
        <Box ref={ref}>{children}</Box>
      </Box>
      {isClipped && (
        <Button color="secondary" onClick={() => setExpanded(!expanded)}>
          {expanded ? closeText : openText}
        </Button>
      )}
    </Stack>
  );
}
