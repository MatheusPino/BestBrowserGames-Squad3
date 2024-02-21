import Categories from "./Categories";
import AddGame from "../components/Games/AddGame";

export default function AccessAdmin(props) {
  const { userInfo } = props;

  return (
    <>
    <div className="divFlexCenter divAccessAdmin">
      <h2 className="title2">CADASTRO DE <span className="titleGradient">BROWSER GAMES</span></h2>
      <p className="description descAccessAdmin">É fácil cadastrar games ou categorias na BestBrowserGames, primeiro escolha o campo de cadastro e depois é só colocar as informações!</p>
    </div>
    <Categories userInfo={userInfo}/>
    <AddGame />
    </>
  );
}