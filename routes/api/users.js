const express = require("express")
const passport = require("passport")
const router = express.Router()
const UsersService = require("../../services/users")

require("../../utils/auth/strategies/jwt")

const usersService = new UsersService()

// List
router.get(
    '/', 
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
        const { role } = req.query
        // console.log('req', req)

        try {
            const users = await usersService.getUsers({ role })
        
            res.status(200).json({
                data: users ,
                message: "Products Listed"
            })
        } catch (err) {
            next(err)
        }
    }
)

// Retrive
router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params

    try {
        const user = await usersService.getUser({ userId })
        
        res.status(200).json({
            data: user,
            message: "Product Retrived"
        })
    } catch (err){
        next(err)
    }

})

// Create
router.post('/', async (req, res, next) => {
    const { body: user } = req;
    
    try {
        const createdUser = await usersService.createUser({ user })

        res.status(201).json({
            data: createdUser,
            message: "Product Created"
        })
    } catch (err){
        next(err)
    }
})

// Update
router.put('/:userId', async (req, res, next) => {
    const { userId } = req.params
    const { body: user } = req;    
    
    try {
        const updatedUser = await usersService.updateUser({ userId, user })
    
        res.status(200).json({
            data: updatedUser,
            message: "Product Updated"
        })
    } catch (err){
        next(err)
    }
})

// Delete
router.delete('/:userId', async (req, res, next) => {
    const { userId } = req.params
    
    try {
        const user = await usersService.deleteUser({ userId })
    
        res.status(200).json({
            data: user,
            message: "Product Deleted"
        })
    } catch (err){
        next(err)
    }
})


module.exports = router