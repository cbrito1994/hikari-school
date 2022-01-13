import React, { useState } from 'react'
import axios from './axios'

function DiscountsLogos({ image, levelType, getId }) {
    const [hover, setHover] = useState(false);
    const [lineColor, setLineColor] = useState();

    const setColor = (e) => {
        let containerId = e.target.id;
        const fetchDetailedInfo = async () =>
            await axios.get('/api/info').then(response => {
                setLineColor(response?.data[0]?.specificInfo[1]?.levelsInfo[`${containerId}`][0]?.modalInfo.backgroundColor);
            })
        fetchDetailedInfo();
        setHover(true);
    }

    let hoverStyle = {
        borderBottomColor: lineColor
    }

    if(hover === true){
        hoverStyle = {
            borderBottomColor: lineColor,
        }
    }

    return (
        <div className="discounts__container" id={levelType} onMouseEnter={setColor} onMouseLeave={() => setHover(false)}>
            <img className="test__image" id={levelType} src={image} onClick={e => getId(e.target.id)} alt=""/>
            <div className="discounts__line" style={hoverStyle}></div>
        </div>
    )
}

export default DiscountsLogos
