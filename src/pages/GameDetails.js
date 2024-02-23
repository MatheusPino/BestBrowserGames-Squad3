import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardGameDetails from "../components/CardGameDetails";
import GameRatings from "../components/GameRatings";

export default function GameDetails(props) {
  const { userInfo } = props;

  const { gameId } = useParams();

  const [gameDetails, setGameDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [alertError, setAlert] = useState("");

  useEffect(() => {
    fetch(`https://api-best-browser-games.vercel.app/games/${gameId}`, {
      method: "GET",
    }).then(async (response) => {
      console.log(response.status);
      const game = await response.json();
      console.log(game);
      if (response.status === 200) {
        setGameDetails(game);
        setLoaded(true);
      } else {
        setAlert("Não foi possível carregar o conteúdo.");
      }
    });
  }, [gameId]);

  return (
    <>
      {loaded ? (
        <>
          <CardGameDetails userInfo={userInfo} game={gameDetails} />
          <GameRatings userInfo={userInfo} game={gameDetails} />
        </>
      ) : (
        <h3 className="title3 loading">Loading...</h3> || { alertError }
      )}
    </>
  );
}
