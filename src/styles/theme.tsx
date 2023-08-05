import { PaletteMode, createTheme } from "@mui/material";
import { Readex_Pro } from "next/font/google";
import NextLink from "next/link";
import { ForwardedRef, forwardRef } from "react";

// Fonts
const lexend = Readex_Pro({ subsets: ["latin"] });

const LinkBehaviour = forwardRef(function LinkBehaviour(
  props: { href: string; [key: string]: any },
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return <NextLink ref={ref} {...props} />;
});
const rootElement = () => document.getElementById("__next");

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
              main: "#240900",
              contrastText: "#ffffff66",
            },
            warning: {
              main: "#ed6c02",
              contrastText: "#ffffff66",
            },
          }
        : {
            // Palette values for dark mode
            primary: {
              main: "#f97316",
            },
            secondary: {
              main: "#240900",
              contrastText: "#ffffff66",
            },
            warning: {
              main: "#e65100",
              contrastText: "#ffffff66",
            },
          }),
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: [
        lexend.style.fontFamily,
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehaviour,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehaviour,
        },
      },
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: rootElement,
        },
      },
    },
  });
