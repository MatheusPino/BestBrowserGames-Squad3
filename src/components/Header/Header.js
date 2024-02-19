import "./Header.css";
import Logo from "./Logo.svg";
import UserLogin from "./User-login.svg";
import { NavLink, Link } from "react-router-dom";
// import { useEffect, useState } from "react";

export default function Header(props) {
  const { userInfo, handleLogout } = props;

  return (
    <>
      <div className="navbar">
        <img src={Logo} className="logo" alt="logo Best Browser Games" />
        <ul className="">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "active-style" : "none"
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/games"
            className={(navData) =>
              navData.isActive ? "active-style" : "none"
            }
          >
            <li>Games</li>
          </NavLink>
          <NavLink
            to="/categories"
            className={(navData) =>
              navData.isActive ? "active-style" : "none"
            }
          >
            <li>Categorias</li>
          </NavLink>
          {userInfo.name ? (
            <NavLink
              to="/user"
              className={(navData) =>
                navData.isActive ? "active-style" : "none"
              }
            >
              <li>Perfil</li>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={(navData) =>
                navData.isActive ? "active-style" : "none"
              }
            >
              <li> Entrar</li>
            </NavLink>
          )}
        </ul>
        <div className="dropdown">
          <img src={UserLogin} className="userLogin" alt="logo" />
          <div className="dropdown-content">
            {userInfo.roles === "admin" && (
              <div>
                <Link to="/">
                  <button className="">Cadastrar</button>
                </Link>
              </div>
            )}
            {userInfo.name && (
              <Link to="/">
                <button className="" onClick={handleLogout}>
                  Sair
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
