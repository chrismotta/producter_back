const { MongoClient, ObjectId } = require("mongodb")
const { config } = require('../config')

const DB_USER = encodeURIComponent(config.dbUser)
const DB_PASSWORD = encodeURIComponent(config.dbPassword)
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        console.log("MONGO_URI", MONGO_URI)
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true }),
        this.dbName = config.dbName
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(error => {
                if(error) {
                    reject(error)
                } else {
                    console.log("Connected to mongo")
                    resolve(this.client.db(this.dbName))
                }
            })
        })
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(query)
                .toArray()
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .findOne({_id: ObjectId(id)})
        })
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .insertOne(data)
        })
        .then(result => result.insertedId)
    }

    update(collection, id, data) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .updateOne({_id: ObjectId(id)}, {$set: data}, {upsert: true})
        })
        .then(result => result.upsertedId || true)
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .deleteOne({_id: ObjectId(id)})
        })
        .then(result => result.upsertedId || true)
    }
}

module.exports = MongoLib