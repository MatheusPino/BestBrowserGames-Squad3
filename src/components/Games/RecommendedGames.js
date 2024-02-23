import { useEffect, useState } from "react";
import DivGradient from "../DivGradient";
import { Link } from "react-router-dom";
import CardGame from "../CardGame/CardGame";

export default function RecommendedGames({ userId }) {
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://api-best-browser-games.vercel.app/users/${userId}/recommendations`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then(async (response) => {
      console.log(response.status);
      const recommends = await response.json();
      console.log(recommends);
      setRecommendedGames(recommends);
      setLoaded(true);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <h2 className="title2 titleRatedGames">
            GAMES <span className="titleGradient">RECOMENDADOS</span>
          </h2>
          <DivGradient />
          <div className="divGamesCard">
          {recommendedGames.length > 0 ? (
            recommendedGames.map((game) => (
              <Link to={`/gameDetails/${game["_id"]}`} key={game._id}>
                <CardGame game={game} />
              </Link>
            ))
          ) : (
            <p className="loading">Nenhum jogo encontrado</p>
          )}
          </div>
        </>
      ) : (
        <h3 className="loading">Loading...</h3>
      )}
    </>
  );
}
