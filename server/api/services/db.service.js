const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const MONGODB_NAME = process.env.MONGODB_NAME
const MONGODB_URI = process.env.MONGODB_URI

class Database {
    constructor() {
        this.client = new MongoClient(MONGODB_URI, { useNewUrlParser: true })
    }

    getDataFiltered(query, collectionName) {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) reject(err)
                const collection = this.client.db(MONGODB_NAME).collection(collectionName)
                collection.find(query).toArray((err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
        })
    }

    getDeviceTokens(usernames, collectionName) {
        var query = { _id: {"$in" : usernames} }
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) reject(err)
                const collection = this.client.db(MONGODB_NAME).collection(collectionName)
                collection.find(query).toArray((err, result) => {
                    if (err) reject(err)
                    var deviceTokens = []
                    for (let index = 0; index < result.length; index++) {
                        const user = result[index]
                        deviceTokens.push(user.deviceToken)
                    }
                    resolve(deviceTokens)
                })
            })
        })
    }

    getCollection(collectionName) {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) reject(err)
                const collection = this.client.db(MONGODB_NAME).collection(collectionName)
                collection.find({}).toArray((err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
        })
    }

    getData(_id, collectionName) {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) reject(err)
                var query = { _id: _id }
                const collection = this.client.db(MONGODB_NAME).collection(collectionName)
                collection.find(query).toArray((err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
        })
    }

    update(_id, obj, collectionName) {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) reject(err)
                var filter = { _id: _id }
                const collection = this.client.db(MONGODB_NAME).collection(collectionName)
                collection.update(filter, {$set: obj}, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
        })
    }

    insert(obj, collectionName) {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) reject(err)
                const collection = this.client.db(MONGODB_NAME).collection(collectionName)
                collection.insertOne(obj, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
        })
    }

    delete(_id, collectionName, filter = undefined) {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) reject(err)
                if (filter == undefined)
                    filter = { _id: _id }
                const collection = this.client.db(MONGODB_NAME).collection(collectionName)
                collection.deleteOne(filter, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })
        })
    }

}

export default new Database()
