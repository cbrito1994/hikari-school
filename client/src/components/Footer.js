import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { IconButton } from '@material-ui/core';

function Footer() {
    return (
        <div className="footer__container">
            <div className="footer__allInfo">
                <div className="footer__title">¡Te esperamos!</div>
                <div className="footer__info">
                    <div className="footer__hours footer__margin">
                        Horario de atención
                        <br></br>
                        <br></br>
                        Lunes a Viernes: 11:00 - 17:00hrs
                        <br></br>
                        Sábado: 8:00 - 14:00 hrs
                    </div>
                    <div className="footer__number footer__margin">
                        Teléfono + WhatsApp
                        <br></br>
                        <br></br>
                        +52 55 4350 0636
                    </div>
                    <div className="footer__address footer__margin">
                        Dirección
                        <br></br>
                        <br></br>
                        Calle Chimalcoyotl 37, Toriello
                        <br></br>
                        Guerra, 14050 Ciudad de México,
                        <br></br>
                        CDMX
                    </div>
                    <div className="footer__mail">
                        Correo electrónico
                        <br></br>
                        <br></br>
                        admisiones@hikari.mx
                    </div>
                </div>
                <div className="footer__social">
                    <IconButton aria-label="facebookIcon" onClick={() => window.open("https://www.facebook.com/hikari.mx")} rel="noopener noreferrer">
                        <FacebookIcon style={{ color: "#081c33", cursor: "pointer" }} />
                    </IconButton>
                    <IconButton aria-label="instagramIcon" onClick={() => window.open("https://www.instagram.com/hikarieducacion/")} rel="noopener noreferrer" >
                        <InstagramIcon style={{ color: "#081c33", cursor: "pointer" }} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Footer
