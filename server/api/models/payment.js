import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    invoicing: {},
    studentData: Object,
})

// tanto el {} como Object son lo mismo

export default mongoose.model('PaymentData', paymentSchema)