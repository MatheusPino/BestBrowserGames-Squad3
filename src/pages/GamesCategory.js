import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardGame from "../components/CardGame/CardGame";
import Button from "../components/Button";

export default function GamesCategory() {
  const { categoryId, categoryName } = useParams();
  const [games, setGames] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/games", {
      method: "GET",
    }).then(async (response) => {
      console.log(response.status);
      const games = await response.json();
      console.log(games);
      let filterGames = [...games].filter(
        (obj) => obj.category["_id"] === categoryId
      );
      console.log(filterGames);
      setGames(filterGames);
      setLoaded(true);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loaded ? (
        <div className="divFlexCenter">
          <h2 className="title2">
            <span className="titleGradient">{categoryName.toUpperCase()}</span>{" "}
            GAMES
          </h2>
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
          <div className="divBtnPrevious">
            <Link to="/categories">
              <Button text="Voltar" classCSS="btnBorderGradient" />
            </Link>
          </div>
        </div>
      ) : (
        <h3 className="loading">Loading...</h3>
      )}
    </>
  );
}
