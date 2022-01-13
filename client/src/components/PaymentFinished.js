import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ConfettiGenerator from "confetti-js";

function PaymentFinished() {

    useEffect(() => {
        const confettiSettings = { target: 'my-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        
        return () => confetti.clear();
    }, [])

    return (
        <>
            <Helmet>
                <title>Gracias por tu compra</title>
                <meta name="description" content="Gracias por tu compra" />
            </Helmet>
            <canvas id="my-canvas"></canvas>
            <div className="pf__background">
                <div className="pf__messageContainer">
                    <h3>¡Bienvenido a la Familia Hikari!</h3>
                    <br />
                    <p>Gracias por tu confianza. En Hikari Educación nos enorgullecemos de lograr que nuestros alumnos, clase con clase, aumenten su habilidad en el idioma japonés.</p>
                    <p>Enseguida recibirás un correo de nuestra parte con los detalles de tu compra.</p>
                    <p>¡No podemos esperar para conocerte!</p>
                    <p>がんばれ!!!</p>
                    <br />
                    <Link to={"/"}>Regresar a la página principal</Link>
                </div>
            </div>
        </>
    )
}

export default PaymentFinished
