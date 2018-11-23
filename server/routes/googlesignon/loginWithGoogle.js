const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const Usuario = require('../usuario')

app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.post('/goole', async (req, res) => {
  let token = req.body.idtoken

  let userGoogle = await verify(token).catch(err => {
    return res.status(403).json({

      ok: false,
      erroor: err,
      message: 'no tiene acceso al recurso'

    })
  })

  Usuario.findOne({ email: userGoogle.email }, (err, usuarioBD) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: err
      })
    }

    if (!usuarioBD) {
      let usuario = new Usuario({

        nombre: userGoogle.nombre,
        email: userGoogle.email,
        pass: bcrypt.hashSync('123456', 10)

      })
    } else {
      return res.json({
        user: userGoogle
      })
    }
  })
})

module.exports = app
