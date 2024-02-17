import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // const { userInfo, handleLogout } = props;

  const navigate = useNavigate();

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
    }).then(async (response) => {
      const resposta = await response.json();
      console.log(resposta);
      localStorage.setItem("token", resposta.token);
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <>
      <div className="w-full rounded-lg shadow flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Faça login em sua conta
          </h1>
          <form className="space-y-4 md:space-y-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              E-mail:
            </label>
            <input
              required
              type="email"
              name="email"
              value={login.email}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Senha:
            </label>
            <input
              required
              type="password"
              name="password"
              value={login.password}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </form>
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Entrar
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Ainda não possui uma conta?
            <Link to="/register">
              <button>Cadastre-se</button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
