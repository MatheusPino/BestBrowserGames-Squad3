import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GamesCategory() {
  const { categoryId } = useParams();
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
        games.length > 0 ? (
          games.map((game) => <p key={game["_id"]}>{game.name}</p>)
        ) : (
          <p className="loading">Nenhum jogo encontrado</p>
        )
      ) : (
        <h3 className="loading">Loading...</h3>
      )}
    </>
  );
}
