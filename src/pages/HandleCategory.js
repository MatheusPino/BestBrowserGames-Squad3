import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function HandleCategory() {
  const navigate = useNavigate();

  const { categoryId, categoryName } = useParams();
  const [alertError, setAlert] = useState("");

  const [nameCategory, setNameCategory] = useState({
    name: categoryName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNameCategory({ ...nameCategory, [name]: value });
  };

  const handleEdit = () => {
    fetch(
      `https://api-best-browser-games.vercel.app/categories/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(nameCategory),
      }
    ).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        navigate("/accessAdmin");
      } else {
        setAlert(response.message);
      }
    });
  };

  const handleDelete = () => {
    fetch(
      `https://api-best-browser-games.vercel.app/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        navigate("/accessAdmin");
      } else {
        setAlert(response.message);
      }
    });
  };

  return (
    <>
      <div className="divFlexCenter divHandleCategory">
        <h1 className="title3">Modifique o nome ou exclua a categoria</h1>
        <form className="">
          <Input
            label="Nome:"
            type="text"
            name="name"
            value={nameCategory.name}
            handleEvent={handleInputChange}
          />
        </form>
        <p className="errorDescription">{alertError}</p>
        <div className="divBtnsHandleCategory">
          <Button
            text="Alterar"
            classCSS="btnGradient btnHandleCategory"
            handleEvent={handleEdit}
          />
          <Button
            text="Excluir"
            classCSS="btnBorderGradient"
            handleEvent={handleDelete}
          />
        </div>
        {/* <Link to="/accessAdmin" >
        <Button
          text="Voltar"
          classCSS="btnBorderGradient"
        />
        </Link> */}
      </div>
    </>
  );
}
