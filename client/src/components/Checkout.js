import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import HeaderCart from './HeaderCart';
import { useStateValue } from './StateProvider'
import Footer from './Footer'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer' // en estos casos es super importante poner los {} si no se rompe
// import { getBasketOnePayTotal } from './reducer';
import axios from './axios';
import ReactCountriesInput from 'react-countries-input'
import { useHistory } from 'react-router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

function Checkout() {
    const [{ basket, studentInfo, basketOnePayment, basketSubscriptionMonth }, dispatch] = useStateValue();
    const history = useHistory();
    // const LOCAL_STORAGE_KEY = 'hikariWeb.studentInfo';
    const littleScreen = window.matchMedia('(max-width: 1047px)').matches;
    
    const [check, setCheck] = useState(true);
    const [mainInfoCheck, setMainInfoCheck] = useState(false);
    // const [onePayConfirmation, setOnePayConfirmation] = useState(false);
    // const [subConfirmation, setSubConfirmation] = useState(false);

    const [basketOnePay, setBasketOnePay] = useState([]);
    const [basketSubscription, setBasketSubscription] = useState([]);
    
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const [subClientSecret, setSubClientSecret] = useState(true);

    const inputEmailRef = useRef(null);
    // const [inputEmail, setInputEmail] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const birthDate = useRef(null);
    const [directionOne, setDirectionOne] = useState("");
    const [directionTwo, setDirectionTwo] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [postalCode, setPostalCode] = useState("");
    // const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("")
    const [invoicingName, setInvoicingName] = useState("");
    const [invoicingLastName, setInvoicingLastName] = useState("");
    const [invoicingDirectionOne, setInvoicingDirectionOne] = useState("");
    const [invoicingDirectionTwo, setInvoicingDirectionTwo] = useState("");
    const [invoicingCity, setInvoicingCity] = useState("");
    const [invoicingRegion, setInvoicingRegion] = useState("");
    const [invoicingPostalCode, setInvoicingPostalCode] = useState("");
    const [invoicingCountry, setInvoicingCountry] = useState("");
    const [invoicingPhone, setInvoicingPhone] = useState("");

    // useEffect(() => {
    //     if(basket.length !== 0){
    //         const getClientSecret = async () => {
    //             const response = await axios({
    //                 method: 'post',
    //                 url: `/checkoutPayment?total=${getBasketOnePayTotal(basketOnePay) * 100}`,
    //             });
    //             setClientSecret(response.data.clientSecret);
    //         }
    //         getClientSecret();
    //     }
    // }, [basket])

    console.log(basketOnePayment)
    console.log(basketSubscriptionMonth)
    useEffect(() => {
        const basketOnePay = basket.filter(item => item.paymentType === 'onePayment');
        setBasketOnePay(basketOnePay)
        const basketSubscription = basket.filter(item => item.paymentType !== 'onePayment');
        setBasketSubscription(basketSubscription)
    }, [basket])
    // console.log(basketOnePay);
    // console.log(basketSubscription)

    useEffect(() => {
        if(basketOnePay.length !== 0){
            const totalPrice = basketOnePay.reduce((amount, item) => item.price + amount, 0)
            const getClientSecret = async () => {
                const response = await axios({
                    method: 'post',
                    url: `/checkoutPayment?total=${totalPrice * 100}`,
                });
                setClientSecret(response.data.clientSecret);
            }
            getClientSecret();
        };
    }, [basketOnePay])

    useEffect(() => {
        if(basketSubscription.length !== 0){
            const getSubscriptionSecret = async () => {
                const res = await axios.post('/checkoutPaymentSub', {
                    email: inputEmailRef.current.value,
                    quantity: basketSubscription.length,
                });
                setSubClientSecret(res.data.client_secret)
            }
            getSubscriptionSecret();
        }
    }, [basketSubscription])

    const addToInfo = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SET_STUDENT_INFO',
            info: {
                mail: inputEmailRef.current.value,
                name: inputName,
                lastName: inputLastName,
                birthDate: birthDate.current.value,
                directionOne: directionOne,
                directionTwo: directionTwo,
                city: city,
                region: region,
                postalCode: postalCode,
                // country: country,
                phone: phone
            }
        })
        setMainInfoCheck(true)
        // console.log(country)
    }

    const payAll = async (e) => {
        e.preventDefault();
        setProcessing(true);
        let onePayConfirmation = false;
        let subConfirmation = false;
        let allStudentInfo = {
            invoicing: {
                name: invoicingName || studentInfo[0]?.name,
                lastName: invoicingLastName || studentInfo[0]?.lastName,
                directionOne: invoicingDirectionOne || studentInfo[0]?.directionOne,
                directionTwo: invoicingDirectionTwo || studentInfo[0]?.directionTwo,
                city: invoicingCity || studentInfo[0]?.city,
                region: invoicingRegion || studentInfo[0]?.region,
                postalCode: invoicingPostalCode || studentInfo[0]?.postalCode,
                country: invoicingCountry || studentInfo[0]?.country,
                phone: invoicingPhone || studentInfo[0]?.phone
            },
            studentData: {
                mail: studentInfo[0]?.mail,
                name: studentInfo[0]?.name,
                lastName: studentInfo[0]?.lastName,
                // birthDate: birthDate.current.value,
                directionOne: studentInfo[0]?.directionOne,
                directionTwo: studentInfo[0]?.directionTwo,
                city: studentInfo[0]?.city,
                region: studentInfo[0]?.region,
                postalCode: studentInfo[0]?.postalCode,
                // country: country.current.value,
                phone: studentInfo[0]?.phone,
                course: basket?.map(info => ({name: info.title, period: info.period, type: info.type, price: info.price, image: info.levelImage})),
            }
        }

        if(basketOnePay.length !== 0){
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
            if(!error){
                console.log(paymentIntent);
                onePayConfirmation = true;
            } else {
                alert(error);
            }
        } else {
            onePayConfirmation = true;
        }

        if(basketSubscription.length !== 0){
            const res = await stripe.confirmCardPayment(subClientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: studentInfo[0]?.mail,
                        name: `${inputName} ${inputLastName}`
                    },
                }
            });
            if(!res.error){
                console.log("you got the money!", res.paymentIntent)
                subConfirmation = true;
            } else {
                alert(res.error);
            }
        } else {
            subConfirmation = true;
        }

        if(onePayConfirmation && subConfirmation){
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            axios.post('/api/paymentInfo', allStudentInfo);
            dispatch({
                type: 'EMPTY_BASKET'
            });
            history.replace('/paymentFinished');
        } else {
            console.log("onePay", onePayConfirmation);
            onePayConfirmation === false && alert(`Your payment wasn't correctly processed`)
            console.log("sub", onePayConfirmation)
            onePayConfirmation === false && alert("Your subscription wasn't correctly processed")
        }
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <>
            <Header />
            <div className="checkout__main">
                <div className="checkout__title">Pago Seguro</div>
                <div className="checkout__containers">
                    <div className="checkout__form">
                        {
                            mainInfoCheck === false ? 
                            (
                                <form className="checkout__details" onSubmit={addToInfo}>
                                    <div className="detalles">TUS DETALLES</div>
                                    <div className="detalles__instructions">Ingresar los datos personales del alumno que se va a inscribir. Estos son los datos que se utilizarán para generar las credenciales de acceso a la plataforma digital para el estudiante.</div>
                                    <label htmlFor="email">Correo electrónico*</label>
                                    <input type="email" id="email" ref={inputEmailRef} autoComplete="email" required/>
                                    <div className="personal__info">INFORMACIÓN PERSONAL DEL ALUMNO</div>
                                    <label htmlFor="name">Nombre(s)*</label>
                                    <input type="text" id="name" onChange={e => setInputName(e.target.value)} value={inputName} autoComplete="given-name" required/>
                                    <label htmlFor="lastName">Apellidos*</label>
                                    <input type="text" id="lastName" onChange={e => setInputLastName(e.target.value)} value={inputLastName} autoComplete="family-name" required/>
                                    <label htmlFor="birthDate">Fecha de nacimiento*</label>
                                    <input type="date" id="birthDate" ref={birthDate} autoComplete="bday" required/>
                                    <label htmlFor="direction__one">Dirección Linea 1*</label>
                                    <input type="text" id="direction__one" onChange={e => setDirectionOne(e.target.value)} value={directionOne} autoComplete="address-line1" required/>
                                    <label htmlFor="direction__two">Dirección Linea 2</label>
                                    <input type="text" id="direction__two" onChange={e => setDirectionTwo(e.target.value)} value={directionTwo} autoComplete="address-line2"/>
                                    <label htmlFor="city">Ciudad*</label>
                                    <input type="text" id="city" onChange={e => setCity(e.target.value)} value={city} autoComplete="shipping address-level2" required/>
                                    <label htmlFor="region">Región*</label>
                                    <input type="text" id="region" onChange={e => setRegion(e.target.value)} value={region} autoComplete="address-level4" required/>
                                    <label htmlFor="postalcode">Código Postal*</label>
                                    <input type="text" id="postalcode" onChange={e => setPostalCode(e.target.value)} value={postalCode} autoComplete="postal-code" required/>
                                    <label htmlFor="country">País*</label>
                                    <ReactCountriesInput id="country" onChange={e=>console.log(e.target.value)} flagStyle={{'&img': {width: 30, height: 15}}} required />
                                    <label htmlFor="phone">Número de teléfono*</label>
                                    <input type="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel-national" required/>
                                    <button type="submit">SIGUIENTE</button>
                                </form>
                            ) : (
                                <div className="personal__information">
                                    <div className="details__edit">
                                        <div className="detalles">TUS DETALLES</div>
                                        <span className="edit__button" onClick={() => setMainInfoCheck(false)}>Editar</span>
                                    </div>
                                    <div className="personal__infoSummary">
                                        <div className="wrapper__name">{studentInfo[0]?.name} {studentInfo[0]?.lastName}</div>
                                        <div className="wrapper__direction">{studentInfo[0]?.directionOne}</div>
                                        <div className="wrapper__country">{studentInfo[0]?.country}</div>
                                        <div className="wrapper__phone">{studentInfo[0]?.phone}</div>
                                    </div>
                                </div>
                            ) 
                        }
                        {
                            mainInfoCheck === false ?
                            (
                                <div className="checkout__payment">
                                    <div className="paymentInfo">CONFIRMACION DE TU PEDIDO Y FACTURACIÓN</div>
                                </div>
                            ) : (
                                <form className="checkout__payment" onSubmit={payAll}>
                                    <div className="paymentInfo">CONFIRMACION DE TU PEDIDO Y FACTURACIÓN</div>
                                    <h4>AVISO IMPORTANTE</h4>
                                    <div className="payment__instructions">Esta es una página clon de la original y no se venden los cursos aquí, sin embargo, si quieres cotinuar con la experiencia de la página web y recibir el correo de confirmación de compra, por favor en los campos de pago que a continuación ves, teclea por favor 42 hasta terminar de llenar todos los campos. !Muchas gracias¡</div>
                                    {littleScreen && 
                                        <div className="littleScreenSummary">
                                            {basket?.map(course => (
                                                <HeaderCart key={course.id} {...course} />
                                            ))}
                                            <div className="littleScreenSummaryTotal">
                                                <CurrencyFormat 
                                                    renderText={(value) => (
                                                        <>
                                                            <div className="checkout__total">
                                                                <div className="total__title">Total:</div>
                                                                <strong>{value} MXN</strong>
                                                            </div>
                                                        </>
                                                    )}
                                                    decimalScale={2}
                                                    value={getBasketTotal(basket)}
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    prefix={"$"}
                                                />
                                                <div className="littleScreenTaxes">Los impuestos están incluidos en el precio del artículo</div>
                                            </div>
                                        </div>
                                    }
                                    <CardElement onChange={handleChange} />
                                    <div className="paymentDirection">DIRECCIÓN DE FACTURACIÓN</div>
                                    <input className="custom__checkbox" type="checkbox" id="directionChecked" onChange={e => e.target.checked ? setCheck(true) : setCheck(false)} defaultChecked/>
                                    <label className="checkbox__label" htmlFor="directionChecked">Igual que la dirección mencionada arriba</label>
                                    {
                                        check === true ? 
                                        (
                                            <div className="info__wrapper">
                                                <div className="wrapper__name">{studentInfo[0]?.name} {studentInfo[0]?.lastName}</div>
                                                <div className="wrapper__direction">{studentInfo[0]?.directionOne}</div>
                                                <div className="wrapper__country">{studentInfo[0]?.country}</div>
                                                <div className="wrapper__phone">{studentInfo[0]?.phone}</div>
                                            </div>
                                        ) : (
                                            <>
                                                <label htmlFor="invoicingName">Nombre(s)</label>
                                                <input type="text" id="invoicingName" onChange={e => setInvoicingName(e.target.value)} value={invoicingName}  autoComplete="given-name"/>
                                                <label htmlFor="invoicingLastName">Apellidos</label>
                                                <input type="text" id="invoicingLastName" onChange={e => setInvoicingLastName(e.target.value)} value={invoicingLastName} autoComplete="family-name"/>
                                                <label htmlFor="invoicingDirection__one">Dirección Linea 1</label>
                                                <input type="text" id="invoicingDirection__one" onChange={e => setInvoicingDirectionOne(e.target.value)} value={invoicingDirectionOne} autoComplete="address-line1"/>
                                                <label htmlFor="invoicingDirection__two">Dirección Linea 2</label>
                                                <input type="text" id="invoicingDirection__two" onChange={e => setInvoicingDirectionTwo(e.target.value)} value={invoicingDirectionTwo} autoComplete="address-line2"/>
                                                <label htmlFor="invoicingCity">Ciudad</label>
                                                <input type="text" id="invoicingCity" onChange={e => setInvoicingCity(e.target.value)} value={invoicingCity} autoComplete="shipping address-level2"/>
                                                <label htmlFor="invoicingRegion">Región</label>
                                                <input type="text" id="invoicingRegion" onChange={e => setInvoicingRegion(e.target.value)} value={invoicingRegion} autoComplete="address-level4"/>
                                                <label htmlFor="invoicingPostalcode">Código Postal</label>
                                                <input type="text" id="invoicingPostalcode" onChange={e => setInvoicingPostalCode(e.target.value)} value={invoicingPostalCode} autoComplete="postal-code"/>
                                                <label htmlFor="invoicingCountry">País</label>
                                                <ReactCountriesInput id="country" value={invoicingCountry} onChange={e => setInvoicingCountry(e.value)} flagStyle={{'&img': {width: 30, height: 15}}} />
                                                <label htmlFor="phone">Número de teléfono</label>
                                                <input type="phone" id="phone" value={invoicingPhone} onChange={e => setInvoicingPhone(e.target.value)} autoComplete="tel-national"/>
                                            </>
                                        )
                                    }
                                    <button type="submit" disabled={basket.length === 0 || processing || disabled || succeeded }>{processing ? "Procesando..." : "¡Comprar!"}</button>
                                    {error && <div>{error}</div>}
                                </form>
                            )
                        }
                        <div className="checkout__finish">
                            <div className="finish__title">REVISAR Y ENVIAR ORDEN</div>
                        </div>
                    </div>
                    <div className="checkout__summary">
                        <div className="summary__title">RESUMEN DEL PEDIDO</div>
                        {basket?.map(course => (
                            <HeaderCart key={course.id} {...course} />
                        ))}
                        <div className="summary__total">
                            <CurrencyFormat 
                                renderText={(value) => (
                                    <>
                                        <div className="checkout__total">
                                            <div className="total__title">Total:</div>
                                            <strong>{value} MXN</strong>
                                        </div>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <div className="taxes__info">Los impuestos están incluidos en el precio del artículo</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout
