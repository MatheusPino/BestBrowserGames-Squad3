import "./Header.css";
import Logo from "./Logo.svg";
import UserLogin from "./User-login.svg";
import Button from "../Button.js";
import { NavLink, Link } from "react-router-dom";

export default function Header(props) {
  const { userInfo, handleLogout } = props;

  const activeClass = (navData) => (navData.isActive ? "active-style" : "none");

  return (
    <>
      <div className="navbar">
        <img src={Logo} className="logo" alt="Logo Best Browser Games" />
        <ul>
          <NavLink to="/" className={activeClass}>
            <li>Home</li>
          </NavLink>
          <NavLink to="/games" className={activeClass}>
            <li>Games</li>
          </NavLink>
          <NavLink to="/categories" className={activeClass}>
            <li>Categorias</li>
          </NavLink>
          {userInfo.name ? (
            <NavLink to="/user" className={activeClass}>
              <li>Perfil</li>
            </NavLink>
          ) : (
            <NavLink to="/login" className={activeClass}>
              <li> Entrar</li>
            </NavLink>
          )}
        </ul>
        <div className="dropdown">
          <img src={UserLogin} className="userLogin" alt="Ícone Usuário" />
          <div className="dropdown-content">
            {userInfo.roles === "admin" && (
              <div>
                <Link to="/accessAdmin">
                  <Button text="Cadastrar" />
                </Link>
              </div>
            )}
            {userInfo.name && (
              <Link to="/">
                <Button text="Sair" handleEvent={handleLogout} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
