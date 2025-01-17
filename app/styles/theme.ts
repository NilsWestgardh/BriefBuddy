"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#737373",
    },
    background: {
      default: "#ffffff",
      paper: "#fafafa",
    },
    text: {
      primary: "#000000",
      secondary: "#262626",
      disabled: "#e5e5e5",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#eab308",
    },
    info: {
      main: "#3b82f6",
    },
    success: {
      main: "#16a34a",
    },
    divider: "#737373",
  },
  typography: {
    fontWeightLight: 300,
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 300,
    },
    subtitle1: {
      fontWeight: 400,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontWeight: 400,
    },
    overline: {
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
