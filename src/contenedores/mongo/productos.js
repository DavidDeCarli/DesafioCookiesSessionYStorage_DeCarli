import { Schema } from 'mongoose';
import MongoContainer from './../MongoContainer.js';

const collection = 'products';

const productoSchema = new Schema({
    title: { type: String, require: true },
    price: { type: String, required: true },
    thumbnail: { type: String, require: true },
});

class ProductosMongo extends MongoContainer {
	constructor() {
		super(collection, productoSchema);
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

export default ProductosMongo;
