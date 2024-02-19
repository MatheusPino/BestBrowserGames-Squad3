import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  // const { userInfo, handleLogout } = props;
  const navigate = useNavigate();

  const [alertError, setAlert] = useState("");
  
  const [nameCategory, setNameCategory] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNameCategory({ ...nameCategory, [name]: value });
  };

  const handleSave = () => {
    fetch(`https://api-best-browser-games.vercel.app/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(nameCategory),
    }).then(async (response) => {
      console.log(response.status);
      const resposta = await response.json();
      console.log(resposta);
      if (response.status === 201) {
        navigate("/categories");
      } else {
        setAlert(response.message);
      }
    });
  };

  return (
    <>
      <div className="">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Adicione uma nova categoria
          </h1>
          <form className="space-y-4 md:space-y-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              required
              type="text"
              name="name"
              value={nameCategory.name}
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
