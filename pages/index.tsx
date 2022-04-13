import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Typography, Box, Grid } from "@mui/material";
import { Fireworks } from "fireworks/lib/react";

import styles from "../styles/Home.module.css";
import szczerbicePic from "../public/images/szczerbice.jpeg";

const fxProps = {
  count: 3,
  interval: 200,
  colors: ["#cc3333", "#4CAF50", "#81C784"],
  calc: (props: any, i: number) => ({
    ...props,
    x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
    y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
  }),
};

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
          <Fireworks {...fxProps} />
          <Typography color="primary" variant="h2">
            Szczerbice Family App
          </Typography>
        </Box>
        <Image src={szczerbicePic} alt="Szczerbice" height={500} width={500} />
      </Grid>
    </div>
  );
};

export default Home;
