import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Categories.css";
import AddCategory from "./AddCategory";
import Button from "../Button";

export default function Categories(props) {
  const { userInfo } = props;

  let isAdmin = userInfo.roles === "admin";

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
            {isAdmin && (
              <p className="description">
                Para editar ou excluir as categorias de jogos basta clicar na categoria, e
                para novas categorias basta preencher o campo e clicar no botão
                de inserir!
              </p>
            )}
            {category.map((category) => (
              <>
                {isAdmin ? (
                  <>
                    <Link
                      to={`/handleCategory/${category["_id"]}/${category["name"]}`}
                    >
                      <Button
                        text={category.name}
                        classCSS="btnBorderGradient category"
                        key={category["_id"]}
                      />
                    </Link>
                  </>
                ) : (
                  <Button
                    text={category.name}
                    classCSS="btnBorderGradient category"
                    key={category["_id"]}
                  />
                )}
              </>
            ))}
            {isAdmin && (
              <div className="divAddCategory">
                <AddCategory />
              </div>
            )}
          </div>
        </div>
      ) : (
        <h3 className="loading">Loading...</h3> || { alertError }
      )}
    </>
  );
}
