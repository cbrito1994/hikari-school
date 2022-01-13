// recordar que en package.json la parte de type la cambie modules y para traer modulos npm instalados a fuerzas debo de poner el import statement, si pongo el require, no servira 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import database from './api/models/database.js';
import dbPayment from './api/models/payment.js';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config()


// app config
const app = express();
const port = process.env.port || 3001;

// middlewares
app.use(express.urlencoded({extended: false}))
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
// app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors({ origin: true })); //checar despues q onda con este

app.use('/uploads', express.static('uploads')); //use this midleware only on anything that has /uploads. Esta funcion sirve para extraer las imagenes del folder de uploads, es necesario este paso para q las imagenes se muestren en el blog, de otra manera, no se muestran pq no son de uso publico, Naz dice q no son static y para hacerlas static y poder usarlas crea esta linea, para mayor explanation ver video 16

// DB config DOTENV
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGODB_DBNAME}:${process.env.MONGODB_PASSWORD}@cluster0.aor1p.mongodb.net/hikariDB?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// Stripe secret Key DOTENV
const stripe = new Stripe(process.env.STRIPE_DEV_SECRET_KEY_URI || process.env.STRIPE_DEVELOPMENT_SECRET_KEY);

// API ROUTES
// Hikari Web Info
app.post('/api/info', (req, res) => {
    let dbHikari = req.body;
    database.create(dbHikari, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/api/info', (req, res) => {
    database.find({}, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

app.delete('/api/info', (req, res) => {
    database.deleteMany({}, (err) => {
        res.status(200).send(err);
    })
})

// Create the payer info db
app.post('/api/paymentInfo', async (req, res) => {
    const paymentDetailsInfo = req.body;
    const clientMail = paymentDetailsInfo.studentData.mail;
    const clientName = paymentDetailsInfo.studentData.name;
    const clientLastName = paymentDetailsInfo.studentData.lastName;
    const courses = paymentDetailsInfo.studentData.course;

    const mail = `<div class="mail__body" style="max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #c9cdcf; min-width: 320px;">
        <div class="body__image" style="background-color: #fff;">
            <img style="max-width: 100%;" src="https://www.hikari.mx/uploads/1/1/3/6/113652233/hikari-logos-vector-hikari-logo-blanco.png" alt="hikari-image">
        </div>
        <div class="body__message" style="background-color: #2990ea; padding: 10px 0px;">
            <div style="padding-top: 18px; padding-bottom: 10px; color: white; font-weight: bold; font-size: 28px; text-align: center;">¡Gracias por tu compra!</div>
            <div style="color: white; text-align: center;">ありがとうごさいます</div>
            <div style="text-align: center; margin: 14px 0px;">
                <a style="text-decoration: none; padding: 10px 20px; color: #2990ea; background-color: white;" href="#">Ver los detalles del pedido</a>
            </div>
        </div>
        <div class="body__order" style="padding: 20px; padding-bottom: 10px;">
            <p style="margin: 0; color: #58585e; margin-bottom: 6px;">Nº de pedido 1921319611</p>
            <p style="margin: 0; padding-bottom: 18px; color: #58585e;">7/23/2021</p>
        </div>
        ${courses.map(course => {
            return`<div class="body__courses" style="display: flex; align-items: center; justify-content: space-between; margin: 0px 14px; border-top: 1px solid #c9cdcf; padding: 24px 0px; min-width: 172px;">
                <div class="courses__image">
                    <img style="max-width: 80px;" src="${course.image}" alt="course-image">
                </div>
                <div class="courses__info" style="width: 100%; text-align: start; min-width: 170px;">
                    <p style="color: #3374ff; font-size: 16px; margin: 0; font-weight: 700;">${course.name}</p>
                    <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Periodo:</strong> Agosto 2021</p>
                    <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Horario:</strong> Regular, Lunes y Jueves, 19:00 - 21:00 hrs</p>
                    <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Sku:</strong> HI4O21Q3</p>
                    <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Cantidad:</strong> 1</p>
                </div>
                <span style="text-align: end; color: #58585e; font-size: 16px; min-width: 80px;">MX$${course.price}.00</span>
            </div>`
        })}
        <div class="body__amount" style="display: flex; padding-top: 16px; padding-bottom: 48px; margin: 0px 14px; border-bottom: 1px solid #c9cdcf; border-top: 1px solid #c9cdcf; font-size: 0.85em;">
            <div class="amount__code" style="width: 50%;">

            </div>
            <div class="amount__totals" style="width: 50%;">
                <div class="totals__total" style="display: flex;">
                    <div class="total__title" style="width: 80%; color: #58585e;">Subtotal</div>
                    <span class="total__number" style="color: #58585e; min-width: 78px;">MX$795.00</span>
                </div>
                <div class="totals__total" style="display: flex;">
                    <div class="total__title" style="width: 80%; color: #58585e;">Los impuestos están incluidos en el precio del artículo (IVA)</div>
                    <div class="total__number" style="color: #58585e; min-width: 78px;">MX$109.65</div>
                </div>
                <div class="totals__total" style="display: flex;">
                    <div class="total__title" style="width: 80%; color: #58585e;">Total</div>
                    <div class="total__number" style="color: #58585e; min-width: 78px;">MX$795.00</div>
                </div>
            </div>
        </div>
        <div class="body__total" style="margin: 0px 14px; margin-top: 16px; border-bottom: 1px solid #c9cdcf; padding-bottom: 20px;">
            <div style="font-weight: 700; color: #3374ff; text-align: center; padding-bottom: 10px;">Total</div>
            <div style="font-size: 2em; font-weight: 700; color: #58585e; text-align: center;">MX$795.00</div>
        </div>
        <div class="body__studentData" style="display: flex; margin: 0px 14px; padding: 16px 0px;">
            <div class="studentData__invoicing" style="width: 50%;">
                <div style="font-size: 16px; font-weight: 700; color: #58585e;">Información de facturación</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.invoicing.name} ${paymentDetailsInfo.invoicing.lastName}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.invoicing.directionOne}, ${paymentDetailsInfo.invoicing.directionTwo}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.invoicing.city}, ${paymentDetailsInfo.invoicing.region} ${paymentDetailsInfo.invoicing.postalCode}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.studentData.mail}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.invoicing.phone}</div>
            </div>
            <div class="studentData__customer" style="width: 50%;">
                <div style="font-size: 16px; font-weight: 700; color: #58585e;">Información del cliente</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.studentData.name} ${paymentDetailsInfo.studentData.lastName}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.studentData.directionOne}, ${paymentDetailsInfo.studentData.directionTwo}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.studentData.city}, ${paymentDetailsInfo.studentData.region} ${paymentDetailsInfo.studentData.postalCode}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.studentData.mail}</div>
                <div style="font-size: 0.9em; color: #58585e; font-size: 0.9em;">${paymentDetailsInfo.studentData.phone}</div>
            </div>
        </div>
        <div class="body__footer" style="text-align: center;">
            <p>Agradecemos tu preferencia y, ¡esperamos que tengas una muy buena experiencia aprendiendo japonés!</p>
            <div class="footer__addres" style="color: #70767c; font-size: 0.75em; padding-top: 20px;">
                <div>Este correo le ha sido enviado por Admisiones Hikari Educación</div>
                <div>Calle Chimalcoyotl 37, Toriello Guerra,</div>
                <div>Ciudad de México, Tlalpan 14050</div>
                <div>México</div>
                <p>+52 55 4350 0636  |  www.hikari.mx</p>
            </div>
        </div>
    </div>`

    dbPayment.create(paymentDetailsInfo, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER_URI || process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD_URI || process.env.NODEMAILER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    const info = await transporter.sendMail({
        from: "'Hikari Admisiones' <carlos.brito@hikari.mx>",
        to: `${clientMail}`,
        subject: `${clientName} ${clientLastName} ¡Bienvenido a la familia Hikari! 😊🎌`,
        html: mail,
    })
    console.log('Message sent', info.messageId);
})

// Create the connection with stripe
app.post('/checkoutPayment', async (req, res) => {
    const total =  req.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'MXN'
    });
    res.status(200).send({
        clientSecret: paymentIntent.client_secret
    })
})

app.post('/checkoutPaymentSub', async (req, res) => {
    // try {
        const customer = await stripe.customers.create({
            email: req.body.email,
        });
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{
                price: process.env.STRIPE_PRICE_ID_URI || process.env.STRIPE_PRICE_ID,
                quantity: req.body.quantity,
            }],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent'],
        });
        // console.log(customer);
        // console.log(subscription);
        const status = subscription.latest_invoice.payment_intent.status;
        const subscriptionId = subscription.id;
        const clientSecret = subscription.latest_invoice.payment_intent.client_secret;
        res.status(201).json({
            'client_secret': clientSecret,
            'status': status,
            'subscriptionId': subscriptionId
        })
    // } catch (err) {
    //     return res.status(400).send({ error: { message: err.message } });
    // }
})

// For production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//listen
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))