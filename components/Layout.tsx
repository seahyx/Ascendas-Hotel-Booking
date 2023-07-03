import Head from "next/head";
import Footer from "./Footer";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box className="flex min-h-screen w-full flex-col place-content-between">
        <Header />
        <Box
          component="main"
          className="flex w-full grow flex-col items-center"
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
