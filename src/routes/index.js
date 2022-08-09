import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import AddCity from "../pages/addCity";

import { AuthenRoutes,ProtectedRoutes } from "./ProtectedRoutes";


const AuthRoutes = () => {
  const [user, setUser] =   useState(localStorage.getItem("profile"));
  useEffect(() => {
    setUser(localStorage.getItem("profile"));
  }, []);
  return (
    <BrowserRouter>
     <Routes>
           
        <Route path="/" element={<Home />} />

        <Route
          path="/Login"
          element={
            <AuthenRoutes page="signin" loggedIn={user}>
              <Login />
            </AuthenRoutes>
          }
        />
        <Route
          path="/Signup"
          element={
            <AuthenRoutes page="signup" loggedIn={user}>
              <SignUp />
            </AuthenRoutes>
          }
        />
           <Route
          path="/addCity"
          element={
            <ProtectedRoutes loggedIn={user}>
              <AddCity />
            </ProtectedRoutes>
          }
        />
       

    </Routes>
    </BrowserRouter>
    
   );
};

export default AuthRoutes;
