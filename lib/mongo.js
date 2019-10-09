const { MongoClient, ObjectId } = require("mongodb")
const { config } = require('../config')

// const DB_USER = encodeURIComponent(config.dbUser)
// const DB_PASSWORD = encodeURIComponent(config.dbPassword)
// const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`
const MONGO_URI = `mongodb://${config.dbHost}`
const MONGO_DB_NAME = config.dbName

class MongoLib {
    
    connect(){
        return new Promise((resolve, reject) => {
            MongoClient.connect(
                MONGO_URI, 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, 
                (err, client) => {
                    if (err) {
                        reject(err)
                    }
                    this.cli = client
                    resolve(this.cli.db(MONGO_DB_NAME))
                }
            )
        })
    }

    getAll(collection, filters) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(filters)
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
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .insertOne(data)
            })
            .then(result => {
                this.cli.close()
                return result.insertedId
            })
            .then((result) => `Inserted: ${result}`)
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