import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGame from "../CardGame";
import Input from "../Input";
import Button from "../Button";

export default function SearchGames({ games, setGames }) {
  const [searchGame, setSearchGame] = useState({
    name: "",
    categoryId: "",
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
    setSearchGame({ ...searchGame, [name]: value });
  };

  const handleSearch = () => {
    fetch(
      `https://api-best-browser-games.vercel.app/games?name=${searchGame.name}&categoryId=${searchGame.categoryId}`,
      {
        method: "GET",
      }
    ).then(async (response) => {
      console.log(response.status);
      const gamesFiltered = await response.json();
      console.log(gamesFiltered);
      if (response.status === 200) {
        setGames(gamesFiltered);
      }
    });
  };

  return (
    <>
      <div className="divFlexCenter">
        <h3 className="title2 titleSearchGames">
          ENCONTRE AQUI SEUS{" "}
          <span className="titleGradientSearch">GAMES FAVORITOS</span>
        </h3>
        <div className="divSearchGame">
          <Input
            placeholder="Nome do jogo"
            type="text"
            name="name"
            value={searchGame.name}
            handleEvent={handleInputChange}
            classCSS="inputSearchName"
          />
          <select
            name="categoryId"
            onChange={handleInputChange}
            className="inputBorderGradient inputSearchCategory"
            required
          >
            <option value="">Categoria</option>
            {category.map((category) => (
              <option value={category["_id"]} key={category["_id"]}>
                {category.name}
              </option>
            ))}
          </select>
          <Button
            text="Pesquisar"
            classCSS="btnGradient"
            handleEvent={handleSearch}
          />
        </div>
      </div>
      <div className="divGamesCard">
        {games.length > 0 ? (
          games.map((game) => (
            <Link to={`/gameDetails/${game["_id"]}`} key={game._id}>
              <CardGame game={game} />
            </Link>
          ))
        ) : (
          <p className="loading">Nenhum jogo encontrado</p>
        )}
      </div>
    </>
  );
}
