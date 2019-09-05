const chalk = require("chalk")
const MysqlLib = require("../../lib/mysql")
const MongoLib = require("../../lib/mongo");

async function getRows(mysql, step, stepSize) {
    const limit = `${step * stepSize}, ${stepSize}`
    return await mysql.getAll("datos_nuevos", {limit})
}

async function countRows(mysql, step, stepSize) {
    const limit = `${step * stepSize}, ${stepSize}`
    return await mysql.getAll("datos_nuevos", {select: "count(*) AS rowsCount"})
}

async function createRows(mongoDB, data){
    return await mongoDB.create("orders", data)
}

async function migrateOrders(mongoDB, mysql, step, stepSize) {
    try {
        const rows = await getRows(mysql, step, stepSize);
        
        if (rows) {
            for (const row of rows) {
                // console.log(chalk.grey(`Migrating ${row.RazonSocial}`))
                let orderID = await createRows(mongoDB, {
                    extID: row.NroBoleta,
                    longName: row.RazonSocial,
                    address: row.carpinteria_tipo,
                    zone: row.localidad,
                    telephone: row.Telefono,
                    email: row.EMAIL,
                    entryDate: getIsoDate(row.FechaIng),
                    deliveryDate: getIsoDate(row.FechaEst),
                    caracteristics: [row.Caracteristicas],
                    description: [row.Descripcion],
                    commentsList: row.comboComent,
                    comments: [row.Comentario],
                    fabric: row.estructura_tipo,
                    status: row.Estado,
                    dataStatus: row.datosInc,
                    deliveryType: row.mentrega,
                    deliveryComment: [row.expreso],
                    paymentType: row.pago,
                });
                console.log(chalk.green(orderID))
            }

            return `Step ${step} done.`;
        }

        console.log(chalk.red("No anda"));
        return process.exit(1);

    } catch (error) {
        console.log(chalk.red(error));
        process.exit(1);
    }
}

function getIsoDate(date){
    date = date.split("/")
    date = new Date(date[2], date[1]-1, date[0])
    return date 
}

async function stepMigration(){
    const mysql = new MysqlLib()
    const mongoDB = new MongoLib()

    const result = await countRows(mysql)
    const {rowsCount} = result[0]
    
    // const step = 380
    const step = 0
    const stepSize = 100
    
    for(i=step; i*stepSize < rowsCount; i++) {
        const status = await migrateOrders(mongoDB, mysql, i, stepSize)
        console.log(chalk.blue(status))
    }
    
    console.log(chalk.blue(`Number of rows: ${rowsCount}.`))
    process.exit(0);
}

stepMigration();
