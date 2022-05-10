import { CircularProgress } from "@mui/material";
import { FC } from "react";

interface PageLoaderProps {
  size?: number;
}

const PageLoader: FC<PageLoaderProps> = ({ size = 40 }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
    }}
  >
    <CircularProgress size={size} />
  </div>
);

export default PageLoader;
