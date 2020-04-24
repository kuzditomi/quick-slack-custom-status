import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { blueGrey } from '@material-ui/core/colors';

const defaultTheme = createMuiTheme({
  palette: {
    primary: blueGrey
  }
});

const AppThemeComponent: React.FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    {children}
  </ThemeProvider>
);

export default AppThemeComponent;
