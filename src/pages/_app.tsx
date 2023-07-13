import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, PaletteMode } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import Layout from "~/components/Layout";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import React from "react";
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
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
