import UserEdit from "../components/User/UserEdit";
import { useState } from "react";
import Button from "../components/Button";
import BorderTopGradient from "../components/BorderTopGradient";
import RecommendedGames from "../components/Games/RecommendedGames";

export default function User(props) {
  const { userInfo } = props;

  let birth = undefined;
  if (userInfo.birthDate) {
    birth = userInfo.birthDate.slice(0, 10);
  }

  const [editUser, setEditUser] = useState(false);

  function handleEditUser() {
    setEditUser(!editUser);
  }

  return (
    <>
      <BorderTopGradient />
      {editUser ? (
        <UserEdit userInfo={userInfo} handleEvent={handleEditUser} />
      ) : (
        <>
          <div className="divFlexCenter">
            <h2 className="title2 titleUserInfo">Informações da conta</h2>
            <div className="divUserInfo">
              <p className="description pUserInfo">Nome: {userInfo.name}</p>
              <p className="description pUserInfo">E-mail: {userInfo.email}</p>
              <p className="description pUserInfo">
                Data de nascimento: {birth}
              </p>
              <p className="description pUserInfo">País: {userInfo.country}</p>
              <p className="description">Estado: {userInfo.state}</p>
            </div>
            <Button
              text="Alterar cadastro"
              classCSS="btnGradient btnCallEditPage"
              handleEvent={handleEditUser}
            />
            <RecommendedGames userId={userInfo._id}/>
          </div>
        </>
      )}
    </>
  );
}
