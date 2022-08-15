import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import AddCity from "../pages/addCity";
import ShowCity from "../pages/ShowCity";
import SeeWeather from "../pages/seeweather";

import { AuthenRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import Header from "../components/Header/Header.js";
const AuthRoutes = () => {
  const [user, setUser] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, []);
  return (
    <BrowserRouter>
      <Header />
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
        <Route
          path="/ShowCity"
          element={
            <ProtectedRoutes loggedIn={user}>
              <ShowCity />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/SeeWeather"
          element={
            <ProtectedRoutes loggedIn={user}>
              <SeeWeather />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRoutes;
