import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

import { NavbarConfigType } from "../types/shared";

export const authConfig: NavbarConfigType[] = [
  {
    id: 1,
    name: "Login",
    icon: LoginOutlinedIcon,
    path: "/user/login"
  },
  {
    id: 2,
    name: "Sign up",
    icon: PersonAddAltOutlinedIcon,
    path: "/user/register"
  },
];

export const userMenuConfig: NavbarConfigType[] = [
  {
    id: 1,
    name: "Profile",
    icon: PersonIcon,
    path: "/user/profile"
  },
  {
    id: 2,
    name: "Settings",
    icon: SettingsIcon,
    path: "/user/settings"
  },
];