'use strict'

const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const validarToken = require('../middlewaare/verifyToken')
const validarFolderPermmitidos = require('../../fileUpload/validarFolderPermitidos')
const validarExtensionesPermitidas = require('../../fileUpload/validarExtensionArchivosPermitidas')
const userService = require('../userService/userService')
const fileService = require('../../fileUpload/gestionarArchivos')
const productService = require('../productService/productService')


const fs = require('fs')
const path = require('path')

// default options
app.use(fileUpload())

app.post('/upload/:tipo/:id', validarToken, async(req, res) => {
    let tipo = req.params.tipo
    let idConsultado = req.params.id

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se ha seleccionando ningun archivo'
        })
    }

    let file = req.files.file
    let extencionArchivo = file.name.split('.')[1]

    if (!validarExtensionesPermitidas(extencionArchivo)) {
        return res.status(400).json({
            ok: false,
            message: 'Extension invalida'
        })
    }

    if (!validarFolderPermmitidos(tipo)) {
        return res.status(400).json({
            ok: false,
            message: 'Destino invalido'
        })
    }

    if (tipo === 'usuarios') {


        let usuarioEncontrado = await userService.findUserById(idConsultado);



        if (!usuarioEncontrado.ok) {

            return res.status(400).json({
                ok: false,
                message: usuarioEncontrado.message
            })


        }


        let pathImageAnterior = path.resolve(__dirname, `../../fileUpload/${ tipo }/${ usuarioEncontrado.usuario.img }`);


        if (fs.existsSync(pathImageAnterior)) {
            fs.unlinkSync(pathImageAnterior)
        }


        let nombreArchivo = usuarioEncontrado.usuario._id + new Date().getMilliseconds() + file.name;

        let contenidoActualizar = {
            img: nombreArchivo
        }


        let usuarioActualizado = await userService.updateUserById(idConsultado, contenidoActualizar).catch(err => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: err
                })
            }


        })





        if (!usuarioActualizado.ok) {

            return res.status(400).json({
                ok: false,
                message: usuarioActualizado.message
            })

        }




        fileService.saveFile(file, tipo, nombreArchivo).catch(err => {
            console.log('============' + JSON.stringify(err));
        })


        return res.json({
            ok: true,
            message: 'Imagen actualizada exitosamente',
            usuarioActualizado

        })



    } else {

        if (tipo === 'productos') {


            let productoEncontrado = await productService.findProductById(idConsultado);



            if (!productoEncontrado.ok) {

                return res.status(400).json({
                    ok: false,
                    message: productoEncontrado.message
                })


            }


            let pathImageAnterior = path.resolve(__dirname, `../../fileUpload/${ tipo }/${ productoEncontrado.producto.img }`);

            fileService.deleteFile(pathImageAnterior)


            let nombreArchivo = productoEncontrado.producto._id + new Date().getMilliseconds() + file.name;

            let contenidoActualizar = {
                img: nombreArchivo
            }


            let productoActualizado = await productService.updateProductoById(idConsultado, contenidoActualizar).catch(err => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: err
                    })
                }


            })





            if (!productoActualizado.ok) {

                return res.status(400).json({
                    ok: false,
                    message: productoActualizado.message
                })

            }




            fileService.saveFile(file, tipo, nombreArchivo).catch(err => {
                console.log('============' + JSON.stringify(err));
            })


            return res.json({
                ok: true,
                message: 'Imagen actualizada exitosamente',
                productoActualizado

            })



        }


    }










})



module.exports = app