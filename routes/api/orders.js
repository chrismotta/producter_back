const express = require("express")
const passport = require("passport")
const router = express.Router()
const OrdersService = require("../../services/orders")

require("../../utils/auth/strategies/jwt")

const ordersService = new OrdersService()

// List
router.get(
    '/', 
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        const { date } = req.query
        // console.log('req', req)

        try {
            const orders = await ordersService.getOrders({date})
        
            res.status(200).json({
                data: orders,
                message: "Orders Listed"
            })
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router