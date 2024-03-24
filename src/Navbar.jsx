import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import logo from "./image/logomed.png";
import { useNavigate } from "react-router-dom";

const apps = ["App option 1", "App option 2", "App option 3"]; // Add your app options here

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar({ currentPage }) {
  const navigate = useNavigate();
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
  let pageText = "";
  let pageColor = "";
  if (currentPage === "billing") {
    pageText = "Billing System";
    pageColor = "#39A1DB"; // Change to desired color
  } else if (currentPage === "inventory") {
    pageText = "Stock Management";
    pageColor = "green"; // Change to desired color
  } else if (currentPage === "docin") {
    pageText = "Prescription";
    pageColor = "#39A1DB"; // Change to desired color
  } else if (currentPage === "dashboard") {
    pageText = "Pharmacist";
    pageColor = "#7d17df"; // Change to desired color
  } else {
    pageText = "Patient";
    pageColor = "#39A1DB"; // Change to desired color
  }

  return (
    <AppBar style={{ backgroundColor: "white" }} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} style={{ width: "200px" }} alt="logo" srcset="" />
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                ml: 2,
                color: pageColor, // Change color dynamically
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              {pageText}
            </Typography>
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Box>
            
            <Tooltip title="User settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Pemy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={
                      setting === "Logout"
                        ? () => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            navigate("/login");
                          }
                        : null
                    }
                    textAlign="center"
                  >
                    {setting}
                  </Typography>
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
