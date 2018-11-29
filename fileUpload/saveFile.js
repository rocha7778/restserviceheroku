let saveFile = (file, tipo) => {

    let response = {
        ok: true,
        message: 'El archivo fue guardado exitosamente'
    }
    file.mv(`fileUpload/${tipo}/ ${new Date().getMilliseconds()}${file.name}`, function(err) {

        if (err) {
            response.err = erro
            response.ok = false
            return response
        }

        return response
    });


}

module.exports = saveFile