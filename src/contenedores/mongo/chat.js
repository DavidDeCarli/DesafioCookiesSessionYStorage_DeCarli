const { Schema } = require('mongoose');
const MongoContainer = require("./../MongoContainer");

const collection = 'chats';

const chatSchema = new Schema({
    email: { type: String, require: true },
    hora: { type: Date, required: true, default: Date.now() },
    mensaje: { type: String, require: true }
});

class ChatMongo extends MongoContainer {
	constructor() {
		super(collection, chatSchema);
	}

	async listarAll() {
		return await this.getAll();
	}

	async listar(id) {
		return await this.getById(id);
	}

	async guardar(item) {
		return await this.save(item);
	}

	async actualizar(id, item) {
		return await this.update(id, item);
	}

	async borrar(id) {
		return await this.delete(id);
	}
}

module.exports = ChatMongo;
