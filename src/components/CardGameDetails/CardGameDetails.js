import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CardGameDetails.css";
import Input from "../Input";
import Button from "../Button";
import Star from "./Star.svg";
import StarTransparent from "./StarTransparent.svg";
import AlertError from "../AlertError";

export default function CardGameDetails(props) {
  const { game, userInfo } = props;

  const [alertError, setAlert] = useState("");
  const [ratingId, setRatingId] = useState();
  const [rateGame, setRateGame] = useState({
    score: 1,
    description: "",
    game: `${game["_id"]}`,
    user: `${userInfo["_id"]}`,
  });

  useEffect(() => {
    game.ratings.map((rating) => {
      if (rating.user === userInfo["_id"]) {
        setRateGame({
          ...rateGame,
          score: rating.score,
          description: rating.description,
        });
        setRatingId(rating["_id"]);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRateGame({ ...rateGame, [name]: value });
    console.log(rateGame);
  };

  const handleSendRating = () => {
    fetch("https://api-best-browser-games.vercel.app/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(rateGame),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        window.location.reload();
      } else {
        setAlert(resposta);
      }
    });
  };

  const handleEditRating = () => {
    fetch(`https://api-best-browser-games.vercel.app/ratings/${ratingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(rateGame),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 200) {
        window.location.reload();
      } else {
        setAlert(resposta);
      }
    });
  };

  return (
    <>
      <div className="halfBorderTop"></div>
      <div className="divCardGameDetails">
        <div className="gameInfos">
          <div className="gameDetailsTitle">
            <h3 className="title2">{game.name}</h3>
            <div className="divGameScore">
              <img
                src={Star}
                className="gameScoreImg"
                alt={`Estrela de avaliação`}
              ></img>
              <p className="description gameScore">{game.score}/5</p>
            </div>
          </div>
          <p className="title3 gameCategoryName">{game.category.name}</p>
          <p className="description gameDescription">{game.description}</p>
          <p className="linkGame">
            <a href={game.url} target="_blank" rel="noreferrer">
              Link do game
            </a>
          </p>
          {game.videoURL && (
            <p className="linkGame">
              <a href={game.videoURL} target="_blank" rel="noreferrer">
                Link de um vídeo do game
              </a>
            </p>
          )}
          {userInfo.name ? (
            <>
              <div className="rateGame">
                <label>Avalie o game:</label>
                <div className="starsRating">
                  <select
                    className="inputBorderGradient rateScore"
                    name="score"
                    onChange={handleInputChange}
                    value={rateGame.score}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <p className="description maxRating">/5</p>
                  <img
                    src={StarTransparent}
                    className="ratingStar"
                    alt={`Estrela de avaliação`}
                  ></img>
                </div>
              </div>
              <Input
                classCSS="ratingDescription"
                textarea="true"
                name="description"
                value={rateGame.description}
                handleEvent={handleInputChange}
              />
              <div className="divFlexCenter">
                <AlertError
                  alertError={alertError}
                  classCSS="errorDescription"
                />
                {ratingId ? (
                  <Button
                    text="Alterar avaliação"
                    classCSS="btnGradient btnSendRating"
                    handleEvent={handleEditRating}
                  />
                ) : (
                  <Button
                    text="Enviar"
                    classCSS="btnGradient btnSendRating"
                    handleEvent={handleSendRating}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="divFlexCenter divAskLogin">
                <h4 className="title3">
                  Faça login ou cadastre-se para avaliar o jogo!
                </h4>
                <div className="">
                  <Link to="/login">
                    <Button text="Login" classCSS="btnGradient btnsAskLogin" />
                  </Link>
                  <Link to="/register">
                    <Button
                      text="Cadastro"
                      classCSS="btnBorderGradient btnsAskLogin"
                    />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="gameImg">
          <img
            src={game.imageURL}
            width={600}
            height={600}
            alt={`Jogo ${game.name}`}
          ></img>
        </div>
      </div>
      <div className="divFlexCenter divBtnPrevious">
        <Link to="/games">
          <Button text="Voltar" classCSS="btnBorderGradient" />
        </Link>
      </div>
    </>
  );
}
