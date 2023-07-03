import { PaletteMode, createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import NextLink from "next/link";
import { forwardRef } from "react";

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // Palette values for light mode
            primary: {
              main: "#f97316",
            },
            secondary: {
              main: "#1e0024",
            },
            divider: {
              main: blueGrey[100],
            },
          }
        : {
            // Palette values for dark mode
            primary: {
              main: "#f97316",
            },
            secondary: {
              main: "#1e0024",
            },
            divider: {
              main: blueGrey[800],
            },
          }),
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehaviour, // @ts-ignore
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehaviour,
        },
      },
    },
  });
