const express = require("express")
const User =  require('../models/user')

const router = express.Router()

// Create a new user
router.post('/users', async(req , res) =>{
    try{
            const user = new User(req.body)
             await user.save()
             res.status(201).send(user)
             
    }catch(e){
        res.status(400).send(e)
    }

})

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})
// Get a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})

// delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send({ error: "User not found" })
        }

        res.send({ message: "User deleted successfully", user })
    } catch (e) {
        res.status(500).send(e)
    }
})


// delete all users
router.delete('/users', async (req, res) => {
    try {
        await User.deleteMany()
        res.send({ message: "All users deleted successfully" })
    } catch (e) {
        res.status(500).send(e)
    }
})


// Update a user by ID
router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!user) {
            return res.status(404).send({ error: "User not found" })
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
