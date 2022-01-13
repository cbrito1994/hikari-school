import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    generalInfo: Array,
    specificInfo: Array,
    headerInfo: Array,
})

export default mongoose.model('Data', dataSchema)