import React, { useEffect, useState } from 'react'
import DiscountsInfo from './DiscountsInfo';
import DiscountsLogos from './DiscountsLogos';
import Footer from './Footer';
import Header from "./Header";
import LevelsDetails from './LevelsDetails';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import axios from './axios';
import { useHistory, withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import metaInfo  from '../metaHostName.json';
import ReactGA from 'react-ga';
import hikariLogo from '../assets/HOME-hikari-logo-portada-blanco.png';
import learnJapanese from '../assets/HOME-aprendeJaponesHoy.png';
import hikariGif from '../assets/HOME-modelohikari-1200x1200_orig.gif';
import hikariShodo from '../assets/HOME-mh-shodo.png';
import hikariLevel from '../assets/HOME-hikari-logo-encuentraNivelJapones.png'

function Home() {
    const [uid, setUid] = useState();
    const [levelsInfo, setLevelsInfo] = useState();
    const [resumedInfo, setResumedInfo] = useState();
    const [detailedInfo, setDetailedInfo] = useState();
    const history = useHistory();

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
    
    useEffect(() => {
        const fetchInfo = async () =>
            await axios.get('/api/info').then(response => {
                setLevelsInfo(response.data[0].generalInfo)
            });
        fetchInfo();
    }, [])

    useEffect(() => {
        const fetchDetailedInfo = async () =>
            await axios.get('/api/info').then(response => {
                setDetailedInfo(response.data[0].specificInfo[1].levelsInfo.intro)
            })
        fetchDetailedInfo();
    }, [])

    const getId = (imageId) => {
        let newId = [uid];
        newId = `${imageId}`;
        setUid(newId);
        const fetchDetailedInfo = async () =>
            await axios.get('/api/info').then(response => {
                setDetailedInfo(response.data[0].specificInfo[1].levelsInfo[`${newId}`])
            })
        fetchDetailedInfo();
    }

    return (
        <>
            <Helmet>
                <title data-rh="true">Hikari Educación</title>
                <meta property="og:title" content="Hikari Educación" />
                <meta name="description" content="Cursos de Japonés en linea, Cursos de Japonés nivel básico, intermedio y avanzado" />
                <meta property="og:description" content="Cursos de Japonés en linea, Cursos de Japonés nivel básico, intermedio y avanzado" />
                <meta property="og:image" content="https://www.hikari.mx/uploads/1/1/3/6/113652233/editor/hikari-logos-vector-logo-portada-blanco.png" />
                <meta property="og:url" content={metaInfo.hostname + window.location.pathname + window.location.search} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="hikari-logo" />
                <meta property="og:site_name" content="Hikari Educación" />
            </Helmet>
            <div className="hikari__banner">
                <Header />
                <div className="hikari__mainImage">
                    <img src={hikariLogo} alt="hikariMainImage"/>
                    <div className="start__button">
                        <span onClick={() => history.push("/courses")}></span>
                    </div>
                    <div className="socialMedia">
                        <IconButton aria-label="facebookIcon" onClick={() => window.open("https://www.facebook.com/hikari.mx")} rel="noopener noreferrer">
                            <FacebookIcon style={{ color: "#081c33", cursor: "pointer" }} />
                        </IconButton>
                        <IconButton aria-label="instagramIcon" onClick={() => window.open("https://www.instagram.com/hikarieducacion/")} rel="noopener noreferrer">
                            <InstagramIcon style={{ color: "#081c33", cursor: "pointer" }} />
                        </IconButton>
                        <IconButton aria-label="mailIcon">
                            <MailOutlineIcon style={{ color: "#081c33", cursor: "pointer" }} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="hikari__middle">
                <div className="hikari__2image"></div>
                <div className="hikari__middleInfo">
                    <div className="hikari__learnJapanese">
                        <img src={learnJapanese} alt="aprendeJapones"/>
                    </div>
                    <div className="hikari__mainInfo">
                        <div className="hikari__tableEnd">
                            <img className="hikarimodel" src={hikariGif} alt="modeloHikariGif"/>
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
                            <img src={hikariShodo} alt="hikariShodo"/>
                        </div>
                    </div>
                </div>
                <div className="hikari__mainGif"></div>
                <div className="hikari__levelLearning">
                    <div className="hikari__levelTitle">
                        <img src={hikariLevel} alt="findYourLevel"/>
                        <h1>¡Encuentra tu nivel de aprendizaje!</h1>
                    </div>
                    <div className="hikari__levels">
                        {resumedInfo?.map(level => (
                            <LevelsDetails key={level.id} {...level} />
                        ))}
                    </div>
                </div>
                <div className="additional__info">
                    <div className="main__container">
                        <span>¡ Conoce nuestros cursos !</span>
                        <div className="discount__logos">
                            {levelsInfo?.map(level => (
                                <DiscountsLogos key={level.id} {...level} getId={getId} />
                            ))}
                        </div>
                        {detailedInfo?.map(moreInfo => (
                            <DiscountsInfo key={moreInfo.id} {...moreInfo} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(Home)
