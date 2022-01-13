import React from 'react'
import { useStateValue } from './StateProvider'

function HeaderCart({ id, levelImage, period, price, title }) {
    // eslint-disable-next-line
    const [{}, dispatch] = useStateValue();
    
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

    return (
        <div className="cart__courses">
            <img src={levelImage} alt=""/>
            <div className="cart__titlePeriod">
                <span>{title}</span>
                <span>Periodo: {period}</span>
            </div>
            <span>MXN {price}.00</span>
            <span onClick={removeFromBasket}>&times;</span>
        </div>
    )
}

export default HeaderCart
