import React, { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import LevelChangesCourse from './LevelChangesCourse'
import LevelChangesPeriodOpts from './LevelChangesPeriodOpts'
import { useStateValue } from './StateProvider'
import { v4 as uuidv4 } from 'uuid'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import raitokunFeliz from '../assets/raitokun-izquierda.png';
import learnJapanese from '../assets/HOME-aprendeJaponesHoy.png'

function DiscountsInfoModal({ open, onClose, newPrice, backgroundColor, title, levelImage, courseStructure, courseStart, inscriptionDateModal, horariosModal, periodIpt, basketIpt, left, right }) {
    const [{}, dispatch] =  useStateValue();
    const periodRef = useRef(null);
    const paymentTypeRef = useRef(null);
    const [payAmout, setPayAmout] = useState("$ -- MXN");

    useEffect(() => {
        setPayAmout("$ -- MXN")
    }, [onClose])

    if(!open) return null

    const payAmountHandler = (e) => {
        const payment = e.target.value;
        if(payment === "onePayment"){
            setPayAmout(`$${newPrice}.00 MXN`);
        } else if(payment === "subscription"){
            setPayAmout(`$${100}.00 MXN`);
        } else {
            setPayAmout("$ -- MXN");
        }
    }

    const addToBasket = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: uuidv4(),
                title: title,
                levelImage: levelImage,
                period: periodRef.current.value,
                price: paymentTypeRef.current.value !== "subscription" ? newPrice : 100,
                paymentType: paymentTypeRef.current.value,
            }
        })
    }

    return ReactDom.createPortal(
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="modal__container">
                <div className="modal__title" style={{backgroundColor: backgroundColor}}>
                    <img src={raitokunFeliz} alt="raitokunFeliz" />
                    <div className="modal__titleImage"><img src={levelImage} alt="modalTitleImage" /></div>
                    <span onClick={onClose}>&times;</span>
                </div>
                <div className="modal__information">
                    <div className="information__classes">
                        <div>Contenido del curso:</div>
                        <ul className="information__classesUl">
                            {courseStructure?.map(structure => (
                                <LevelChangesCourse key={structure.id} text={structure.text} />
                            ))}
                        </ul>
                    </div>
                    <div className="information__classesYhorarios">
                        <div className="information__price">
                            <span>{payAmout}</span>
                            <span>¡ En Oferta !</span>
                        </div>
                        <div className="information__horarios">
                            <div className="information__starts">
                                <div>{courseStart}</div>
                                <hr />
                            </div>
                            <div className="information__hours">
                                <div className="hours__inscription">
                                    <span className="hours__title"><ErrorOutlineIcon/> Fecha límite para inscribirse:</span>
                                    <span className="hours__information">{inscriptionDateModal !== "" ? inscriptionDateModal : "Jueves 26 de noviembre de 2020"}</span>
                                </div>
                                <div className="hours__horarios">
                                    <span className="hours__title"><ScheduleIcon /> Horarios de clases:</span>
                                    <span className="hours__information">{horariosModal !== "" ? horariosModal : "Lunes: 19:00 - 21:00"}</span>
                                </div>
                            </div>
                        </div>
                        <form className="basket__form modal__form" onSubmit={addToBasket} >
                            <select className="basket__select modal__select" placeholder="Period" ref={periodRef} required>
                                <option value="">Elige el periodo *</option>
                                {periodIpt?.periodRules.map(period => (
                                    <LevelChangesPeriodOpts key={period.id} {...period} />
                                ))}
                            </select>
                            <select className="basket__select modal__select" placeholder="Tipo de pago" ref={paymentTypeRef} onChange={payAmountHandler} required>
                                <option value="">Elige el tipo de pago *</option>
                                <option value="onePayment">Pago único</option>
                                <option value="subscription">Suscripción</option>
                            </select>
                            <input className="basket__input ripple" type="submit" value="Añadir al Carrito" />
                        </form>
                    </div>
                </div>
                <div className="modal__footer">
                    <img src={learnJapanese} alt="aprendeJapones" />
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default DiscountsInfoModal
