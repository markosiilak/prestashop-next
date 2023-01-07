import "../styles/globals.css";

import { ThemeProvider } from "@emotion/react";

import { theme } from "@/lib/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
