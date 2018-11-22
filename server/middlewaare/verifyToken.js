//validar token

const jwt = require('jsonwebtoken')

let validarToken = (req, res, next) => {


    let token = req.get('token');



    jwt.verify(token, process.env.SEDD_TOKEN, (err, decode) => {

        if (err) {

            return res.status(401).json({

                operation: req.operation,
                ok: false,
                err: err
            });
        }

        req.usuario = decode.data.UsuarioDB;
        next();




    })






}

module.exports = validarToken;