const nanoid = require('nanoid')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');
const nodemailer = require('nodemailer')
const app = express()
const port = 3001
const dataPath = "./data"
const usersFilePath = "./data/users.json"
const user = "nodemailerwb@gmail.com"
const password = "RaFV95uk"

app.use(cors());
app.use(cookieParser())
app.use(express.static(path.resolve() + '/'))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))


// Public Methods

app.get('/getfriends', (req, res) => {
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        res.send(users)
    } else {
        res.status(404)
    }
})

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
            res.send(data)
        })
    } else {
        fs.mkdirSync("data")
        fs.writeFile('data/DB.json', [])
    }
})

app.post('/deletewish', (req, res) => {
    const wishId = req.body.id
    const user = req.body.user
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        users.forEach(u => {
            if (u.username === user) {
                u.wishes.forEach((wish, index) => {
                    if (wish.id === wishId) {
                        u.wishes.splice(index, 1)
                    }
                })
            }
        })
        const data = JSON.stringify(users)
        fs.writeFile('data/DB.json', data, (err) => {
            if (err) throw err
            console.log('The file has been deleted!')
            res.send(data)
        })
    } else {
        fs.mkdirSync("data")
        fs.writeFile('data/DB.json', [])
    }
})

//----------------------------------------------------------------

//Private Methods
app.post('/registration', (req, res) => {
    const user = req.body
    if (fs.existsSync(dataPath)) {
        if (fs.existsSync("data/users.json")) {
            const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"))
            const userFound = users.find(singleUser => singleUser.id === user.id || singleUser.email === user.email)
            if (userFound) {
                console.log("user already exist")
                res.status(404).send("user already exist")
            } else {
                user.password = nanoid.nanoid()
                sendAccountDetails(user.email, user.username, user.password)
                users.push(user)
                fs.writeFile('data/users.json', JSON.stringify(users), (err) => {
                    if (err) throw err
                    console.log("user successfully created")
                    res.status(200)
                })
            }
        }
    } else {
        fs.mkdirSync("data")
        fs.writeFile('data/users.json', user, (err) => {
            if (err) throw err
            console.log('The file has been saved!')
        })
    }
})

function sendAccountDetails(email, username, pass){
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: user,
            pass: password
        }
    });

    let mailDetails = {
        from: user,
        to: email,
        subject: "Doobki's Wish List",
        text: `Dear ${username}, you have registered in the Doobki's Wish List. 
        Your login is "${email}", your password is "${pass}". Don't lose them`
    };



    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    })
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})