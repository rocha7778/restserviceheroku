const express = require('express')
const app = express()
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')



app.post('/login', (req, res) => {



    let body = req.body;


    Usuario.findOne({
        email: body.email
    }, (err, UsuarioDB) => {



        if (err) {

            return res.status(500).json({
                ok: false,
                message: err
            })
        }


        if (!UsuarioDB) {

            return res.status(400).json({
                ok: false,
                message: 'Email  o contraseña incorrecta'
            })
        }

        if (body.email != UsuarioDB.email) {
            return res.status(400).json({
                ok: false,
                message: 'Email  o contraseña incorrecta '
            })

        }



        if (!bcrypt.compareSync(body.pass, UsuarioDB.pass)) {

            return res.status(400).json({
                ok: false,
                message: 'Contraseña  o email incorrecta '
            })

        }

        let token = jwt.sign({
            data: {
                UsuarioDB
            }
        }, process.env.SEDD_TOKEN, {
            expiresIn: process.env.EXPIRACION_TOKEN
        })


        res.json({
            operation: 'post',
            ok: true,
            url: req.originalUrl,
            usuario: UsuarioDB,
            token: token
        })


    })







})



module.exports = app;