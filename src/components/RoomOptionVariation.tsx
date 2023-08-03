import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import SearchBar from "~/components/SearchBar";
import SelectBtn from "~/components/SelectBtn";
import Head from "next/head";
import Image from "next/image";
import { getTheme } from "~/styles/theme";

export default function RoomOptionVariation() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        border: "2px solid #d8d8d8",
        padding: "10px",
      }}
    >
      <Box
        className="flex h-auto w-full flex-row items-start"
        style={{ flex: 4, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" color="text.primary">
          Room Only
        </Typography>

        <Typography variant="h6" color="text.warning">
          Free cancellation (except for service fee)
        </Typography>
        <Typography variant="h6" color="text.primary">
          Before Wed, 26 Jul
        </Typography>
      </Box>

      <Box
        className="flex w-full flex-row items-start"
        style={{
          flex: 2,
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box style={{ padding: "10px", display: "flex", flexDirection: "row" }}>
          <Typography variant="h5" color="text.primary" fontWeight="750">
            SGD
          </Typography>
          <Typography variant="h5" color="text.primary" fontWeight="750">
            270
          </Typography>
        </Box>
        <Box style={{ flex: 1 }}>
          <Typography variant="h6" color="text.secondary">
            per room per night
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Assuming the SelectBtn component is properly implemented */}
        {/* If the SelectBtn component has an orange background, you'll need to update its styling as well */}
        <SelectBtn />
      </Box>
    </Box>
  );
}
