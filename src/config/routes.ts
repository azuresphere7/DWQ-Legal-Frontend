import { RouteType } from "../types/shared";

import LoginPage from "../pages/user/Login";
import RegisterPage from "../pages/user/Register";
import VerifyEmailPage from "../pages/user/VerifyEmail";
import ForgotPasswordPage from "../pages/user/ForgotPassword";

import HomePage from "../pages/Homepage";
import ProfilePage from "../pages/user/Profile";
import SettingsPage from "../pages/user/Settings";

import CreateOrderPage from "../pages/order/CreateOrderPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsConditionsPage from "../pages/TermsConditionsPage";

export const authRoutes: RouteType[] = [
  {
    name: "login",
    path: "/user/login",
    component: LoginPage
  },
  {
    name: "register",
    path: "/user/register",
    component: RegisterPage
  },
  {
    name: "verify email",
    path: "/user/verify",
    component: VerifyEmailPage
  },
  {
    name: "forgot password",
    path: "/user/forgot-password",
    component: ForgotPasswordPage
  }
];

export const appRoutes: RouteType[] = [
  {
    name: "home",
    path: "/",
    component: HomePage
  },
  {
    name: "profile",
    path: "/user/profile",
    component: ProfilePage
  },
  {
    name: "settings",
    path: "/user/settings",
    component: SettingsPage
  },
  {
    name: "create-order",
    path: "/order/new",
    component: CreateOrderPage
  },
  {
    name: "privacy-policy",
    path: "/privacy-policy",
    component: PrivacyPolicyPage
  },
  {
    name: "terms-and-conditions",
    path: "/terms-and-conditions",
    component: TermsConditionsPage
  },
];
