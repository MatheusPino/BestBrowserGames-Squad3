import "./Footer.css";
import React from 'react'
import In from "./In.svg";
import Facebook from "./Facebook.svg";
import Twiter from "./Twiter.svg";
import Twith from "./Twith.svg";
import Telegram from "./Telegram.svg";
function Footer() {
    return (
        <footer className="footer">
          
            <div className="icons">
             <img src={In} className="in" alt="linkedin" /> 
             <img src={Facebook} className="facebook" alt="Facebook" />
             <img src={Twiter} className="twiter" alt="Twiter" />
             <img src={Twith} className="twith" alt="Twith" />
             <img src={Telegram} className="telegram" alt="Telegram" />
             </div>
             <div className="line"> </div>
             <div className="footerText">
             <p className="footerText">Atividade Realizada Para Módulo Framework de Front End React I - Vem Ser Tech Ada</p>
             </div>
           
        </footer>
    )
}
export default Footer