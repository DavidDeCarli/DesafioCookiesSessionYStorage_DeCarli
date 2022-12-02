import mongoose from 'mongoose';

class MongoContainer {
	constructor(modelName, scheme) {
		this.model = mongoose.model(modelName, scheme);
	}

	static async disconnect() {
		await mongoose.disconnect();
	}

	async getAll(filter = {}) {
		const documents = await this.model.find(filter);
		return documents;
	}

	async getById(id) {
		const document = await this.model.findOne({ _id: id }, { __v: 0 });

		if (!document) {
			const message = `Resource with id ${id} does not exist in our records`;
			throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
		}

		return document;
	}

	async save(item) {
		const newDocument = new this.model(item);
		return await newDocument.save();
	}

	async update(id, item) {
		const updatedDocument = await this.model.updateOne(
			{ _id: id },
			{ $set: { ...item } }
		);

		if (!updatedDocument.matchedCount) {
			const message = `Resource with id ${id} does not exist in our records`;
            console.log(message);
		}

		return updatedDocument;
	}

	async delete(id) {
		return await this.model.deleteOne({ _id: id });
	}
}

export default MongoContainer;