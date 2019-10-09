const MongoLib = require("../lib/mongo")

class OrdersService {
    constructor(){
        this.collection = "orders"
        this.mongoDB = new MongoLib()
    }

    async getOrders({date}){
        let fromDate = new Date(`${date} 00:00:00`)
        let toDate = new Date(`${date} 00:00:00`)
        toDate.setDate(toDate.getDate()+1)
        console.log(`From: ${fromDate} - To: ${toDate}`)
        const filters = {deliveryDate: {$gte: fromDate, $lte: toDate}}
        const orders = await this.mongoDB.getAll(this.collection, filters)
        return orders || []
    }

}

module.exports = OrdersService