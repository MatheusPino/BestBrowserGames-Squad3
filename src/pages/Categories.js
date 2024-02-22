import { useEffect, useState } from "react";
import "../components/Categories/Categories.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Categories() {
  const [category, setCategory] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alertError, setAlert] = useState("");

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/categories", {
      method: "GET",
    }).then(async (response) => {
      console.log(response.status);
      const categories = await response.json();
      console.log(categories);
      if (response.status === 200) {
        setCategory(categories);
        setLoaded(true);
      } else {
        setAlert("Não foi possível carregar o conteúdo.");
      }
    });
  }, []);

  return (
    <>
      {loaded ? (
        <div className="divFlexCenter">
          <h2 className="title2 titleGradient">CATEGORIAS</h2>
          <div className="categoryButtons">
            <p className="description">
              Explore a variedade de jogos por categoria! Encontre aventuras
              emocionantes, desafios de estratégia, experiências relaxantes e
              muito mais. De ação a quebra-cabeças, tem game para todos os
              gostos. Encontre seu próximo favorito aqui!
            </p>
            {category.map((category) => (
              <Link to={`/games/${category["_id"]}`} >
              <Button
                text={category.name}
                classCSS="btnBorderGradient category"
                key={category["_id"]}
              />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="loading">Loading...</h3> || { alertError }
      )}
    </>
  );
}
