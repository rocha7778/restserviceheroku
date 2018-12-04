'use stric'
const Usuario = require('../models/usuario')


module.exports = {

    findUserById: async(idUsuario) => {
        const usuario = await Usuario.findById(idUsuario, (err, usuarioEncontrado) => {

            if (err) {
                return {
                    ok: false,
                    message: err,
                    findById: 'Error buscando al usaurio'
                };
            }

            if (!usuarioEncontrado) {
                return {
                    ok: false,
                    message: 'usuario no existe',
                    findById: 'Error buscando al usaurio'
                };
            }

            return {
                ok: true,
                usuario: usuarioEncontrado
            }


        })

        return {
            ok: true,
            usuario
        };

    },

    updateUserById: async(idUser, userInfo) => {


        let usuarioActualizado = await Usuario.findByIdAndUpdate(idUser, userInfo, {
            new: true
        }, (err, usuarioActualizado) => {

            if (err) {
                return {
                    ok: false,
                    message: err
                };
            }

            if (!usuarioActualizado) {
                return {
                    ok: false,
                    message: 'usuario no existe'
                };
            }


            return {
                ok: true,
                usuarioActualizado,
                message: 'Usuario actualizado exitosamente'
            }



        })

        return {
            ok: true,
            usuarioActualizado
        };


    }

}