import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setAlert('Successfully logged out!', 'success');
    navigate('/');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Global Stats', path: '/global-stats' },
    { text: 'Profile', path: '/profile' },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: '70%',
          maxWidth: 300,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          GreenSteps
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.path}
              key={item.text}
              onClick={handleMobileMenuToggle}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem
            button
            onClick={() => {
              handleLogout();
              handleMobileMenuToggle();
            }}
            sx={{
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.light',
              },
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.text}
          component={Link}
          to={item.path}
          color="inherit"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {item.text}
        </Button>
      ))}
      <Button
        color="inherit"
        onClick={handleLogout}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: isMobile ? '1.1rem' : '1.25rem',
          }}
        >
          GreenSteps
        </Typography>

        {user ? (
          <>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuToggle}
                >
                  <MenuIcon />
                </IconButton>
                {renderMobileMenu()}
              </>
            ) : (
              renderDesktopMenu()
            )}
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 