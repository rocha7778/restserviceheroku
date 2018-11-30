const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/usuario')
const verificarToken = require('./veriFyToken')




app.post('/google', async(req, res) => {

    let token = req.body.idtoken;



    let googleUser = await verificarToken(token).catch(err => {

        return res.status(403).json({
            ok: false,
            err: err,
            message: 'Token invalido'
        })


    })

    Usuario.findOne({
        email: googleUser.email
    }, (err, usuarioBD) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };


        if (usuarioBD) {

            // no es un usuario google
            if (usuarioBD.google === false) {

                return res.status(400).json({
                    ok: false,
                    message: 'Debe ingresar con usuario y contraseña asignados'
                })

            } else {

                // se crea token

                let token = jwt.sign({

                    data: {
                        usuarioBD
                    }
                }, process.env.SEDD_TOKEN, {
                    expiresIn: process.env.EXPIRACION_TOKEN
                })


                return res.json({
                    ok: true,
                    url: req.originalUrl,
                    usuario: usuarioBD,
                    token: token
                })

            }



        } else {

            // el usuairo no existe en la base de datos


            let usuario = new Usuario({
                nombre: googleUser.nombre,
                email: googleUser.email,
                img: googleUser.img,
                google: googleUser.google,
                pass: ':)'

            })

            let token = jwt.sign({

                data: {
                    usuarioBD
                }
            }, process.env.SEDD_TOKEN, {
                expiresIn: process.env.EXPIRACION_TOKEN
            })

            usuario.save(usuario, (err, usuarioBD) => {


                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                };


                return res.json({
                    ok: true,
                    usuarioBD: usuarioBD,
                    message: 'Usuario creado exitosamente',
                    token


                })


            })
        }





    })














})


module.exports = app