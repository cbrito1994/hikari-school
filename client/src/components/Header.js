import React, { useState, useEffect } from 'react'
import HeaderMenus from './HeaderMenus';
import axios from './axios'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import HeaderCart from './HeaderCart';
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import MenuIcon from '@material-ui/icons/Menu';
import HeaderBurgerMenus from './HeaderBurgerMenus';
import headerLogo from '../assets/HEADER-hikari-logo-blanco.png'

function Header() {
    const mobileScreen = window.matchMedia('(max-width: 743px)').matches;

    const [show, handleShow] = useState(false);
    const [menus, setMenus] = useState();
    const [{ basket }, dispatch] = useStateValue();
    const history = useHistory();
    const [showBurgerMenu, setShowBurgerMenu] = useState(false)

    useEffect(() => {
        const fetchMenus = async () =>
            await axios.get('/api/info').then(response => {
                setMenus(response.data[0].headerInfo)
            });
        fetchMenus();
    }, [])

    const transitionNavBar = () => {
        if(window.scrollY > 150){
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])

    const showBM = () => {
        setShowBurgerMenu(!showBurgerMenu) //set showBurgerMenu to the opposite of what curretly is
    }

    const emptyBasket = () => {
        dispatch({
            type: "EMPTY_BASKET"
        })
        showBM();
    }

    return (
        <div className={`header ${show && "header__display"}`}>
            <div className="header__wraper">
                <div className="hikari__image">
                    <img src={headerLogo} alt="hikari-logo" onClick={() => history.push("/")} />
                </div>
                <div className="menus">
                    <Link to="/" className="title__container">
                        Inicio
                    </Link>
                    {menus?.map(options => (
                        <HeaderMenus key={options.id} {...options} />
                    ))}
                    <div className="title__container" onClick={() => window.open("https://teams.microsoft.com")} rel="noopener noreferrer">
                        Portal de Estudiantes
                    </div>
                    <Link to="/katei" className="title__container">
                        Hikari Katei
                    </Link>
                    <div className="title__mainContainer">
                        <div className="title__container">
                            Carrito ({basket?.length})
                        </div>
                        {basket?.length > 0 &&
                            <div className="cart__container">
                                <div className="cart__coursesContainer">
                                    {basket?.map(course => (
                                        <HeaderCart key={course.id} {...course} />
                                    ))}
                                </div>
                                <div className="cart__prepay">
                                    <CurrencyFormat 
                                        renderText={(value) => (
                                            <>
                                                <div className="cart__title">Total: {value} MXN</div>
                                            </>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <span onClick={() => history.push('/checkout')}>PAGAR</span>
                                </div>
                            </div>
                        } 
                    </div>
                </div>
                <div className="burgerMenu__basketIndicator">
                    <MenuIcon className="header__burgerIcon" onClick={showBM}></MenuIcon>
                    {basket.length > 0 &&
                        <div className="basket__indicator">{basket.length}</div>
                    }
                </div>
            </div>
            {mobileScreen &&
                <div className={`header__burgerMenu ${showBurgerMenu && "burgerMenu__visibility"}`}>
                    <Link to="/" className="title__container container__burger" onClick={showBM}>
                        Inicio
                    </Link>
                    {menus?.map(options => (
                        <HeaderBurgerMenus key={options.id} {...options} showBM={showBM} />
                    ))}
                    <div className="title__container container__burger" onClick={() => window.open("https://teams.microsoft.com")} rel="noopener noreferrer">
                        Portal de Estudiantes
                    </div>
                    <Link to="/katei" className="title__container container__burger" onClick={showBM}>
                        Hikari Katei
                    </Link>
                    {basket.length > 0 &&
                        <div className="burger__prepay">
                            <CurrencyFormat 
                                renderText={(value) => (
                                    <>
                                        <div className="burger__title">Total: {value} MXN</div>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <span onClick={emptyBasket}>ELIMINAR</span>
                            <span onClick={() => history.push('/checkout')}>PAGAR</span>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Header
