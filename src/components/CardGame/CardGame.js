import "./CardGame.css";
import Star from "../CardGameDetails/Star.svg";

export default function CardGame({game}) {
  const urlImage = game.imageURL;
  const title = game.name;
  const category = game.category.name;
  const rating = game.score;
  const description = game.description;

  return (
    <>
      <div className="card">
        <div className="cardGameImage">
          <img src={urlImage} alt={`Imagem do jogo ${title}`} />
        </div>
        <div className="cardInfos">
          <div className="cardGameTitle">
            <h2 className="cardTitle title3">{title}</h2>
            <div className="divGameScore">
              <img
                src={Star}
                className="gameScoreImg"
                alt={`Estrela de avaliação`}
              ></img>
              <p className="description gameScore">{rating}/5</p>
            </div>
          </div>
          <p className="categoryGameCard">{category}</p>
          <p className="cardGameDescription">{description}</p>
          <p className="clickForDetails">Clique no card para mais detalhes!</p>
        </div>
      </div>
    </>
  );
}
