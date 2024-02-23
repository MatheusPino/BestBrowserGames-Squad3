import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGame from "../components/CardGame/CardGame";

export default function Games() {
  // const { userInfo } = props;

  const [game, setGame] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alertError, setAlert] = useState("");

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/games", {
      method: "GET",
    }).then(async (response) => {
      console.log(response.status);
      const games = await response.json();
      console.log(games);
      if (response.status === 200) {
        setGame(games);
        setLoaded(true);
      } else {
        setAlert("Não foi possível carregar o conteúdo.");
      }
    });
  }, []);

  return (
    <>
      {loaded ? (
        <div className="divGamesCard">
          {game.map((game) => (
            <Link to={`/gameDetails/${game["_id"]}`} key={game._id}>
              <CardGame
                game={game}              
              />
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="loading">Loading...</h2> || { alertError }
      )}
    </>
  );
}
