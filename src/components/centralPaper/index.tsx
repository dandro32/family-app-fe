import React, { FC, ReactNode } from "react";
import { Paper, Grid } from "@mui/material";

interface CentralPaperProps {
  children: ReactNode;
}

const CentralPaper: FC<CentralPaperProps> = ({ children }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Paper
          elevation={2}
          sx={{ p: 2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "400px",
          }}
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CentralPaper;
