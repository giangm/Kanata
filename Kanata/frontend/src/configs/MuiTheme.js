import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#FF7AC6" },
    secondary: { main: "#BF95F9" },
    accent: { main: "#FFB86B" },
    info: { main: "#8BE8FD" },
    success: { main: "#52FA7C" },
    warning: { main: "#F1FA89" },
    error: { main: "#FF5757" },
  },
  typography: {
    h1: {
      color: "white",
      fontSize: "2em",
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: "#272935",
          color: "#FFF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#272935",
          color: "#FFF",
        },
      },
    },
  },
  breakpoints: {
    values: { lg: 1100 }
  }
});

export default theme;
