import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGameDetails from "../components/CardGameDetails/CardGameDetails";
import Button from "../components/Button";

export default function Games(props) {
  const { userInfo } = props;

  const [game, setGame] = useState([]);
  // const [loaded, setLoaded] = useState(false);
  // const [alertError, setAlert] = useState("");

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/games", {
      method: "GET",
    }).then(async (response) => {
      console.log(response.status);
      const games = await response.json();
      console.log(games);
      if (response.status === 200) {
        setGame(games);
        // setLoaded(true);
      } else {
        // setAlert("Não foi possível carregar o conteúdo.");
      }
    });
  }, []);

  const [gameDetails, setGameDetails] = useState(true);
  const [index, setIndex] = useState(0);

  function handleGameDetails(index) {
    if (index) {
      setIndex(index);
    }
    setGameDetails(!gameDetails);
  }

  return (
    <>
      {gameDetails ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Jogo</th>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Categoria</th>
                <th className="px-6 py-3">Avaliação geral</th>
                <th className="px-6 py-3">Opções</th>
              </tr>
            </thead>
            <tbody>
              {game.map((game) => (
                <tr className="bg-white border-b" key={game["_id"]}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <img
                      src={game.imageURL}
                      width={60}
                      alt={`Jogo ${game.name}`}
                    ></img>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {game.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {game.category ? game.category.name : "Sem categoria"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {game.score || "Sem avaliação"}
                  </td>
                  <td>
                    <Link to={`/gameDetails/${game["_id"]}`}>
                      <Button
                        text="Visualizar detalhes"
                        classCSS="btnGradient"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userInfo.roles === "admin" && (
            <Link to={`/addGame`}>
              <button className="px-6 py-4">Cadastrar jogo</button>
            </Link>
          )}
        </div>
      ) : (
        <CardGameDetails
          game={game[index]}
          userInfo={userInfo}
          handleEvent={handleGameDetails}
        />
      )}
    </>
  );
}
