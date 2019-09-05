const mysql = require("mysql")
const { promisify } = require('util')
const chalk = require("chalk")
const { config } = require('../config')

class MysqlLib {

    constructor() {

        this.pool = mysql.createPool({
            host: config.mysqlHost,
            user: config.mysqlUser,
            password: config.mysqlPassword,
            database: config.mysqlDbName
        })

        this.pool.getConnection((err, connection) => {
            if(err) {
                console.log(chalk.red(err.message))
            }
            if(connection) connection.release()
            console.log('Conected to MySql')
            return
        })

        this.pool.query = promisify(this.pool.query)
    }

    async getAll(from, options={}) {
        let qSelect = options.select ? options.select : "*";
        let qWhere = options.where ? `WHERE ${options.where}` : "";
        let qOrder = options.order ? `ORDER BY ${options.order}` : "";
        let qLimit = options.limit ? `LIMIT ${options.limit}` : "";
        let query = `SELECT ${qSelect} FROM ${from} ${qWhere} ${qOrder} ${qLimit}`
        let rows = await this.pool.query(query)
        if(rows){
            return rows
        }
        return []
    }
}

module.exports = MysqlLib
