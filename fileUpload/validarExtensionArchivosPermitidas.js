let validarExtensionPermitidas = (extencionArchivo) => {
  let extencionesPermitidas = ['jpg', 'giff', 'jpeg']

  if (extencionesPermitidas.indexOf(extencionArchivo) < 0) {
    return false
  }

  return true
}

module.exports = validarExtensionPermitidas
