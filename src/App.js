import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import Games from "./pages/Games";
import AddGame from "./pages/AddGame";
import GameDetails from "./pages/GameDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import UserEdit from "./pages/UserEdit";
import Footer from "./components/Footer/Footer";
import React from 'react';

export default function App() {
  const token = localStorage.getItem("token");
  let decoded;
  if (token) {
// decoded = jwtDecode(token);
  }

  const [userInfo, setUserInfo] = useState({
    ...decoded,
  });

  useEffect(() => {
    if (decoded) {
      fetch(`https://api-best-browser-games.vercel.app/users/${userInfo.id}`, {
        method: "GET",
      }).then(async (response) => {
        const infos = await response.json();
        setUserInfo(infos);
      });
    }
    // eslint-disable-next-line
  }, []);

  function handleLogout() {
    setUserInfo({
      name: undefined,
    });
    localStorage.clear();
  }

  return (
    <>
      <BrowserRouter>
        <Navbar userInfo={userInfo} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />} />
          <Route path="/games" element={<Games userInfo={userInfo} />} />
          <Route path="/addGame" element={<AddGame userInfo={userInfo} />} />
          <Route
            path="/gameDetails/:gameId"
            element={<GameDetails userInfo={userInfo} />}
          />
          <Route
            path="/categories"
            element={<Categories userInfo={userInfo} />}
          />
          <Route
            path="/addCategory"
            element={<AddCategory userInfo={userInfo} />}
          />
          <Route
            path="/editCategory/:categoryId/:categoryName"
            element={<EditCategory userInfo={userInfo} />}
          />
          <Route path="/login" element={<Login userInfo={userInfo} />} />
          <Route
            path="/register"
            element={
              <Register userInfo={userInfo} handleLogout={handleLogout} />
            }
          />
          <Route
            path="/user"
            element={<User userInfo={userInfo} handleLogout={handleLogout} />}
          />
          <Route
            path="/userEdit"
            element={
              <UserEdit userInfo={userInfo} handleLogout={handleLogout} />
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
