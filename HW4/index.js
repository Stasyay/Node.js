const express = require('express')
const fs = require('fs')
const path = require('path')
const { userSchema } = require('./validation/scheme')
const { checkBody } = require('./validation/validator')

const ShortUniqueId = require('short-unique-id')
const uid = new ShortUniqueId({ length: 10 });

const app = express()

const userDbPath = path.join(__dirname, 'users.json')

app.use(express.json())
app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDbPath))
    res.send({ users })
})

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDbPath))
    const findUser = users.find((user) => {
        return user.id === req.params.id
    })

    if (findUser) {
        res.send({ user: findUser })
    } else {
        res.status(404)
        res.send({ users: null })
    }
})

app.post('/users', checkBody(userSchema), (req, res) => {
    let uniqueID = uid.rnd()

    const users = JSON.parse(fs.readFileSync(userDbPath))

    users.push({
        id: uniqueID,
        ...req.body
    })

    fs.writeFileSync(userDbPath, JSON.stringify(users))
    res.send({ id: uniqueID })
})

app.put('/users/:id', checkBody(userSchema), (req, res) => {

    const users = JSON.parse(fs.readFileSync(userDbPath))
    const findUser = users.find((user) => {
        return user.id === req.params.id
    })

    if (findUser) {
        findUser.firstName = req.body.firstName
        findUser.secondNam = req.body.secondNam
        findUser.age = req.body.age
        findUser.sity = req.body.sity

        fs.writeFileSync(userDbPath, JSON.stringify(users))
        res.send({ user: findUser })
    } else {
        res.status(404)
        res.send({ users: null })
    }
})

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(userDbPath))
    const findUser = users.find((user) => {
        return user.id === req.params.id
    })

    if (findUser) {
        const findUserIndex = users.indexOf(findUser)
        users.splice(findUserIndex, 1)
        fs.writeFileSync(userDbPath, JSON.stringify(users))
        res.send({ id: req.params.id })
    } else {
        res.status(404)
        res.send({ users: null })
    }
})

app.use((req, res) => {
    res.status(404).send({ message: 'URL not found!' })
})

app.listen(3000)