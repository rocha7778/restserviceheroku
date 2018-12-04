let validarExtensionPermitidas = (extencionArchivo) => {
    extencionArchivo = extencionArchivo.toLowerCase()
    let extencionesPermitidas = ['jpg', 'giff', 'jpeg', 'png']

    if (extencionesPermitidas.indexOf(extencionArchivo) < 0) {
        return false
    }

    return true
}

module.exports = validarExtensionPermitidas