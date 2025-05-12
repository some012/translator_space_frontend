import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import ThemeContext, {THEME_DARK, THEME_LIGHT} from '../contexts/ThemeContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Header.css';
import {authAPI} from "../services/authApi.js";
import AuthModal from "../templates/Auth/AuthModal.jsx";
import UserProfileModal from "../templates/Settings/UserProfileModal.jsx";

const Header = ({pages}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const {setTheme, mode} = useContext(ThemeContext);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const [userImage, setUserImage] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const handleImageUpdate = (newImage) => {
    setUserImage(newImage);
  };
  const fetchUserData = async (token) => {
    try {
      setLoading(true);
      const userData = await authAPI.getUserData(token);
      const user = {
        name: userData.name,
        last_name: userData.last_name,
        email: userData.email,
        role: userData.role?.name || 'USER',
        hasImage: !!userData.img // флаг наличия изображения
      }
      setUser(user);
      if (userData.img) {
        try {
          const imageData = await authAPI.getUserImage(token);
          setUserImage(imageData.url);
        } catch (imgError) {
          console.error('Error loading user image:', imgError);
          setUserImage(null);
        }
      } else {
        setUserImage(null);
      }
    } catch (err) {
      console.error('Error:', err);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (token) => {
    localStorage.setItem('access_token', token);
    fetchUserData(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(mode === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" className={`header-appbar ${mode}`}>
        <Toolbar className="header-toolbar">
          {/* Логотип и название */}
          <Box className="header-logo-container" onClick={() => navigate('/')}>
            <img src="src/assets/Logo.png" alt="Logo" className="header-logo"/>
            <Divider orientation="vertical" flexItem/>
            <Typography variant="h6" className="header-title">
              TranslatorSpace
            </Typography>
          </Box>

          {/* Навигация (десктоп) */}
          {!isMobile && (
            <Box className="header-nav">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  onClick={() => navigate(page.path)}
                  className="nav-button"
                >
                  {page.title}
                </Button>
              ))}
            </Box>
          )}
          {/* Правая часть */}
          <Divider orientation="vertical" flexItem/>
          <Box className="header-actions">
            <IconButton
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {mode === THEME_DARK ? <LightModeIcon/> : <DarkModeIcon/>}
            </IconButton>

            {renderAuthButton()}

            {isMobile && (
              <IconButton
                className="menu-button"
                onClick={toggleDrawer(true)}
                aria-label="Open menu"
              >
                <MenuIcon/>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Мобильное меню */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="mobile-drawer"
      >
        <Box className="drawer-content">
          <List>
            {pages.map((page) => (
              <ListItem key={page.id} disablePadding>
                <ListItemButton onClick={() => navigate(page.path)}>
                  <ListItemText primary={page.title}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Модальное окно авторизации */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      {/* Модальное окно профиля */}
      <UserProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        userImage={userImage}
        onImageUpdate={handleImageUpdate}
      />
    </>
  );

  function renderAuthButton() {
    if (loading) return <CircularProgress className="auth-loader"/>;

    return user ? (
      <Box className="user-profile">
        <IconButton
          onClick={() => setProfileModalOpen(true)}
          className="avatar-button"
        >
          {userImage ? (
            <Avatar
              src={userImage}
              className="user-avatar"
              sx={{width: 40, height: 40}}
            />
          ) : (
            <Avatar className="user-avatar">
              {user.name.charAt(0)}
            </Avatar>
          )}
        </IconButton>
        <LogoutIcon onClick={handleLogout} className="logout-button">
        </LogoutIcon>
      </Box>
    ) : (
      <LoginIcon onClick={() => setAuthModalOpen(true)} className="login-button">
      </LoginIcon>
    );
  }
};

export default Header;