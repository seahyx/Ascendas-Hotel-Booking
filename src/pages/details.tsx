import Head from "next/head";
import TopBarWithSearch from "~/components/TopBarWithSearch";

export default function SearchResults() {
    return (
      <>
        <Head>
          <title>Hotel Details</title>
          <meta name="description" content="Search results details here." />
        </Head>
        <TopBarWithSearch />
      </>
    );
  }