import {Outlet} from "react-router-dom";
import "./App.css";
import Content from "./templates/Content";
import LocalContainer from "./templates/LocalContainer";
import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import ThemeContext, {darkTheme, lightTheme, THEME_DARK, THEME_LIGHT} from "./contexts/ThemeContext";
import Header from "./components/Header.jsx";
import {useEffect, useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const pages = [
  {id: 1, title: "Проекты", path: "about-me"},
];

function App() {
  const [theme, setThemeState] = useState(lightTheme);
  const [mode, setMode] = useState(THEME_LIGHT);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({username: 'geroi657'});
    }

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

  return (
    <ThemeContext.Provider value={{theme, setTheme, mode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>

        <Header pages={pages} user={user} setUser={setUser}/>

        <LocalContainer>
          <Box height={"100%"} sx={{padding: 2, overflow: "auto"}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Content>
                  <Outlet/>
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
