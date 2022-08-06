import { createTheme } from "@mui/material/styles";
import { red, blue, deepPurple, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: deepPurple[200],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
