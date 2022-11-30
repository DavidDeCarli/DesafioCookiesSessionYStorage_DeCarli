import config from '../config.js'

import ContenedorArchivo from '../contenedores/ContenedorArchivo.js'

import ChatMongo from './../contenedores/mongo/chat'

// const ChatMongo = require('./../contenedores/mongo/chat');

//const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)

const mensajesApi = new ChatMongo();

// module.exports = mensajesApi;

export default mensajesApi;