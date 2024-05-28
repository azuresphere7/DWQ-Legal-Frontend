import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { appRoutes, authRoutes } from "../config/routes";
import { RouteType } from "../types/shared";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  const location = useLocation();

  if (authRoutes.findIndex((route: RouteType) => route.path === location.pathname) > -1) {
    return (
      <Routes>
        {
          authRoutes.map((route: RouteType) => (
            <Route key={route.name} path={route.path} Component={route.component} />
          ))
        }
      </Routes>
    );
  } else if (appRoutes.findIndex((route: RouteType) => route.path === location.pathname) > -1) {
    return (
      <div className="flex flex-col justify-between w-full min-h-screen">
        <Navbar />

        <Routes>
          {
            appRoutes.map((route: RouteType) => (
              <Route key={route.name} path={route.path} Component={route.component} />
            ))
          }
        </Routes>

        <Footer />
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    );
  }
}
