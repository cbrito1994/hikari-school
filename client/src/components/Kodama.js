import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from './axios'
import PagesLevels from './PagesLevels';
import LevelChanges from './LevelChanges';

function Kodama() {
    const [kodamaInfo, setKodamaInfo] = useState();
    const [kodamaReels, setKodamaReels] = useState();
    const [pageLevels, setPageLevels] = useState();
    const [uid, setUid] = useState();
    const [levelDetail, setLevelDetail] = useState();

    useEffect(() => {
        const fetchKodamaInfo = async () =>
            await axios.get('/api/info').then(response => {
                setKodamaInfo(response.data[0].specificInfo[2].pagesInfo.kodama.main.text)
            });
        fetchKodamaInfo();
    }, [])

    useEffect(() => {
        const fetchKodamaInfo = async () =>
            await axios.get('/api/info').then(response => {
                setKodamaReels(response.data[0].specificInfo[2].pagesInfo.kodama.main.reel)
            });
        fetchKodamaInfo();
    }, [])

    useEffect(() => {
        const fetchPageLevels = async () =>
            await axios.get('/api/info').then(response => {
                setPageLevels(response.data[0].specificInfo[2].pagesInfo.kodama.main.levelOptions)
            });
        fetchPageLevels();
    }, [])

    useEffect(() => {
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.kodama.detailedInfo.kodama1)
            })
        fetchLevelDetail();
    }, [])

    const getId = (imageId) => {
        let newId = [uid];
        newId = `${imageId}`;
        setUid(newId);
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.kodama.detailedInfo[`${newId}`])
            })
        fetchLevelDetail();
    }

    return (
        <>
            <Header />
            <div className="intro__banner">
                <img src="https://www.hikari.mx/uploads/1/1/3/6/113652233/published/mh-portadas-2-kodama.png" alt="" />
            </div>
            <div className="intro__main">
                <div className="intro__description">
                    <div className="description__container">{kodamaInfo}</div>
                    <div className="description__reel">
                        <img src={kodamaReels} alt="" />
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

export default Kodama
