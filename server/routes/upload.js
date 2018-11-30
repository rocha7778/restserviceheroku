'use strict'

const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const validarToken = require('../middlewaare/verifyToken')
const validarFolderPermmitidos = require('../../fileUpload/validarFolderPermitidos')
const validarExtensionesPermitidas = require('../../fileUpload/validarExtensionArchivosPermitidas')
const saveFile = require('../../fileUpload/saveFile')

// default options
app.use(fileUpload())

app.post('/upload/:tipo/:id', validarToken, async (req, res) => {
  let tipo = req.params.tipo
  let id = req.params.id

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

  let responseSaveFile = saveFile(file, tipo)

  res.json({
    responseSaveFile
  })
})

module.exports = app
