import { useEffect, useState } from "react";
import DivGradient from "../DivGradient";
import Star from "../CardGameDetails/Star.svg";
import "./GameRatings.css"

export default function GameRatings({ game, userInfo }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    game.ratings.map((rating) => {
      if (rating.user !== userInfo["_id"]) {
        setRatings([...ratings, rating]);
      }
    });
  }, []);

  return (
    <>
    {ratings.length > 0 && (
      <div className="ratingsList">
        <h3 className="title3 ">Confira aqui a avaliação de outros players!</h3>
        <DivGradient classCSS="divGradientGameRatings"/>
        <table className="ratingsBody">
          <tbody>
            {game.ratings
              .filter((element) => element.user !== userInfo["_id"])
              .map((filtered) => (
                <tr key={filtered["_id"]} className="ratingRow">
                  <td>
                    <div className="divGameScore divRatingGameScore">
                    <h4 className="title3">Avaliação</h4>
                    <div className="divGameScore">
                      <img
                        src={Star}
                        className="gameScoreImg"
                        alt={`Estrela de avaliação`}
                      ></img>
                      <p className="description gameScore">
                        {filtered.score}/5
                      </p>
                    </div>
                    </div>
                    <p className="description ratingQuote">"{filtered.description}"</p>
                    <div className="borderRating">
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>)}
    </>
  );
}
