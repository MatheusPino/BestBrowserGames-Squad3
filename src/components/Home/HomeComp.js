import "./HomeComp.css";
import { Link } from "react-router-dom";
import Card1 from "./Card com LogoTipo.png";
import Card2 from "./Card com Logo.png";
import star from "./estrelas.png";
import Button from "../Button";
import DivGradient from "../DivGradient";
import Union from "./Union.svg";

export default function HomeComp({ userInfo }) {
  return (
    <>
      <div className="geral">
        <div className="home1">
          <div className="chamada1">
            <div>
              <h2 className="title1">ENCONTRE OS MELHORES</h2>
              <h2 className="title1">
                <span className="titleGradientHome">BROWSER GAMES</span>
              </h2>
            </div>
            <p className="description">
              Junte-se à comunidade do BestBrowserGames e mergulhe no universo
              dos jogos de navegador como nunca antes! Aqui, você não apenas
              joga, mas também compartilha suas experiências!
            </p>
          </div>
          <img
            src={Card1}
            className=""
            alt="Imagem cartunesca de homem jogando com logotipo"
          />
        </div>
        <DivGradient />
        <div>
          <img src={Union} className="borda" alt="Borda gradiente"/>
          <div className="home2">
            <img
              src={Card2}
              className=""
              alt="Imagem cartunesca de mulher jogando com logo"
            />
            <div className="chamada2">
              {!userInfo.name ? (
                <p className="description">
                  Cadastre-se e compartilhe suas impressões, descubra novos
                  favoritos e conecte-se com uma comunidade de jogadores
                  apaixonados. <br></br>
                  <br></br>
                  No BestBrowserGames, a diversão nunca acaba e as recomendações
                  nunca falham. Venha explorar conosco e leve sua experiência de
                  game para o próximo nível!
                </p>
              ) : (
                <p className="description">
                  Compartilhe suas impressões, descubra novos favoritos e
                  conecte-se com uma comunidade de jogadores apaixonados.{" "}
                  <br></br>
                  <br></br>
                  No BestBrowserGames, a diversão nunca acaba e as recomendações
                  nunca falham. Venha explorar conosco e leve sua experiência de
                  game para o próximo nível!
                </p>
              )}
              <div className="estrela">
                <img src={star} className="" alt="Cinco estrelas" />
                {!userInfo.name && (
                  <Link to="/register" onClick={() => window.scroll(0, 0)}>
                    <Button text="Cadastrar" classCSS="btnGradient" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
