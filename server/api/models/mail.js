

let Mail = 
`<div class="mail__body" style="max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #c9cdcf; min-width: 320px;">
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
        return`<div class="body__courses" style="display: flex; align-items: center; justify-content: space-between; margin: 0px 14px; border-top: 1px solid #c9cdcf; padding: 24px 0px;">
            <div class="courses__image">
                <img style="max-width: 80px;" src="${course.image}" alt="course-image">
            </div>
            <div class="courses__info" style="width: 100%; text-align: start;">
                <p style="color: #3374ff; font-size: 16px; margin: 0; font-weight: 700;">${course.name}</p>
                <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Periodo:</strong> Agosto 2021</p>
                <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Horario:</strong> Regular, Lunes y Jueves, 19:00 - 21:00 hrs</p>
                <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Sku:</strong> HI4O21Q3</p>
                <p style="color: #58585e; margin: 0; margin: 4px 0px; font-size: 0.85em"><strong>Cantidad:</strong> 1</p>
            </div>
            <span style="text-align: end; color: #58585e; font-size: 16px">MX$${course.price}.00</span>
        </div>`
    })}
    <div class="body__amount" style="display: flex; padding-top: 16px; padding-bottom: 48px; margin: 0px 14px; border-bottom: 1px solid #c9cdcf; border-top: 1px solid #c9cdcf; font-size: 0.85em;">
        <div class="amount__code" style="width: 50%;">

        </div>
        <div class="amount__totals" style="width: 50%;">
            <div class="totals__total" style="display: flex;">
                <div class="total__title" style="width: 80%; color: #58585e;">Subtotal</div>
                <span class="total__number" style="color: #58585e;">MX$795.00</span>
            </div>
            <div class="totals__total" style="display: flex;">
                <div class="total__title" style="width: 80%; color: #58585e;">Los impuestos están incluidos en el precio del artículo (IVA)</div>
                <div class="total__number" style="color: #58585e;">MX$109.65</div>
            </div>
            <div class="totals__total" style="display: flex;">
                <div class="total__title" style="width: 80%; color: #58585e;">Total</div>
                <div class="total__number" style="color: #58585e;">MX$795.00</div>
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

export default Mail