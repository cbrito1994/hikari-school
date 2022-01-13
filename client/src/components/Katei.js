import { useEffect, useRef, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from './axios'
import KateiFeatures from './KateiFeatures';
import KateiSelections from './KateiSelections';
import { useStateValue } from './StateProvider';
import { v4 as uuidv4 } from 'uuid'
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga';
import hikariIntro from '../assets/HOME-hikari-web-intro.png'
import hikariKodama from '../assets/HOME-hikari-web-kodama.png';
import hikariNozomi from '../assets/HOME-hikari-web-nozomi.png';
import hikariSakura from '../assets/HOME-hikari-web-sakura.png';
import hikariHikari from '../assets/HOME-hikari-web-hikari.png';
import hikariHayabusa from '../assets/HOME-hikari-web-hayabusa.png';
import raitokunNormal from '../assets/raitokun-normal.png'

function Katei() {
    const [{}, dispatch] = useStateValue();
    const [mainInfo, setMainInfo] = useState();
    const [selectOptions, setSelectOptions] = useState();
    const [choiceInfo, setChoiceInfo] = useState();
    const levelValue = useRef(null);
    const periodValue = useRef(null);
    const interestValue = useRef(null);
    const horariosValue = useRef(null);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search)
    })

    useEffect(() => {
        const fetchMainInfo = async () =>
            await axios.get('/api/info').then(response => {
                setMainInfo(response.data[0].specificInfo[2].pagesInfo.katei.mainInfo)
            });
        fetchMainInfo();
    }, [])

    useEffect(() => {
        const fetchSelectOptions = async () =>
            await axios.get('/api/info').then(response => {
                setSelectOptions(response.data[0].specificInfo[2].pagesInfo.katei.selectionOptions)
            })
        fetchSelectOptions();
    }, [])

    const changeCourseInfo = (e) => {
        let choice = e.target.value;
        if(choice !== ""){
            axios.get('/api/info').then(response => {
                setChoiceInfo(response.data[0].specificInfo[2].pagesInfo.katei.courseInfo[`${choice}`])
            })
        } else { // si no quisiera hacer nada, pongo else return
            setChoiceInfo("")
        }
    }

    const addToBasket = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: uuidv4(),
                title: levelValue.current.value,
                levelImage: choiceInfo?.image,
                period: periodValue.current.value,
                price: mainInfo?.newPrice,
                interest: interestValue.current.value,
                horario: horariosValue.current.value
            }
        })
    }

    return (
        <>
            <Helmet >
                <title>Hikari Katei</title>
                <meta name="description" content="Clases de Japonés personalizadas, Clases de Japonés personalizadas en linea" />
            </Helmet>
            <Header />
            <div className="katei__banner">
                <img src={mainInfo?.mainImage} alt="" />
            </div>
            <div className="katei">
                <div className="katei__title">
                    <div className="title__name">Hikari Katei</div>
                    <div className="title__price">
                        <span className="price__old">MXN{mainInfo?.oldPrice}.00</span>
                        <span className="price__new">MXN{mainInfo?.newPrice}.00</span>
                        <span className="price__offer">En Oferta</span>
                    </div>
                    <div className="price__images">
                        <img src={hikariIntro} alt="hikari-intro" />
                        <img src={hikariKodama} alt="hikari-kodama" />
                        <img src={hikariNozomi} alt="hikari-nozomi" />
                        <img src={hikariSakura} alt="hikari-sakura" />
                        <img src={hikariHikari} alt="hikariHikari" />
                        <img src={hikariHayabusa} alt="hikari-hayabusa" />
                    </div>
                </div>
                <div className="katei__middle">
                    <div className="middle__text">
                            <div className="katei__description">
                            {mainInfo?.text}
                        </div>
                        <div className="katei__features">
                            <ul className="features__ul">
                                {mainInfo?.courseInfo.map(course =>(
                                    <KateiFeatures key={course.id} {...course} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <img src={raitokunNormal} alt="raitokun-normal" />
                </div>
                <div className="katei__preferences">
                    <span className="preferences__title">¡Elige las preferencias para tus clases personalizadas!</span>
                    <div className="preferences__choices">
                        <form className="katei__selections">
                            <select className="selections__level" onChange={changeCourseInfo} ref={levelValue} required>
                                <option value="">Nivel *</option>
                                {selectOptions?.levelOptions.map(level => (
                                    <KateiSelections key={level.id} {...level} />
                                ))}
                            </select>
                            <select className="selections__period" ref={periodValue} required>
                                <option value="">Periodo *</option>
                                {selectOptions?.period.map(period => (
                                    <KateiSelections key={period.id} {...period} />
                                ))}
                            </select>
                            <textarea className="selections__interest" placeholder="Señala algunos temas que son de tu interés*" ref={interestValue} required />
                            <textarea className="selections__horarios" placeholder="Indica algunas opciones de horarios que te acomoden*" ref={horariosValue} required />
                            <button type="submit" className="basket__input" onClick={addToBasket}>Añadir al Carrito</button>
                        </form>
                        <div className="choices__info">
                            <img src={choiceInfo?.image} alt="" />
                            <p>{choiceInfo?.text}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Katei
