import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#EDEAE5",
      default: "hsla(0,0%,100%,.8)",
    },
    primary: {
      main: "#73303d",
    },
    secondary: {
      main: "#a6302e",
    },
    text: {
      primary: "#0D0D0D",
      secondary: "#666666",
    },
    success: {
      main: "#22CF7B",
    },
    error: {
      main: "#a6302e",
    },
    warning: {
      main: "#FFBC32",
    },
    // prettier-ignore
    grey: {
      "100": "#F2F2F2",
      "200": "#E5E5E5",
      "300": "#CCCCCC",
      "500": "#666666",
      "900": "#0D0D0D",
    }
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontSize: 16,
    fontFamily: "Segoe UI, sans-serif",
    h1: {
      fontWeight: 400,
      fontSize: 64,
      letterSpacing: "-0.24px",
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 400,
      fontSize: 32,
      letterSpacing: "-0.24px",
      lineHeight: 1.1,
    },
    h3: {
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: "-0.06px",
      lineHeight: 1.1,
    },
    h4: {
      fontWeight: 600,
      fontSize: 18,
      letterSpacing: "-0.06px",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: 16,
      letterSpacing: "-0.05px",
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: "-0.05px",
      lineHeight: 1.2,
    },
    body1: {
      fontSize: 18,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 16,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: 14,
      lineHeight: 1.2,
    },
    caption: {
      fontSize: 14,
      lineHeight: 1.2,
    },
  },
  spacing: [2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64],
});

export default theme;
