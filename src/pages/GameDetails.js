import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditCategory() {
  // const { userInfo, handleLogout } = props;

  const { gameId } = useParams();

  const [gameDetails, setGameDetails] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://api-best-browser-games.vercel.app/games/${gameId}`, {
      method: "GET",
    }).then(async (response) => {
      const game = await response.json();
      setGameDetails(game);
      setLoaded(true);
    });
  }, [gameId]);

  return (
    <>
      {loaded ? (
        <>
          <h3>Informações do jogo</h3>
          <img src={gameDetails.imageURL} width={60} alt={`Jogo ${gameDetails.name}`}></img>
          <p>Nome: {gameDetails.name}</p>
          <p>Categoria: {gameDetails.category.name}</p>
          <p>Descrição: {gameDetails.description}</p>
          <p>Site: <a href={gameDetails.url} target="_blank" rel="noreferrer">{gameDetails.url}</a></p>

          {gameDetails.videoURL !== "" && (
          <video width="320" height="240" controls>
            <source src={gameDetails.videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>)}
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
