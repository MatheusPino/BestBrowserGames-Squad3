import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Register/Register.css";
import Button from "../components/Button";
import Input from "../components/Input";
import BorderTopGradient from "../components/BorderTopGradient";
import AlertError from "../components/AlertError";

export default function Register() {
  const navigate = useNavigate();

  const [alertError, setAlert] = useState([]);
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
        setAlert(resposta);
      }
    });
  };

  return (
    <>
      <BorderTopGradient />
      <div className="divFlexCenter">
        <h2 className="title3">Cadastro</h2>
        <form className="">
          <Input
            label="Nome:"
            type="text"
            name="name"
            value={register.name}
            handleEvent={handleInputChange}
          />
          <Input
            label="E-mail:"
            type="email"
            name="email"
            value={register.email}
            handleEvent={handleInputChange}
          />
          <Input
            label="Senha:"
            type="password"
            name="password"
            value={register.password}
            handleEvent={handleInputChange}
          />
          <Input
            label="Confirme a senha:"
            type="password"
            name="confirmPassword"
            value={register.confirmPassword}
            handleEvent={handleInputChange}
          />
          <Input
            label="Data de nascimento:"
            type="date"
            name="birthDate"
            value={register.birthDate}
            handleEvent={handleInputChange}
          />
          <Input
            label="País:"
            type="text"
            name="country"
            value={register.country}
            handleEvent={handleInputChange}
          />
          <Input
            label="Estado:"
            type="text"
            name="state"
            value={register.state}
            handleEvent={handleInputChange}
          />
        </form>        
        <AlertError alertError={alertError} classCSS="errorRegister" />
        <Button
          text="Cadastrar"
          type="button"
          handleEvent={handleSave}
          classCSS="btnGradient registerSend"
        />
      </div>
    </>
  );
}
