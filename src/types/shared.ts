import { SvgIconProps } from "@mui/material";

export interface RouteType {
  name: string;
  path: string;
  component: () => JSX.Element
}

export interface NavbarConfigType {
  id: number;
  name: string;
  icon: React.ElementType<SvgIconProps>;
  path: string;
}