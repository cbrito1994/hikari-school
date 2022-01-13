import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from './axios'
import PagesLevels from './PagesLevels';
import LevelChanges from './LevelChanges';

function Nozomi() {
    const [nozomiInfo, setNozomiInfo] = useState();
    const [nozomiReels, setNozomiReels] = useState();
    const [pageLevels, setPageLevels] = useState();
    const [uid, setUid] = useState();
    const [levelDetail, setLevelDetail] = useState();

    useEffect(() => {
        const fetchNozomiInfo = async () =>
            await axios.get('/api/info').then(response => {
                setNozomiInfo(response.data[0].specificInfo[2].pagesInfo.nozomi.main.text)
            });
        fetchNozomiInfo();
    }, [])

    useEffect(() => {
        const fetchNozomiInfo = async () =>
            await axios.get('/api/info').then(response => {
                setNozomiReels(response.data[0].specificInfo[2].pagesInfo.nozomi.main.reel)
            });
        fetchNozomiInfo();
    }, [])

    useEffect(() => {
        const fetchPageLevels = async () =>
            await axios.get('/api/info').then(response => {
                setPageLevels(response.data[0].specificInfo[2].pagesInfo.nozomi.main.levelOptions)
            });
        fetchPageLevels();
    }, [])

    useEffect(() => {
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.nozomi.detailedInfo.nozomi1)
            })
        fetchLevelDetail();
    }, [])

    const getId = (imageId) => {
        let newId = [uid];
        newId = `${imageId}`;
        setUid(newId);
        const fetchLevelDetail = async () =>
            await axios.get('/api/info').then(response => {
                setLevelDetail(response.data[0].specificInfo[2].pagesInfo.nozomi.detailedInfo[`${newId}`])
            })
        fetchLevelDetail();
    }

    return (
        <>
            <Header />
            <div className="intro__banner">
                <img src="https://www.hikari.mx/uploads/1/1/3/6/113652233/editor/mh-portadas-3-nozomi.png" alt="" />
            </div>
            <div className="intro__main">
                <div className="intro__description">
                    <div className="description__container">{nozomiInfo}</div>
                    <div className="description__reel">
                        <img src={nozomiReels} alt="" />
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

export default Nozomi
