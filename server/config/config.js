// puerto
const port = process.env.PORT || 3200

// entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// base de datos

let urlBd = ''

if (process.env.NODE_ENV === 'dev') {
  urlBd = 'mongodb://localhost:27017/cafe'
} else {
  urlBd = process.env.MONGO_URI
}

process.env.EXPIRACION_TOKEN = 60 * 60 * 24 * 30
process.env.SEDD_TOKEN = process.env.SEDD_TOKEN || 'este-es-e-seed-desarrollo'

//= ==========================
// configuracion google sign in
//= ==========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '472314062897-js7h1hpvlbq3l1emudgdks4o4vl16j0d.apps.googleusercontent.com'

exports.port = port
exports.urlBd = urlBd
