import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Games.css";
import Button from "../Button";
import AlertError from "../AlertError";

export default function DeleteGame() {
  const navigate = useNavigate();
  const [alertError, setAlert] = useState([]);
  const [deleteGame, setDeleteGame] = useState({
    _id: "",
  });

  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/games", {
      method: "GET",
    }).then(async (response) => {
      const games = await response.json();
      setGamesList(games);
    });
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setDeleteGame({ ...deleteGame, _id: value });
  };

  const handleSave = () => {
    fetch(`https://api-best-browser-games.vercel.app/games/${deleteGame._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
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
          EXCLUSÃO DE <span className="titleGradient">GAME</span>
        </h2>
        <div className="deleteGame">
          <form className="">
            <select
              name="games"
              onChange={handleSelectChange}
              className="inputBorderGradient inputDeleteGame"
              required
            >
              <option value="">Escolha uma opção</option>
              {gamesList.map((game) => (
                <option value={game["_id"]} key={game["_id"]}>
                  {game.name}
                </option>
              ))}
            </select>
          </form>
          <AlertError alertError={alertError} classCSS="errorNewGame" />
          <Button
            text="Excluir"
            classCSS="btnGradient btnDeleteGame"
            handleEvent={handleSave}
          />
        </div>
      </div>
    </>
  );
}
