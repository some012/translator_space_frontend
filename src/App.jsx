import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Content from "./templates/Content";
import LocalContainer from "./templates/LocalContainer";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import ThemeContext, { lightTheme, darkTheme, THEME_LIGHT, THEME_DARK } from "./contexts/ThemeContext";
import Header from "./components/Header.jsx";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const pages = [
  { id: 1, title: "Проекты", path: "about-me" },
];

function App() {
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  const [theme, setThemeState] = useState(lightTheme);
  const [mode, setMode] = useState(THEME_LIGHT);

  useEffect(() => {
    const savedMode = localStorage.getItem("appTheme");
    if (savedMode === THEME_DARK) {
      setThemeState(darkTheme);
      setMode(THEME_DARK);
    } else {
      setThemeState(lightTheme);
      setMode(THEME_LIGHT);
    }
  }, []);

  const setTheme = (newMode) => {
    if (newMode === THEME_DARK) {
      setThemeState(darkTheme);
      setMode(THEME_DARK);
      localStorage.setItem("appTheme", THEME_DARK);
    } else {
      setThemeState(lightTheme);
      setMode(THEME_LIGHT);
      localStorage.setItem("appTheme", THEME_LIGHT);
    }
  };

  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode }}>
      <ThemeProvider theme={ theme}>
        <CssBaseline />

        <Header pages={pages} />

        <LocalContainer>
          <Box height={"100%"} sx={{ padding: 2, overflow: "auto" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Content>
                  <Outlet />
                </Content>
              </Grid>
            </Grid>
          </Box>
        </LocalContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;