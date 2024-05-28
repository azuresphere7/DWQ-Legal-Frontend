import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Avatar, Badge, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

import { logoutUser } from "../redux/actions/user.action";
import { authConfig, userMenuConfig } from "../config/navbar";
import { NavbarConfigType } from "../types/shared";

const menuPaperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(({ userReducer }) => userReducer);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const openAccountMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const closeAccountMenu = () => setAnchorEl(null);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <main className="flex flex-col w-full">
      <div className="flex justify-center w-full bg-gray-800">
        <div className="container flex justify-between items-center w-full h-20 px-8 text-white">
          <h1
            className="font-bold text-xl tracking-widest cursor-pointer"
            onClick={() => navigate("/")}
          >DWQ</h1>

          {
            user ? (
              <div className="flex justify-between items-center">
                <IconButton className="mx-2">
                  <Badge badgeContent={0} color="info">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={openAccountMenu}
                  size="small"
                  aria-controls={menuOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>{user.firstName ? user.firstName[0] : "D"}</Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={menuOpen}
                  onClose={closeAccountMenu}
                  onClick={closeAccountMenu}
                  PaperProps={menuPaperProps}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {
                    user.firstName ? (
                      <h2 className="p-4 font-bold">{user.firstName} {user.lastName}</h2>
                    ) : (
                      <h2 className="p-4 font-bold">Defendant</h2>
                    )
                  }

                  <Divider className="min-w-[240px]" />

                  {
                    userMenuConfig.map((item: NavbarConfigType) => (
                      <MenuItem key={item.id} onClick={() => navigate(item.path)}>
                        <ListItemIcon>
                          <item.icon fontSize="small" />
                        </ListItemIcon>
                        {item.name}
                      </MenuItem>
                    ))
                  }

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>

                  <Divider />

                  {
                    authConfig.map((item: NavbarConfigType) => (
                      <MenuItem key={item.id} onClick={() => navigate(item.path)}>
                        <ListItemIcon>
                          <item.icon fontSize="small" />
                        </ListItemIcon>
                        {item.name}
                      </MenuItem>
                    ))
                  }
                </Menu>
              </div>
            ) : (
              <div className="flex justify-between">
                {
                  authConfig.map((item: NavbarConfigType) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="flex items-center mx-4 transition-all text-gray-300 hover:text-white"
                    >
                      <item.icon />
                      <p className="ml-2">{item.name}</p>
                    </Link>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>

      {
        user && !user.email_verified && (
          <div className="flex justify-center items-center w-full p-2 fade-up-anim anim-500">
            <Alert severity="warning">Please verify your email address.</Alert>
            <Button
              variant="contained"
              className="h-11 mx-2 bg-primary"
              onClick={() => navigate("/user/verify")}
            >
              Verify
            </Button>
          </div>
        )
      }
    </main>
  );
}
