const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: '_id' });

// Definimos un esquema de mensaje
//const schemaMensaje = new normalizr.schema.Entity('post', { email: schemaAuthor }, { idAttribute: '_id' })
const schemaMensaje = new normalizr.schema.Entity('post', {}, { idAttribute: 'email' })

// Definimos un esquema de posts
//const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })
const schemaMensajes = new normalizr.schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: '_id' })
/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: inputMensaje.value
    }

    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', (mensajesN) => {
    const mensajesNsize = JSON.stringify(mensajesN.entities.mensajes.mensajes.mensajes).length //JSON.stringify(mensajesN).length
    //console.log(mensajesN, mensajesNsize);

    const mensajesD = normalizr.denormalize(mensajesN.result, schemaMensajes, mensajesN.entities)

    const mensajesDsize = JSON.stringify(mensajesD).length
    //console.log(mensajesD, mensajesDsize);

    const porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
    //console.log(`Porcentaje de compresión ${porcentajeC}%`)
    document.getElementById('compresion-info').innerText = porcentajeC

    //console.log(mensajesD.mensajes);
    const html = makeHtmlList(mensajesD.mensajes[0])
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    let finalStr = '';

    for (let clave in mensajes){
        const mensaje = mensajes[clave];

        finalStr += `
            <div>
                <b style="color:blue;">${mensaje.email}</b>
                [<span style="color:brown;">${mensaje.hora}</span>] :
                <i style="color:green;">${mensaje.mensaje}</i>
            </div>
        `;
    }

    return finalStr;
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
