import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import BorderTopGradient from "../../components/BorderTopGradient";

export default function Login() {
  const navigate = useNavigate();

  const [alertError, setAlert] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = () => {
    fetch("https://api-best-browser-games.vercel.app/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        localStorage.setItem("token", resposta.token);
        navigate("/");
        window.location.reload();
      } else {
        setAlert("Usuário e/ou senha inválido(s).");
      }
    });
  };

  return (
    <>
      <BorderTopGradient />
      <div className="divFlexCenter">
        <h2 className="title3 titleLogin">Login</h2>
        <form className="login">
          <Input
            type="email"
            name="email"
            value={login.email}
            handleEvent={handleInputChange}
            label="E-mail"
          />

          <Input
            type="password"
            name="password"
            value={login.password}
            handleEvent={handleInputChange}
            label="Senha:"
          />
        </form>
        <Button
          text="Entrar"
          classCSS="btnGradient login"
          handleEvent={handleLogin}
        />

        <span className="errorDescription">{alertError}</span>

        <p className="description descLogin">
          Ainda não possui uma conta? Clique aqui!
        </p>
        <Link to="/register">
          <Button text="Cadastre-se" classCSS="btnBorderGradient register" />
        </Link>
      </div>
    </>
  );
}
