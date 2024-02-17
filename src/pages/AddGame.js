import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddGame() {
  // const { userInfo, handleLogout } = props;
  const navigate = useNavigate();

  const [newGame, setNewGame] = useState({
    name: "",
    category: {
      _id: "",
    },
    description: "",
    url: "",
    imageURL: "",
    videoURL: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://api-best-browser-games.vercel.app/categories", {
      method: "GET",
    }).then(async (response) => {
      const categories = await response.json();
      setCategory(categories);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setNewGame({ ...newGame, category: { _id: value } });
  };

  const handleSave = () => {
    fetch(`https://api-best-browser-games.vercel.app/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newGame),
    }).then(async (response) => {
      const resposta = await response.json();
      console.log(resposta);
      navigate("/games");
    });
  };

  return (
    <>
      <div className="">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Adicione um novo jogo
          </h1>
          <form className="space-y-4 md:space-y-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              required
              type="text"
              name="name"
              value={newGame.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label htmlFor="name" className="block text-sm font-medium">
              Categoria:
            </label>

            <select name="categories" onChange={handleSelectChange} required>
              <option value="">Escolha uma opção</option>
              {category.map((category) => (
                <option value={category["_id"]} key={category["_id"]}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="name" className="block text-sm font-medium">
              Descrição:
            </label>
            <input
              required
              type="text"
              name="description"
              value={newGame.description}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label htmlFor="name" className="block text-sm font-medium">
              Endereço (URL) do site do jogo:
            </label>
            <input
              required
              type="text"
              name="url"
              value={newGame.url}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label htmlFor="name" className="block text-sm font-medium">
              Endereço (URL) de uma imagem do jogo:
            </label>
            <input
              type="text"
              name="imageURL"
              value={newGame.imageURL}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label htmlFor="name" className="block text-sm font-medium">
              Endereço (URL) de um video do jogo:
            </label>
            <input
              type="text"
              name="videoURL"
              value={newGame.videoURL}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </form>
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </>
  );
}
