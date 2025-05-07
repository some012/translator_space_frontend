import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { THEME_DARK, THEME_LIGHT } from '../contexts/ThemeContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import './Header.css';

const Header = ({ pages }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { setTheme, mode } = useContext(ThemeContext);

  // Устанавливаем атрибут data-theme в body при изменении темы
  useEffect(() => {
    document.body.setAttribute('data-theme', mode === THEME_DARK ? 'dark' : 'light');
  }, [mode]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleTheme = () => {
    setTheme(mode === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  };

  return (
    <AppBar
      position="static"
      className="header-appbar"
      sx={{
        backgroundColor: mode === THEME_DARK ? '#121212' : '#ffffff', // Фон в зависимости от темы
        boxShadow: 'none',
      }}
    >
      <Toolbar className="header-toolbar">
        {/* Левая часть — Логотип + название */}
        <Box className="header-left" onClick={() => navigate('/')}>
          <Box
            component="img"
            src="src/assets/Logo.png"
            alt="TranslatorSpace Logo"
            className="header-logo"
            sx={{
              filter: mode === THEME_DARK ? 'invert(0)' : 'invert(1)', // Инвертируем логотип в темной теме
            }}
          />
          <Box className="header-divider" />
          <Typography variant="h6" noWrap className="header-title" sx={{ color: mode === THEME_DARK ? '#ffffff' : '#000000' }}>
            Translator Space
          </Typography>
        </Box>

        {/* Правая часть — Навигация и переключатель тем */}
        {isMobile ? (
          <>
            <IconButton size="large" edge="end" color="inherit" onClick={toggleDrawer(true)} aria-label="Открыть меню">
              <MenuIcon sx={{ color: mode === THEME_DARK ? '#ffffff' : '#000000' }} />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                className="header-drawer"
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {pages.map((page) => (
                    <ListItem key={page.id} disablePadding>
                      <ListItemButton onClick={() => navigate(page.path)}>
                        <ListItemText primary={page.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding>
                    <IconButton onClick={toggleTheme} color="inherit" aria-label="Переключить тему" sx={{ marginLeft: 1 }}>
                      {mode === THEME_DARK ? (
                        <LightModeIcon sx={{ color: '#ffffff' }} />
                      ) : (
                        <DarkModeIcon sx={{ color: '#000000' }} />
                      )}
                    </IconButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box className="header-right">
            <Box className="header-divider" />
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => navigate(page.path)}
                className="header-button"
              >
                {page.title}
              </Button>
            ))}
            <IconButton
              onClick={toggleTheme}
              className="header-theme-button"
              color="inherit"
              aria-label="Переключить тему"
              sx={{ color: mode === THEME_DARK ? '#ffffff' : '#000000' }}
            >
              {mode === THEME_DARK ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
