//import mensajesApi from '../../api/mensajes';
//import { normalizarMensajes } from '../../normalizacion/index';

import mensajesApi from './../../api/mensajes.js';
import { normalizarMensajes } from './../../normalizacion/index.js';

export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));

    socket.on('nuevoMensaje', async mensaje => {
        const nuevoMensaje = {
            email: mensaje.author.email,
            mensaje: mensaje.text,
        }

        await mensajesApi.guardar(nuevoMensaje)
        sockets.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));
    })
};