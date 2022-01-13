import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from './axios'
import PagesLevels from './PagesLevels';
import LevelChanges from './LevelChanges';
import { useParams, withRouter } from 'react-router-dom';
import LevelChangesLevelsOpts from './LevelChangesLevelsOpts';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import ReactGA from 'react-ga';
import metaInfo  from '../metaHostName.json';

function CoursesInfo() {
    const isLittleScreen = useMediaQuery({ query: '(max-width: 958px)' });
    const isBigScreen = useMediaQuery({ query: '(min-width: 959px)' })

    const [mainInfo, setMainInfo] = useState();
    const [uid, setUid] = useState();
    const [levelDetail, setLevelDetail] = useState();
    const { courseName } = useParams();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search)
    })

    useEffect(() => {
        const fetchIntroInfo = async () =>
            await axios.get('/api/info').then(response => {
                setMainInfo(response.data[0].specificInfo[2].pagesInfo[`${courseName}`].main)
            });
        fetchIntroInfo();
    }, [courseName])
    
    useEffect(() => {
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo[`${courseName}`].detailedInfo[`${courseName}1`])
            })
        fetchLevelDetail();
    }, [courseName])

    const getId = (imageId) => {
        let newId = [uid];
        newId = `${imageId}`;
        setUid(newId);
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo[`${courseName}`].detailedInfo[`${newId}`])
            })
        fetchLevelDetail();
        ReactGA.event({
            category: 'Tab/Button Change from Courses Info Page',
            action: `Selected the Tab/Button of the course ${newId}`,
            label: `${metaInfo.hostname}${window.location.pathname + window.location.search}`
        })
    }

    return (
        <>
            <Helmet>
                <title>Hikari {courseName}</title>
                {courseName === "intro" && <meta name="description" content="Cursos de Japonés en linea para nivel básico" />}
                {courseName === "kodama" && <meta name="description" content="Cursos de Japonés en linea para nivel básico avanzado" />}
                {courseName === "nozomi" && <meta name="description" content="Cursos de Japonés en linea para nivel medio" />}
                {courseName === "sakura" && <meta name="description" content="Cursos de Japonés en linea para nivel medio avanzado" />}
                {courseName === "hikari" && <meta name="description" content="Cursos de Japonés en linea para nivel avanzado" />}
                {courseName === "hayabusa" && <meta name="description" content="Cursos de Japonés en linea para nivel experto" />}
            </Helmet>
            <Header />
            <div className="intro__banner">
                <img style={courseName === "kids" ? {padding: "0px"} : {padding: "30px 0px"}} src={mainInfo?.mainImage} alt="" />
            </div>
            <div className="intro__main">
                <div className="intro__description">
                    <div className="description__container">{mainInfo?.text}</div>
                    <div className="description__reel">
                        <img src={mainInfo?.reel} alt="" />
                    </div>
                </div>
            </div>
            <div className="pages__details">
                <div className="intro__level">
                    {isBigScreen && mainInfo?.levelOptions.map(level => (
                        <PagesLevels key={level.id} {...level} getId={getId} />
                    ))}
                    {isLittleScreen && 
                        <select className="coursesInfo__select" onChange={e => getId(e.target.value)}>
                            {mainInfo?.levelOptions.map(level => (
                                <LevelChangesLevelsOpts key={level.id} {...level} />
                            ))}
                        </select>
                    }
                </div>
                <LevelChanges {...levelDetail} />
            </div>
            <Footer />
        </>
    )
}

export default withRouter(CoursesInfo)
