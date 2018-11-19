const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Usuario = require('../models/usuario')
const _ = require('underscore')
const bcrypt = require('bcryptjs');


app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())



app.get('/usuarios', function(req, res) {

    let desde = parseInt(req.query.desde || 0);
    let hasta = parseInt(req.query.hasta || 5);



    Usuario.find({ estado: true }).skip(desde).limit(hasta).exec((err, usuarios) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                message: err
            })
        }

        console.log(usuarios);

        res.json({
            operation: 'get',
            ok: true,
            url: req.originalUrl,
            usuarios: usuarios,
            totalRow: usuarios.length
        })


    })






})


app.post('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;



    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        pass: bcrypt.hashSync(body.pass, 10),
        role: body.role


    })

    usuario.save((err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                message: err
            })
        }


        res.json({
            operation: 'post',
            ok: true,
            url: req.originalUrl,
            usuario: usuarioDB
        })


    })




})


app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);




    Usuario.findOneAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {


        if (err) {

            return res.status(400).json({
                ok: false,
                message: err
            })
        }



        res.json({
            operation: 'put',
            id: id,
            url: req.originalUrl,
            usuario: usuarioDB
        })


    });


})


app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;





    Usuario.findOneAndUpdate(id, { estado: false }, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {


        if (err) {

            return res.status(400).json({
                ok: false,
                message: err
            })
        }



        res.json({
            operation: 'delete',
            id: id,
            url: req.originalUrl,
            usuario: usuarioDB
        })


    });



})

module.exports = app;