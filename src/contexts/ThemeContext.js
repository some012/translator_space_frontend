// contexts/ThemeContext.js
import { createContext } from "react";
import { createTheme } from "@mui/material/styles";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const ThemeContext = createContext();

export default ThemeContext;
export { THEME_LIGHT, THEME_DARK, lightTheme, darkTheme };
