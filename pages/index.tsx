import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Typography, Box } from "@mui/material";

import styles from "../styles/Home.module.css";
import szczerbicePic from "../public/images/szczerbice.jpeg";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Szczerbice Family App</title>
        <meta name="Szczerbice Family App" content="Szczerbice Family App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m="auto">
        <Typography variant="h1">Szczerbice Family App</Typography>
      </Box>
      <Image src={szczerbicePic} alt="Szczerbice" height={500} width={500} />
    </div>
  );
};

export default Home;
