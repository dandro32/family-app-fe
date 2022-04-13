import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";

import theme from "../src/shared/theme";
import Layout from "../src/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
