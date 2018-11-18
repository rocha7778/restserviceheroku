const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let usuario = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requierido'],
        unique: [true, 'Este email ya se encuentra en uso']
    },

    pass: {
        type: String,
        required: [true, 'La constraseña es requerida']
    },

    img: {
        type: String,
        required: false
    },

    role: {
        type: String,
        default: 'USER_ROLE',
        required: [true, 'El rol es obligatorio']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false

    },

})


module.exports = mongoose.model('Usuario', usuario)