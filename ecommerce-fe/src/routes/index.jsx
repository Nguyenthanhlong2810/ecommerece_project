import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./config";

export const AppRoutes = React.memo(() => {
  return (
    <Routes>
      {routes.map(({ path, component: Component }, i) => {
        return <Route key={i} path={path} element={<Component />} />;
      })}

      {/* <Route path={"*"} element={<NotFoundPage />} /> */}
      {/* <Route path={"/404"} element={<NotFoundPage />} /> */}
    </Routes>
  );
});
AppRoutes.displayName = "AppRoutes";
