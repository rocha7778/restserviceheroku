// puerto
const port = process.env.PORT || 3200

// entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// base de datos

let urlBd = '';

if (process.env.NODE_ENV == 'dev') {

    urlBd = 'mongodb://localhost:27017/cafe';

} else {
    urlBd = 'mongodb://rocha7778:bD6QdXt2PXbse4s@ds157571.mlab.com:57571/cafe';
}

exports.port = port;
exports.urlBd = urlBd;