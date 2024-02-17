import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Categories(props) {
  const { userInfo } = props;

  const [category, setCategory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/categories", {
      method: "GET",
    }).then(async (response) => {
      const categories = await response.json();
      setCategory(categories);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      {loaded ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Categorias</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {category.map((category) => (
                <tr className="bg-white border-b" key={category["_id"]}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td>
                    <Link to={`/`}>
                      <button className="px-6 py-4">Visualizar jogos</button>
                    </Link>
                    {userInfo.roles === "admin" && (
                      <Link
                        to={`/editCategory/${category["_id"]}/${category["name"]}`}
                      >
                        <button className="px-6 py-4">Editar</button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userInfo.roles === "admin" && (
            <Link to={`/addCategory`}>
              <button className="px-6 py-4">Cadastrar categoria</button>
            </Link>
          )}
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
