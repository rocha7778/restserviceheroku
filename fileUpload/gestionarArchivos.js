'use stric'

const fs = require('fs')

module.exports = {

    saveFile: async(file, tipo, nombreArchivo) => {

        file.mv(`fileUpload/${tipo}/${nombreArchivo}`, (err) => {

            if (err) {
                console.log('ERROR AL GUARDAR EL ARCHIVO');

            }

            console.log(' ARCHIVO GUARDADO EXITOSAMENTE');
        })

    },

    deleteFile: async(filePath) => {

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }

    }

}