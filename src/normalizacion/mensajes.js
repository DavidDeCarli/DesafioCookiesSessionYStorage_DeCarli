import { normalize, schema, } from 'normalizr'

// Definimos un esquema de autor
//const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de mensaje
//const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

// Definimos un esquema de posts
//const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

//const schemaMensajes = new schema.Entity('mensajes', {}, { idAttribute: '_id' })

const schemaMensajes = new schema.Entity('mensajes')

const normalizarMensajes = (mensajesConId) => {
    const data = { id: 'mensajes', mensajes: [mensajesConId], idAttribute: '_id' }
    return normalize(data, schemaMensajes)
}

export { normalizarMensajes }
