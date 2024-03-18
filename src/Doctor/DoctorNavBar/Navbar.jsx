import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import Wlogo from '../Wlogo.jpg';
import '../Supperdoc/navbar.css';

const apps = ['App option 1', 'App option 2', 'App option 3']; // Add your app options here

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({ currentPage }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElApps, setAnchorElApps] = React.useState(null); // State for apps menu

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenAppsMenu = (event) => {
    setAnchorElApps(event.currentTarget);
  };

  const handleCloseAppsMenu = () => {
    setAnchorElApps(null);
  };

  // Define text and color based on the currentPage
  let pageText = '';
  let pageColor = '';
  if (currentPage === 'billing') {
    pageText = 'Billing System';
    pageColor = 'blue'; // Change to desired color
  } else if (currentPage === 'inventory') {
    pageText = 'Stock Management';
    pageColor = 'green'; // Change to desired color
  } else {
    pageText = 'Patient';
    pageColor = 'blue'; // Change to desired color
  } if (currentPage==='docin') {
    pageText ='Doctor';
    pageColor = 'blue';
  }

  return (
    <AppBar 
      style={{ backgroundColor: 'white', opacity: 0.6 }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Wlogo} style={{ width: '200px' }} alt="logo" srcset="" />
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                ml: 2,
                color: pageColor, // Change color dynamically
              }}
            >
              {pageText}
            </Typography>
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Box>
            <Tooltip title="Apps">
              <IconButton onClick={handleOpenAppsMenu} sx={{ p: 0 }}>
                <AppsRoundedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-apps"
              anchorEl={anchorElApps}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElApps)}
              onClose={handleCloseAppsMenu}
            >
              {apps.map((app) => (
                <MenuItem key={app} onClick={handleCloseAppsMenu}>
                  <Typography textAlign="center">{app}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Tooltip title="User settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Pemy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
