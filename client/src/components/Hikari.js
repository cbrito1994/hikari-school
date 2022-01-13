import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from './axios'
import PagesLevels from './PagesLevels';
import LevelChanges from './LevelChanges';

function Hikari() {
    const [hikariInfo, setHikariInfo] = useState();
    const [hikariReels, setHikariReels] = useState();
    const [pageLevels, setPageLevels] = useState();
    const [uid, setUid] = useState();
    const [levelDetail, setLevelDetail] = useState();

    useEffect(() => {
        const fetchHikariInfo = async () =>
            await axios.get('/api/info').then(response => {
                setHikariInfo(response.data[0].specificInfo[2].pagesInfo.hikari.main.text)
            });
        fetchHikariInfo();
    }, [])

    useEffect(() => {
        const fetchHikariInfo = async () =>
            await axios.get('/api/info').then(response => {
                setHikariReels(response.data[0].specificInfo[2].pagesInfo.hikari.main.reel)
            });
        fetchHikariInfo();
    }, [])

    useEffect(() => {
        const fetchPageLevels = async () =>
            await axios.get('/api/info').then(response => {
                setPageLevels(response.data[0].specificInfo[2].pagesInfo.hikari.main.levelOptions)
            });
        fetchPageLevels();
    }, [])

    useEffect(() => {
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.hikari.detailedInfo.hikari1)
            })
        fetchLevelDetail();
    }, [])

    const getId = (imageId) => {
        let newId = [uid];
        newId = `${imageId}`;
        setUid(newId);
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.hikari.detailedInfo[`${newId}`])
            })
        fetchLevelDetail();
    }

    return (
        <>
            <Header />
            <div className="intro__banner">
                <img src="https://www.hikari.mx/uploads/1/1/3/6/113652233/published/mh-portadas-6-hikari.png" alt="" />
            </div>
            <div className="intro__main">
                <div className="intro__description">
                    <div className="description__container">{hikariInfo}</div>
                    <div className="description__reel">
                        <img src={hikariReels} alt="" />
                    </div>
                </div>
            </div>
            <div className="pages__details">
                <div className="intro__level">
                    {pageLevels?.map(level => (
                        <PagesLevels key={level.id} {...level} getId={getId} />
                    ))}
                </div>
                <LevelChanges {...levelDetail} />
            </div>
            <Footer />
        </>
    )
}

export default Hikari
