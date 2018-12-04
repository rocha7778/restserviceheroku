'use stric'

const Producto = require('../models/producto')


module.exports = {

    findProductById: async(idProducto) => {

        const productoEncontrado = await Producto.findById(idProducto, (err, productoBD) => {


            if (err) {

                return {
                    ok: false,
                    message: err
                };

            }

            if (!productoBD) {
                return {
                    ok: false,
                    message: 'producto no existe'
                };
            }

            return {
                ok: true,
                usuario: productoBD
            }
        })


        return {
            ok: true,
            producto: productoEncontrado

        }


    },

    updateProductoById: async(idProducto, productoInfo) => {


        let productoActualizado = await Producto.findByIdAndUpdate(idProducto, productoInfo, { new: true }, (err, productoBDActualizado) => {

            if (err) {
                return {
                    ok: false,
                    message: err
                };
            }


            if (!productoBDActualizado) {
                return {
                    ok: false,
                    message: 'producto no existe'
                };
            }


            return {
                ok: true,
                productoBDActualizado,
                message: 'Producto actualizado exitosamente'
            }




        })

        return {
            ok: true,
            productoActualizado
        }

    }


}