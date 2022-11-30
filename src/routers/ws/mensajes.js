const mensajesApi = require('../../api/mensajes');

const { normalizarMensajes } = require('../../normalizacion/index');

module.exports = async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        sockets.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));
    })
};