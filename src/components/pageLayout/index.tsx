import { FC, ReactNode } from "react";
import { Typography, Grid } from "@mui/material";

interface PageTitleProps {
  title: string;
  children: ReactNode;
}

const PageLayout: FC<PageTitleProps> = ({ title, children }) => (
  <Grid container spacing={0} style={{ minHeight: "100vh" }}>
    <Grid
      item
      justifyContent="center"
      marginTop={5}
      style={{ width: "100%", textAlign: "center" }}
    >
      <Typography variant="h3">{title}</Typography>
    </Grid>
    {children}
  </Grid>
);

export default PageLayout;
