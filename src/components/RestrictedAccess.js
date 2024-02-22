import { Link } from "react-router-dom";
import Button from "./Button";

export default function RestrictedAccess() {
  return (
    <>
      <div className="divFlexCenter divRestrictedAccess">
        <h2 className="title2 ">Acesso restrito.</h2>
        <h2 className="title3 ">
          Não é possível acessar o conteúdo da página.
        </h2>
        <Link to="/">
          <Button
            text="Voltar para página inicial"
            classCSS="btnBorderGradient btnRestrictedAccess"
          />
        </Link>
      </div>
    </>
  );
}
