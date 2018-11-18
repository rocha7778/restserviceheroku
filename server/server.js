const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config/config')

const mongoose = require('mongoose');

app.use(require('./routes/usuario'))




mongoose.connect('mongodb://localhost:27017/cafe', (err, resp) => {

    if (err) {

        console.log('Se presento un error al conectarse a mongo' + err);
        return 1;
    }

    console.log(`Conexion exitosa `);
}).catch((err) => {
    console.log(err);
})


app.listen(config.port, () => {
    console.log(`escuchando en el puerto ${config.port}`);
})