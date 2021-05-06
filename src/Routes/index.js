import React from "react";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

function Routes() {
  return (
    <>
      <ProtectedRoutes />
      <PublicRoutes />
    </>
  );
}

export default Routes;
