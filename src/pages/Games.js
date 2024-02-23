import { useEffect, useState } from "react";
import SearchGames from "../components/Games/SearchGames";

export default function Games() {
  const [games, setGames] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alertError, setAlert] = useState("");

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/games", {
      method: "GET",
    }).then(async (response) => {
      console.log(response.status);
      const gamesAPI = await response.json();
      console.log(gamesAPI);
      if (response.status === 200) {
        setGames(gamesAPI);
        setLoaded(true);
      } else {
        setAlert("Não foi possível carregar o conteúdo.");
      }
    });
  }, []);

  return (
    <>
      {loaded ? (
        <SearchGames games={games} setGames={setGames} />
      ) : (
        <h2 className="loading">Loading...</h2> || { alertError }
      )}
    </>
  );
}
