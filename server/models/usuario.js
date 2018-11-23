const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido'
}

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
    enum: rolesValidos,
    required: [true, 'El rol es obligatorio']
  },

  estado: {
    type: Boolean,
    default: true
  },

  google: {
    type: Boolean,
    default: false

  }

})

usuario.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  delete userObject.pass

  return userObject
}

usuario.plugin(uniqueValidator, { message: '{PATH} Debe de ser unico' })

module.exports = mongoose.model('Usuario', usuario)
