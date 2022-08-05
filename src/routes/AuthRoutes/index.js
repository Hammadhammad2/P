import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "../../pages/auth/SignUp";

import { AuthenRoutes } from "../ProtectedRoutes";

const AuthRoutes = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route
          path="/Signup"
          element={
            <AuthenRoutes page="signup" loggedIn={user}>
              <SignUp />
            </AuthenRoutes>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRoutes;
