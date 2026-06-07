import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    diagonsedWith: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Trans"],
        required: true
    },
    bloodGroup: {
        type: String,
        required: true 
    },
    hospital: {
        type: mongoose.Schema.Tyoes.ObjectId,
        ref: 'Hospital'
    }
},{timestamps: true});

export const Patient = mongoose.model('Patient', patientSchema)