const express = require('express')
const app = express();
const Categoria = require('../models/categoria')
const validarToken = require('../middlewaare/verifyToken')




app.get('/categorias', validarToken, (req, res) => {


    let desde = parseInt(req.query.desde || 0)
    let hasta = parseInt(req.query.hasta || 5)


    Categoria.find({}).populate('usuario', 'nombre email ').skip(desde).limit(hasta).exec((err, categorias) => {

        return res.json({

            ok: true,
            categorias: categorias

        })
    })
})


app.get('/categorias/:id', validarToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id).populate('usuario', 'nombre email ').exec((err, categoriaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                message: 'Categoria no existe'

            })
        }

        return res.json({
            ok: true,
            categoriaDB

        })
    })
})

app.post('/categoria', validarToken, (req, res) => {

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id

    })

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                err
            })

        }

        res.json({
            ok: true,
            categoriaDB
        })
    })
})

app.put('/categoria/:id', (req, res) => {

    let id = req.params.id

    let categoria = {
        descripcion: req.body.descripcion
    }

    Categoria.findByIdAndUpdate(id, categoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err

            })
        }

        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                message: 'Categoria no existe'
            })
        }

        res.json({
            ok: true,
            message: 'Categoria actualizada exitosamente',
            categoriaDB

        })

    })







})















module.exports = app;