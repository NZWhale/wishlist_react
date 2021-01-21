// import {existsSync, readFile, mkdirSync, writeFileSync,fs. , writeFile} from 'fs'
// import express from 'express'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import path from 'path'

const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');
const app = express()
const port = 3001
const dataPath = "./data"
const usersFilePath = "./data/users.json"

app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve() + '/'))
app.use(bodyParser.json())

// This handler for getting all friends
app.get('/getfriends', (req, res) => {
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        res.send(users)
    } else {
        res.status(404)
    }
})

//---------------------------------------------------

// This are handlers for getting and sending wishes to DB
app.post('/addwish', (req, res) => {
    const newWish = req.body.wish
    const user = req.body.user.loggedInUser
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        users.forEach(u => {
            if (u.username === user) {
                u.wishes.push(newWish)
            }
        })
        const data = JSON.stringify(users)
        fs.writeFile('data/DB.json', data, (err) => {
            if (err) throw err
            console.log('The file has been saved!')
        })
    } else {
        fs.mkdirSync("data")
        fs.writeFile('data/DB.json', [])
    }
})
// ------------------------------------------------


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})