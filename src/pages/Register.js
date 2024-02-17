import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // const { userInfo, handleLogout } = props;

  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    country: "",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSave = () => {
    fetch("https://api-best-browser-games.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
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
      <div className="">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Preencha as informações de cadastro
          </h1>
          <form className="space-y-4 md:space-y-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              required
              type="text"
              name="name"
              value={register.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              E-mail:
            </label>
            <input
              required
              type="email"
              name="email"
              value={register.email}
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
              value={register.password}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium"
            >
              Confirme a senha:
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              value={register.confirmPassword}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label htmlFor="birthDate" className="block text-sm font-medium">
              Data de nascimento:
            </label>
            <input
              required
              type="date"
              name="birthDate"
              value={register.birthDate}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label htmlFor="country" className="block text-sm font-medium">
              País:
            </label>
            <input
              required
              type="text"
              name="country"
              value={register.country}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label htmlFor="state" className="block text-sm font-medium">
              Estado:
            </label>
            <input
              required
              type="text"
              name="state"
              value={register.state}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </form>
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </>
  );
}
