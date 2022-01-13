import React, { useEffect, useRef, useState } from 'react'
import LevelChangesCourse from './LevelChangesCourse'
import LevelChangesPeriodOpts from './LevelChangesPeriodOpts'
import { useStateValue } from './StateProvider'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router'

function LevelChanges({ title, levelImage, courseStructure, price, calendar, mascotImage, courseStart, inscriptionDate, periodIpt, basketIpt }) {
    const [{}, dispatch] = useStateValue();
    const paymentTypeRef = useRef(null);
    const periodRef = useRef(null);
    const [payAmout, setPayAmout] = useState("$ -- MXN");
    const courseName = useParams();

    useEffect(() => {
        paymentTypeRef.current.value = "";
        periodRef.current.value = "";
        setPayAmout("$ -- MXN")
    }, [courseName])

    const payAmountHandler = (e) => {
        const payment = e.target.value;
        if(payment === "onePayment"){
            setPayAmout(`$${price}.00 MXN`);
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
                price: paymentTypeRef.current.value !== "subscription" ? price : 100,
                paymentType: paymentTypeRef.current.value,
            }
        })
    }

    return (
        <>
            <div className="levelChanges__title">
                <span>{title}</span>
                <div className="levelChanges__price">
                    <span>{payAmout}</span>
                    <span>¡ Precio en oferta !</span>
                </div>
                <img src={levelImage} alt="" />
            </div>
            <div className="levelChanges__courseMascot">
                <div className="courseStructure">
                    <ul className="course__content">
                        {courseStructure?.map(course => (
                            <LevelChangesCourse key={course.id} text={course.text} />
                        ))}
                    </ul>
                </div>
                <div className="levelChanges__mascot">
                    <img src={mascotImage} alt="" />
                </div>
            </div>
            <div className="classes__init">
                <h2>{courseStart}</h2>
                <p>{inscriptionDate}</p>
            </div>
            <div className="levelChanges__calendar">
                {/* <img src={calendar} alt={`${title}-logo`} /> */}
            </div>
            <form className="basket__form" onSubmit={addToBasket}>
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
                <input className="basket__input" type="submit" value="Añadir al Carrito" />
            </form>
        </>
    )
}

export default LevelChanges
