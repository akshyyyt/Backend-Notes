import mongoose from 'mongoose';

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    specialisation: {
        type: [
            {
                type: String
            }
        ]
    }
},{timestamps: true});

export const Hospital = mongoose.model('Hospital', hospitalSchema)