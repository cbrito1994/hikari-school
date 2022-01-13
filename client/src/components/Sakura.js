import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from './axios'
import PagesLevels from './PagesLevels';
import LevelChanges from './LevelChanges';

function Sakura() {
    const [sakuraInfo, setSakuraInfo] = useState();
    const [sakuraReels, setSakuraReels] = useState();
    const [pageLevels, setPageLevels] = useState();
    const [uid, setUid] = useState();
    const [levelDetail, setLevelDetail] = useState();

    useEffect(() => {
        const fetchSakuraInfo = async () =>
            await axios.get('/api/info').then(response => {
                setSakuraInfo(response.data[0].specificInfo[2].pagesInfo.sakura.main.text)
            });
        fetchSakuraInfo();
    }, [])

    useEffect(() => {
        const fetchSakuraInfo = async () =>
            await axios.get('/api/info').then(response => {
                setSakuraReels(response.data[0].specificInfo[2].pagesInfo.sakura.main.reel)
            });
        fetchSakuraInfo();
    }, [])

    useEffect(() => {
        const fetchPageLevels = async () =>
            await axios.get('/api/info').then(response => {
                setPageLevels(response.data[0].specificInfo[2].pagesInfo.sakura.main.levelOptions)
            });
        fetchPageLevels();
    }, [])

    useEffect(() => {
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.sakura.detailedInfo.sakura1)
            })
        fetchLevelDetail();
    }, [])

    const getId = (imageId) => {
        let newId = [uid];
        newId = `${imageId}`;
        setUid(newId);
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.sakura.detailedInfo[`${newId}`])
            })
        fetchLevelDetail();
    }

    return (
        <>
            <Header />
            <div className="intro__banner">
                <img src="https://www.hikari.mx/uploads/1/1/3/6/113652233/editor/mh-portadas-4-sakura.png" alt="" />
            </div>
            <div className="intro__main">
                <div className="intro__description">
                    <div className="description__container">{sakuraInfo}</div>
                    <div className="description__reel">
                        <img src={sakuraReels} alt="" />
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

export default Sakura
