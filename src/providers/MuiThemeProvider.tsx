import { StyledEngineProvider, Theme, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

export function DarkThemeProvider({ children }: { children: React.ReactNode }) {
  const muiTheme: Theme = createTheme({
    palette: {
      primary: {
        main: "#1A76D1"
      },
      secondary: {
        main: "#374151"
      },
      mode: "dark"
    }
  });
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledEngineProvider injectFirst>
        {children}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export function LightThemeProvider({ children }: { children: React.ReactNode }) {
  const muiTheme: Theme = createTheme({
    palette: {
      primary: {
        main: "#1A76D1"
      },
      secondary: {
        main: "#374151"
      },
      mode: "light"
    }
  });
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledEngineProvider injectFirst>
        {children}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
