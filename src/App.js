import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header/Header";
import Categories from "./pages/Categories";
import AccessAdmin from "./pages/AccessAdmin";
import HandleCategory from "./pages/HandleCategory";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import GamesCategory from "./pages/GamesCategory";
import Footer from "./components/Footer/Footer";
import React from 'react';

export default function App() {
  const token = localStorage.getItem("token");
  let decoded;
  if (token) {
decoded = jwtDecode(token);
  }

  const [userInfo, setUserInfo] = useState({
    ...decoded,
  });

  useEffect(() => {
    if (decoded) {
      fetch(`https://api-best-browser-games.vercel.app/users/${userInfo.id}`, {
        method: "GET",
      }).then(async (response) => {
        console.log(response.status);
        const infos = await response.json();
        console.log(infos);
        if (response.status === 200) {
          setUserInfo(infos);
        }
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
        <Header userInfo={userInfo} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />} />
          <Route path="/games" element={<Games userInfo={userInfo} />} />
          <Route
            path="/accessAdmin"
            element={<AccessAdmin userInfo={userInfo} />}
          />
          <Route
            path="/gameDetails/:gameId"
            element={<GameDetails userInfo={userInfo} />}
          />
          <Route
            path="/games/:categoryId"
            element={<GamesCategory userInfo={userInfo} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/editCategory/:categoryId/:categoryName"
            element={<HandleCategory userInfo={userInfo} />}
          />
          <Route path="/login" element={<Login userInfo={userInfo} />} />
          <Route path="/register" element={<Register userInfo={userInfo} />} />
          <Route path="/user" element={<User userInfo={userInfo} />} />
        </Routes>
      </BrowserRouter>
      {userInfo && <Footer />}
    </>
  );
}
