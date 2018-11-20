// puerto
const port = process.env.PORT || 3200

// entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// base de datos

let urlBd = '';

if (process.env.NODE_ENV == 'dev') {

    urlBd = 'mongodb://localhost:27017/cafe';

} else {
    urlBd = process.env.MONGO_URI;
}

process.env.EXPIRACION_TOKEN = 60 * 60 * 24 * 30;
process.env.SEDD_TOKEN = process.env.SEDD_TOKEN || 'este-es-e-seed-desarrollo'

exports.port = port;
exports.urlBd = urlBd;