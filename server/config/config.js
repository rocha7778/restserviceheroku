// puerto
const port = process.env.PORT || 3200

// entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// base de datos

let urlBd = '';

if (process.env.NODE_ENV == 'dev') {

    urlBd = 'mongodb://localhost:27017/cafe';

} else {
    urlBd = process.env.MOGO_URI;
}

exports.port = port;
exports.urlBd = urlBd;