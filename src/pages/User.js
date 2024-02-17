// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function User(props) {
  const { userInfo } = props;

  return (
    <>
      <h3>Informações da conta</h3>
      <p>Nome: {userInfo.name}</p>
      <p>Data de nascimento: {userInfo.birthDate}</p>
      <p>E-mail: {userInfo.email}</p>
      <p>País: {userInfo.country}</p>
      <p>Estado: {userInfo.state}</p>
      <Link to="/userEdit">
        <button type="button">Alterar cadastro</button>
      </Link>
    </>
  );
}
