import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, PaletteMode } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import React from "react";
import Layout from "~/components/Layout";
import "~/styles/globals.css";
import { getTheme } from "~/styles/theme";
import { api } from "~/utils/api";

const cache = createCache({
  key: "css",
  prepend: true,
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => getTheme(mode), [mode]);
  // const theme = createTheme(getDesignTokens("light"));

  return (
    <>
      <Head>
        <title>SUTDHotelBooking - Book Your Next Destination Today!</title>
        <meta
          name="description"
          content="Book your next destination today with A Hotel Booking - with over 50,000 hotels in over 80 destinations around the world."
        />
      </Head>
      <SessionProvider session={session}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <CacheProvider value={cache}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CacheProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
