import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Register/Register.css";

export default function Register() {
  // const { userInfo, handleLogout } = props;

  const navigate = useNavigate();

  const [alertError, setAlert] = useState("");

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
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        localStorage.setItem("token", resposta.token);
        navigate("/");
        window.location.reload();
      } else {
        setAlert("Não foi possível realizar o cadastro. Tente novamente.");
      }
    });
  };

  return (
    <>
      <div className="borderTop"></div>
      <div className="register">
        <h2 className="">Cadastro</h2>
        <form className="">
          <label htmlFor="name" className="">
            Nome:
          </label>
          <input
            required
            type="text"
            name="name"
            value={register.name}
            onChange={handleInputChange}
            className=""
          />
          <label htmlFor="email" className="">
            E-mail:
          </label>
          <input
            required
            type="email"
            name="email"
            value={register.email}
            onChange={handleInputChange}
            className=""
          />

          <label htmlFor="password" className="">
            Senha:
          </label>
          <input
            required
            type="password"
            name="password"
            value={register.password}
            onChange={handleInputChange}
            className=""
          />
          <label htmlFor="confirmPassword" className="">
            Confirme a senha:
          </label>
          <input
            required
            type="password"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleInputChange}
            className=""
          />

          <label htmlFor="birthDate" className="">
            Data de nascimento:
          </label>
          <input
            required
            type="date"
            name="birthDate"
            value={register.birthDate}
            onChange={handleInputChange}
            className=""
          />

          <label htmlFor="country" className="">
            País:
          </label>
          <input
            required
            type="text"
            name="country"
            value={register.country}
            onChange={handleInputChange}
            className=""
          />

          <label htmlFor="state" className="">
            Estado:
          </label>
          <input
            required
            type="text"
            name="state"
            value={register.state}
            onChange={handleInputChange}
            className=""
          />
        </form>
        <span>{alertError}</span>
        <button type="button" onClick={handleSave} className="registerSend">
          Cadastrar
        </button>
      </div>
    </>
  );
}
