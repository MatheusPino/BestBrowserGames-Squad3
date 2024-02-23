import { useState } from "react";
import "./Categories.css";
import DivGradient from "../DivGradient";
import Button from "../Button";
import Input from "../Input";

export default function AddCategory() {
  const [alertError, setAlert] = useState([]);
  const [nameCategory, setNameCategory] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNameCategory({ ...nameCategory, [name]: value });
  };

  const handleSave = () => {
    fetch(`https://api-best-browser-games.vercel.app/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(nameCategory),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        window.location.reload()
      } else {
        setAlert(resposta);
      }
    });
  };

  return (
    <>
      <div className="addCategory">
        <form className="">
          <Input
            label="Digite aqui uma nova categoria:"
            type="text"
            name="name"
            value={nameCategory.name}
            handleEvent={handleInputChange}
            classCSS="inputNewCategory"
          />

          <Button
            text="Inserir"
            handleEvent={handleSave}
            classCSS="btnGradient insert"
          />
        </form>
        <span className="errorDescription">
          {alertError.length > 0 &&
            alertError.map((item) => <p key={item.message}>{item.message}</p>)}
        </span>
        <DivGradient classCSS="divGradientAddCategory" />
      </div>
    </>
  );
}
