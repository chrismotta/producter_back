const MysqlLib = require("../lib/mysql")

class OrdersService {
    constructor(){
        this.table = "datos_nuevos"
        this.mysql = new MysqlLib()
    }

    async getOrders({  }){
        const query = "LIMIT 10"
        const orders = await this.mysql.getAll(this.table, query)
        return orders || []
    }
}

module.exports = OrdersService