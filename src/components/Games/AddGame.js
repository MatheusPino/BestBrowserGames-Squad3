import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Games.css";
import Input from "../Input";
import Button from "../Button";
import AlertError from "../AlertError";

export default function AddGame() {
  const navigate = useNavigate();
  const [alertError, setAlert] = useState([]);
  const [newGame, setNewGame] = useState({
    name: "",
    category: {
      _id: "",
    },
    description: "",
    url: "",
    imageURL: "",
    videoURL: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/categories", {
      method: "GET",
    }).then(async (response) => {
      const categories = await response.json();
      setCategory(categories);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setNewGame({ ...newGame, category: { _id: value } });
  };

  const handleSave = () => {
    fetch(`https://api-best-browser-games.vercel.app/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newGame),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        navigate("/games");
      } else {
        setAlert(resposta);
      }
    });
  };

  return (
    <>
      <div className="divFlexCenter">
        <h2 className="title2">
          INFORMAÇÕES DO <span className="titleGradient">GAME</span>
        </h2>
        <form className="">
          <Input
            label="Título do game:"
            type="text"
            name="name"
            value={newGame.name}
            handleEvent={handleInputChange}
            classCSS="inputNewGame"
          />
          <label htmlFor="name" className="">
            Categoria:
          </label>
          <select
            name="categories"
            onChange={handleSelectChange}
            className="inputBorderGradient inputNewGame"
            required
          >
            <option value="">Escolha uma opção</option>
            {category.map((category) => (
              <option value={category["_id"]} key={category["_id"]}>
                {category.name}
              </option>
            ))}
          </select>
          <Input
            label="Descrição:"
            textarea="true"
            name="description"
            value={newGame.description}
            handleEvent={handleInputChange}
            classCSS="inputNewGame inputDescription"
            placeholder="A descrição do jogo deve conter entre 3 e 255 caracteres."
          />
          <Input
            label="Endereço URL do site do jogo:"
            type="text"
            name="url"
            value={newGame.url}
            handleEvent={handleInputChange}
            classCSS="inputNewGame"
          />
          <Input
            label="Endereço URL da imagem oficial do jogo:"
            type="text"
            name="imageURL"
            value={newGame.imageURL}
            handleEvent={handleInputChange}
            classCSS="inputNewGame"
          />
          <Input
            label="Endereço URL de um video do jogo (opcional):"
            type="text"
            name="videoURL"
            value={newGame.videoURL}
            handleEvent={handleInputChange}
            classCSS="inputNewGame"
          />
        </form>
        <AlertError alertError={alertError} classCSS="errorNewGame"/>
        <Button
          text="Cadastrar"
          classCSS="btnGradient insertNewGame"
          handleEvent={handleSave}
        />
      </div>
    </>
  );
}
