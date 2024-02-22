import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import "./User.css"

export default function UserEdit(props) {
  const { userInfo, handleEvent } = props;

  let birth = undefined;
  if (userInfo.name) {
    birth = userInfo.birthDate.slice(0, 10);
  }

  const [alertError, setAlert] = useState([]);
  const [userEdit, setUserEdit] = useState({
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    confirmPassword: "",
    birthDate: birth,
    country: userInfo.country,
    state: userInfo.state,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  console.log(userInfo);
  const handleSave = () => {
    fetch(
      `https://api-best-browser-games.vercel.app/users/${userInfo["_id"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userEdit),
      }
    ).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        window.location.reload();
      } else {
        setAlert(resposta);
      }
    });
  };

  return (
    <>
      <div className="divFlexCenter divEditUser">
        <h2 className="">Altere as informações de cadastro</h2>
        <form className="">
          <Input
            label="Nome:"
            type="text"
            name="name"
            value={userEdit.name}
            handleEvent={handleInputChange}
          />
          <Input
            label="E-mail:"
            type="email"
            name="email"
            value={userEdit.email}
            handleEvent={handleInputChange}
          />
          <Input
            label="Senha:"
            type="password"
            name="password"
            value={userEdit.password}
            handleEvent={handleInputChange}
          />
          <Input
            label="Confirme a senha:"
            type="password"
            name="confirmPassword"
            value={userEdit.confirmPassword}
            handleEvent={handleInputChange}
          />
          <Input
            label="Data de nascimento:"
            type="date"
            name="birthDate"
            value={userEdit.birthDate}
            handleEvent={handleInputChange}
          />
          <Input
            label="País:"
            type="text"
            name="country"
            value={userEdit.country}
            handleEvent={handleInputChange}
          />
          <Input
            label="Estado:"
            type="text"
            name="state"
            value={userEdit.state}
            handleEvent={handleInputChange}
          />
        </form>
        <span className="errorDescription errorUserEdit">
          {alertError.length > 0 &&
            alertError.map((item) => <p key={item.message}>{item.message}</p>)}
        </span>
        <div className="divBtnsEditUser">
          <Button
            text="Alterar"
            classCSS="btnGradient btnEditUser"
            handleEvent={handleSave}
          />
          <Button
            text="Voltar"
            classCSS="btnBorderGradient"
            handleEvent={handleEvent}
          />
        </div>
      </div>
    </>
  );
}
