import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Typography, Box, Grid } from "@mui/material";

import styles from "../styles/Home.module.css";
import szczerbicePic from "../public/images/szczerbice.jpeg";
import { withAuth } from "../src/shared/utils";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Szczerbice Family App</title>
        <meta name="Szczerbice Family App" content="Szczerbice Family App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Box m="auto">
          <Typography color="primary" variant="h2">
            Szczerbice Family App
          </Typography>
        </Box>
        <Image src={szczerbicePic} alt="Szczerbice" height={500} width={500} />
      </Grid>
    </div>
  );
};

export default withAuth(Home);
