import { createTheme } from "@mui/material/styles";

export function ViewPorts() {
  return (
    <meta
      name="viewport"
      content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi"
    />
  );
}

export const color = {
  gray: "#F0F2F5",
  grayLight: "#D0DAE9",
  white: "#ffffff",
  black: "#292B30",
  primary: "#292B30",
  pink: "#E21960"
};

export const player = {
  height: "60px"
};

export const borderRadius = {
  small: "2px"
};

export const screenSize = {
  large: "1440px"
};

export const padding = {
  smallest: "5px",
  smaller: "8px",
  small: "10px",
  medium: "20px",
  semilarge: "30px",
  large: "40px"
};

export const fontSize = {
  small: "10px",
  medium: "12px",
  bodySmall: "14px",
  body: "16px",
  bodyLarge: "18px",
  headline: "23px",
  headlineSmall: "20px",
  headlineLarge: "32px",
  h1: "32px"
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1240,
      xl: 1536
    }
  },
  typography: {
    fontFamily: "Helvetica"
  },
  palette: {
    divider: "rgba(255, 255, 255, 0.2)",
    primary: {
      main: "#4b0f69"
    },
    secondary: {
      main: "#292B30"
    }
  }
});
