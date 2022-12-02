import config from '../config.js'

//import ContenedorArchivo from '../contenedores/ContenedorArchivo.js'

import ProductosMongo from './../contenedores/mongo/productos.js';

const productosApi = new ProductosMongo(config.mongoRemote.cnxStr);

export default productosApi