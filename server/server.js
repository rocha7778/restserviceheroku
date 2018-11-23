const express = require('express')
const app = express()
const config = require('./config/config')
const path = require('path')

const mongoose = require('mongoose')

// configuracion global de rutas
app.use(require('./routes/index'))
app.use(express.static(path.resolve(__dirname, '../public')))

mongoose.connect(config.urlBd, (err, resp) => {
  if (err) {
    console.log('Se presento un error al conectarse a mongo' + err)
    return 1
  }

  console.log(`Conexion exitosa `)
}).catch((err) => {
  console.log(err)
})

app.listen(config.port, () => {
  console.log(`escuchando en el puerto ${config.port}`)
})
