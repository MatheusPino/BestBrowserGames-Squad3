import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserEdit(props) {
  const { userInfo } = props;
  const navigate = useNavigate();

  let birth = undefined;

  if (userInfo.name) {
    birth = userInfo.birthDate.slice(0, 10);
  }

  const [userEdit, setUserEdit] = useState({
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    confirmPassword: "",
    birthDate: birth,
    country: userInfo.country,
    state: userInfo.state,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  console.log(userInfo);
  const handleSave = () => {
    fetch(
      `https://api-best-browser-games.vercel.app/users/${userInfo["_id"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userEdit),
      }
    ).then(async (response) => {
      const resposta = await response.json();
      console.log(resposta);
      navigate("/user");
      window.location.reload();
    });
  };

  return (
    <>
      <div className="">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Altere as informações de cadastro
          </h1>
          <form className="space-y-4 md:space-y-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              required
              type="text"
              name="name"
              value={userEdit.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              E-mail:
            </label>
            <input
              required
              type="email"
              name="email"
              value={userEdit.email}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Senha:
            </label>
            <input
              required
              type="password"
              name="password"
              value={userEdit.password}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium"
            >
              Confirme a senha:
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              value={userEdit.confirmPassword}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label htmlFor="birthDate" className="block text-sm font-medium">
              Data de nascimento:
            </label>
            <input
              required
              type="date"
              name="birthDate"
              value={userEdit.birthDate}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label htmlFor="country" className="block text-sm font-medium">
              País:
            </label>
            <input
              required
              type="text"
              name="country"
              value={userEdit.country}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            <label htmlFor="state" className="block text-sm font-medium">
              Estado:
            </label>
            <input
              required
              type="text"
              name="state"
              value={userEdit.state}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </form>
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Confirmar alteração
          </button>
        </div>
      </div>
    </>
  );
}
