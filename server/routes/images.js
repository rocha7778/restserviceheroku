const express = require('express')
const fs = require('fs')
const path = require('path')
const validarToken = require('../middlewaare/verifyToken')

const app = express()


app.get('/images/:tipo/:image', (req, res) => {


    let tipo = req.params.tipo
    let image = req.params.image




    let pathImage = path.resolve(__dirname, `../../fileUpload/${ tipo }/${ image }`);

    if (!fs.existsSync(pathImage)) {
        pathImage = path.resolve(__dirname, '../assets/no-image.jpg')
    }







    res.sendFile(pathImage)



})





module.exports = app;