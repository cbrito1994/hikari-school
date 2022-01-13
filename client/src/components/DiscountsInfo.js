import React, { useEffect, useState } from 'react';
import DiscountsInfoModal from './DiscountsInfoModal';
import ReactGA from 'react-ga';
import metaInfo  from '../metaHostName.json';

function DiscountsInfo({ image, name, oldPrice, newPrice, modalInfo, left, right }) {
    const mediumScreen = window.matchMedia('(max-width: 1024px)').matches;

    const [isOpen, setisOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [percentage, setPercentage] = useState('');

    let hoverStyle = {
        backgroundColor: "white"
    }

    let ribbonStyle = {
        backgroundColor: "transparent",
        color: "white",
    }

    if(hover === true){
        hoverStyle = {
            backgroundColor: modalInfo.backgroundColor,
            color: "white",
            borderColor: modalInfo.backgroundColor
        }
        ribbonStyle = {
            backgroundColor: modalInfo.backgroundColor,
            color: "white",
        }
    }

    const modalStyle = () => {
        setisOpen(true);
        setHover(false);
        ReactGA.event({
            category: `Button to Open Modal from "${window.location.pathname + window.location.search}"`,
            action: `Open the modal of the course ${name}`,
            label: `${metaInfo.hostname}${window.location.pathname + window.location.search}`
        })
    }

    useEffect(() => {
        const number = newPrice / oldPrice;
        const wholeNumber = number * 100;
        const roundNumber = 100 - wholeNumber
        setPercentage(Math.round(roundNumber))
    }, [newPrice, oldPrice])

    return (
        <div className="info__details" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <img src={image} alt="level-image"/>
            <div className="info__name">{name}</div>
            <div className="old__price">MX${oldPrice}.00</div>
            <div className="new__price">MX${newPrice}.00</div>
            <span className="interest__button" onClick={modalStyle} style={mediumScreen ? {backgroundColor: modalInfo.backgroundColor, color: "white", borderColor: modalInfo.backgroundColor} : hoverStyle}>¡ Me interesa !</span>
            <DiscountsInfoModal open={isOpen} onClose={() => setisOpen(false)} newPrice={newPrice} {...modalInfo} left={left} right={right} />
            <div className="ribbon" style={ribbonStyle}>-{percentage}%</div>
        </div>
    )
}

export default DiscountsInfo
