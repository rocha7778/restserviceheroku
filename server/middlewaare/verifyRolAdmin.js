// validar token

let verifyRolAdmin = (req, res, next) => {
  let usuarioLogged = req.usuario
  if (usuarioLogged.role === 'ADMIN_ROLE') {
    next()
  } else {
    return res.status(401).json({
      ok: false,
      message: 'no es administrador'
    })
  }
}

module.exports = verifyRolAdmin
