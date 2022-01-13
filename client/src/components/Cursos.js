import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import LevelsDetails from './LevelsDetails'
import axios from './axios'
import Header from './Header';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga';
import hikariLevel from '../assets/HOME-hikari-logo-encuentraNivelJapones.png';
import hikariLevelGif from '../assets/HOME-modelohikari-1200x1200_orig.gif';
import hikariShodo from '../assets/HOME-mh-shodo.png';
import hikariLearn from '../assets/HOME-aprendeJaponesHoy.png';
import raitokunNormail from '../assets/raitokun-normal.png'

function Cursos() {
    const [resumedInfo, setResumedInfo] = useState();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search)
    })

    useEffect(() => {
        const fetchResumedInfo = async () =>
            await axios.get('/api/info').then(response => {
                setResumedInfo(response.data[0].specificInfo[0].resumedInfo)
            });
        fetchResumedInfo();
    }, [])

    return (
        <>
            <Helmet>
                <title>Hikari Educación</title>
                <meta name="description" content="Cursos de Japonés en linea para cualquier nivel de aprendizaje" />
            </Helmet>
            <div className="courses">
                <Header />
                <div className="courses__backgroundTop">

                </div>

                <div className="hikari__levelLearning">
                    <div className="hikari__levelTitle">
                        <img src={hikariLevel} alt="hikari-level"/>
                        <h1>¡Encuentra tu nivel de aprendizaje!</h1>
                    </div>
                    <div className="hikari__levels">
                        {resumedInfo?.map(level => (
                            <LevelsDetails coverImage key={level.id} {...level} />
                        ))}
                    </div>
                </div>

                <div className="hikari__mainInfo courses__stylingMain">
                    <div className="hikari__tableEnd">
                        <img className="hikarimodel" src={hikariLevelGif} alt="hikariModelGif"/>
                    </div>
                    <div className="hikari__table">
                        <div className="table__paragraph">
                            Impartimos <strong>cursos de japonés</strong> haciendo un <strong>enfoque en la cultura japonesa</strong> y en las características únicas del idioma para <strong>dar una experiencia de valor</strong> extraordinario a los estudiantes.
                            <br></br>
                            <br></br>
                            Nuestro plan consiste en <strong>6 niveles</strong>, que en orden de dificultad son: Intro, Kodama (A1), Nozomi (A2), Sakura (B1/B2), Hikari (C1) y Hayabusa (C2)
                        </div>
                    </div>
                    <div className="hikari__tableEnd">
                        <img src={hikariShodo} alt="hikari-shodo"/>
                    </div>
                </div>

                <div className="hikari__learnJapanese courses__stylingLearn">
                    <img src={hikariLearn} alt="aprendeJapones"/>
                </div>

                <div className="courses__videos">
                    <div className="courses__overlay">
                        <iframe title="LS1" className="courses__videoclip" src="https://www.youtube.com/embed/C8md6yJkUY4?controls=0"></iframe>
                        <iframe title="LS2" className="courses__videoclip" src="https://www.youtube.com/embed/4MCjU-Du3eI?controls=0"></iframe>
                    </div>
                </div>

                <div className="courses__contactData">
                    <form className="contactData__form">
                        <span>¡Escribenos para encontrar tu nivel!</span>
                        <span>* Campos obligatorios</span>
                        <input type="text" placeholder="Nombre(s) *" autoComplete="given-name" required/>
                        <input type="text" placeholder="Apellido(s) *" autoComplete="family-name" required/>
                        <input type="email" placeholder="Correo electrónico *" autoComplete="email" required/>
                        <input type="phone" placeholder="Número de teléfono *" autoComplete="tel-national" required/>
                        <input type="text" placeholder="Código Postal *" autoComplete="postal-code" required/>
                        <select className="contactData__selection">
                            <option value="">Nivel Actual de Japonés *</option>
                            <option value="Principiante">Principiante</option>
                            <option value="N5Basico">Nivel N5 Básico</option>
                            <option value="N5Intermedio">Nivel N5 Intermedio</option>
                            <option value="N5Avanzado">Nivel N5 Avanzado</option>
                            <option value="N4Intro">Nivel N4 Básico</option>
                            <option value="N4Avanzado">Nivel N4 Avanzado</option>
                            <option value="N3Intro">Nivel N3 Introducción</option>
                            <option value="N2Intro">Nivel N2 Introducción</option>
                            <option value="N2Avanzado">Nivel N2 Avanzado</option>
                        </select>
                        <textarea className="contactData__textarea" placeholder="Escribe tu mensaje aquí" />
                        <button className="contactData__button" type="submit">ENVIAR</button>
                    </form>
                    <div className="contactData__mascot">
                        <img src={raitokunNormail} alt="raitokunNormal" />
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Cursos
