import { CircularProgress } from "@mui/material";
import { FC } from "react";

interface PageLoaderProps {
  size?: number;
}

const PageLoader: FC<PageLoaderProps> = ({ size = 40 }) => (
  <div
    style={{
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress size={size} />
  </div>
);

export default PageLoader;
