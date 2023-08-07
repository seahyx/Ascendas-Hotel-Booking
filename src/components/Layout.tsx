import { Box } from "@mui/material";
import Head from "next/head";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Box className="relative flex min-h-screen w-full flex-col place-content-between">
      <Header />
      <Box
        component="main"
        className={"flex w-full grow flex-col items-center " + className}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
