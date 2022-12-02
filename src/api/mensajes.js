import config from '../config.js'

//import ContenedorArchivo from '../contenedores/ContenedorArchivo.js'

import ChatMongo from './../contenedores/mongo/chat.js';

const mensajesApi = new ChatMongo(config.mongoRemote.cnxStr);

export default mensajesApi;