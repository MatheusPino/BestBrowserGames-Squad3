import AddGame from "../components/Games/AddGame";
import DeleteGame from "../components/Games/DeleteGame";
import CategoriesAdmin from "../components/Categories/CategoriesAdmin";
import RestrictedAccess from "../components/RestrictedAccess";

export default function AccessAdmin(props) {
  const { userInfo } = props;

  return (
    <>
      {!userInfo.name ? (
        <RestrictedAccess />
      ) : (
        <>
          <div className="divFlexCenter divAccessAdmin">
            <h2 className="title2">
              GERENCIAMENTO DE <span className="titleGradient">BROWSER GAMES</span>
            </h2>
            <p className="description descAccessAdmin">
              É fácil gerenciar games ou categorias na BestBrowserGames,
              primeiro escolha o campo e complete as
              informações!
            </p>
          </div>
          <CategoriesAdmin userInfo={userInfo} />
          <AddGame />
          <DeleteGame />
        </>
      )}
    </>
  );
}
