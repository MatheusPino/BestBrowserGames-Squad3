import Icon from "./gaming-icon.png";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

export default function Navbar(props) {
  const { userInfo, handleLogout } = props;

  let nameUser;

  if (userInfo.name) {
    nameUser = (
      <>
        <h3 className="">Olá, {userInfo.name}!</h3>
        <Link to="/user">
          <button className="pr-1">Perfil | </button>
        </Link>
        <Link to="/">
          <button className="" onClick={handleLogout}>
            Sair
          </button>
        </Link>
      </>
    );
  } else {
    nameUser = (
      <>
        <Link to="/login">
          <h3 className="text-xl">→ Entrar</h3>
        </Link>
      </>
    );
  }

  return (
    <div className="shadow">
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center">
          <img src={Icon} className="" alt="logo" width={60} />
          <h1 className="px-6 text-2xl">Best Browser Games</h1>
        </div>

        <ul className="flex">
          <Link to="/">
            <li className="px-4 text-lg">Home</li>
          </Link>
          <li className="text-lg">|</li>
          <Link to="/games">
            <li className="px-4 text-lg">Jogos</li>
          </Link>
          <li className="text-lg">|</li>
          <Link to="/categories">
            <li className="px-4 text-lg">Categorias</li>
          </Link>
        </ul>

        <div className="px-6">{nameUser}</div>
      </div>
    </div>
  );
}
