import { Box, Typography } from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TopBarWithSearch from "~/components/TopBarWithSearch";

export const getServerSideProps: GetServerSideProps<{
  data: any;
}> = async () => {
  const res = await fetch(
    "https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1"
  );
  const data = await res.json();
  return { props: { data } };
};

export default function DebugAPIPage({
      data,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <TopBarWithSearch />
      <Box className="w-full">
        <Typography className="overflow-scroll">
          {JSON.stringify(data)}
        </Typography>
      </Box>
    </>
  );
}
