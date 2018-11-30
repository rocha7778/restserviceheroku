let validarFolderPermitidoss = (nombreFolderDestino) => {
  let nombreFolderHabilidatos = ['productos', 'usuarios']
  if (nombreFolderHabilidatos.indexOf(nombreFolderDestino) < 0) {
    return false
  }
  return true
}

module.exports = validarFolderPermitidoss
