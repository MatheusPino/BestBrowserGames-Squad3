import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Login/Login.css";

export default function Login() {
  // const { userInfo, handleLogout } = props;

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

  const handleSave = () => {
    fetch("https://api-best-browser-games.vercel.app/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(login),
    })
      .then(async (response) => {
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
      })
  };

  return (
    <>
      <div className="borderTop"></div>
      <div className="login">
        <h2 className="">Login</h2>
        <form className="">
          <label htmlFor="email">E-mail:</label>
          <input
            required
            type="email"
            name="email"
            value={login.email}
            onChange={handleInputChange}
            className=""
          />

          <label htmlFor="password">Senha:</label>
          <input
            required
            type="password"
            name="password"
            value={login.password}
            onChange={handleInputChange}
            className=""
          />
        </form>
        <button type="button" onClick={handleSave} className="login">
          Entrar
        </button>

        <span>{alertError}</span>

        <p className="">Ainda não possui uma conta? Clique aqui!</p>
        <Link to="/register">
          <button type="button" className="register">
            Cadastre-se
          </button>
        </Link>
      </div>
    </>
  );
}
