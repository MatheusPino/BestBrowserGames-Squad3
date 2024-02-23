import { useEffect, useState } from "react";
import DivGradient from "../DivGradient";
import { Link } from "react-router-dom";
import CardGame from "../CardGame";

export default function RecommendedGames({ userId }) {
  console.log(`User id: ${userId}`);

  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userId){
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
  }
    // eslint-disable-next-line
  }, [userId]);

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
              recommendedGames.map((gameInfo) => (
                <Link to={`/gameDetails/${gameInfo["_id"]}`} key={gameInfo._id}>
                  <CardGame game={gameInfo} />
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
