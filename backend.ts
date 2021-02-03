const nanoid = require('nanoid')
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("secret_api_key");
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

app.use(cors({ origin: true, credentials: true }))
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
            if (u.id === user.id) {
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


app.post('/findfriends', (req, res) => {
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        const searchedUsers = users.filter((user) => user.username === req.body.username)
        res.send(JSON.stringify(searchedUsers))
    } else {
        res.status(404)
    }
})

//----------------------------------------------------------------




//Private Methods
app.post('/registration', (req, res) => {
    const user = req.body
    if (fs.existsSync(dataPath)) {
        if (fs.existsSync(usersFilePath)) {
            const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"))
            const publicDatabase = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
            const userFound = users.find(singleUser => singleUser.id === user.id || singleUser.email === user.email)
            if (userFound) {
                console.log("user already exist")
                res.status(404).send("user already exist")
            } else {
                user.password = nanoid.nanoid(8)
                sendAccountDetails(user.email, user.username, user.password)
                users.push(user)
                publicDatabase.push({
                    "id": user.id,
                    "image": null,
                    "username": user.username,
                    "dayOfBirth": "",
                    "wishes": []
                })
                fs.writeFile('data/DB.json', JSON.stringify(publicDatabase), (err) => {
                    if (err) throw err
                    console.log("user added to public DB")
                })
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

const generateAuthToken = () => {
    const tokenLength = 16
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < tokenLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

let authorisedUsers = {}

const findUserByLogin = (userLogin) => {
    const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"))
    return users.find(({ email }) => email === userLogin)
}

app.post('/login', (req, res) => {
    const user = req.body;
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath)
    }
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, "[]")
    }
    const userFound = findUserByLogin(user.email)
    if (userFound && userFound.password === user.password) {
        const userData = {
            "username": userFound.username,
            "id": userFound.id
        }
        console.log("login successful")
        const cookieAge = 24 * 60 * 60 * 1000
        const authToken = generateAuthToken()
        authorisedUsers[authToken] = userFound.login
        res.cookie('auth-token', authToken, { domain: 'http://localhost:3000', maxAge: cookieAge, httpOnly: false })
        //TODO: fix cookie setting
        res.status(200).send(userData)
    } else {
        console.log("user not found")
        res.status(401).send("user not found")
    }
})


function sendAccountDetails(email, username, pass) {
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
        text: `Dear ${username}, you have registered in the Doobki's Wish List. Your login is "${email}", your password is "${pass}". Don't lose them`
    };

    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    })
}


// Handler for image searching


// app.post('/login', (req, res) => {
// const params = {
//   engine: "google",
//   ijn: "0",
//   q: req.searchParam,
//   google_domain: "google.com",
//   tbm: "isch"
// };

// const callback = function(data) {
//   console.log(data);
// };

// // Show result as JSON
// search.json(params, callback);

// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})