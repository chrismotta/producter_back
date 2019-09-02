const usersMocks = require("../utils/mocks/users")
const MongoLib = require("../lib/mongo")

class UsersService {
    constructor(){
        this.collection = "users"
        this.mongoDB = new MongoLib()
    }

    async getUsers({ role }){
        const query = role && { role: { $in: role } }
        const users = await this.mongoDB.getAll(this.collection, query)
        return users || []
    }

    async getUser({ userId }){
        const user = await this.mongoDB.get(this.collection, userId)
        return user || {}
    }

    async createUser({ user }){
        const userIdCreated = await this.mongoDB.create(this.collection, user)
        return userIdCreated
    }

    async updateUser({ userId, user }){
        const userIdUpdated = await this.mongoDB.update(this.collection, userId, user)
        return userIdUpdated
    }

    async deleteUser({ userId }){
        const userIdDeleted = await this.mongoDB.delete(this.collection, userId)
        return userIdDeleted
    }
}

module.exports = UsersService