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
const publicDbPath = "./data/DB.json"
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
        const searchedUsers = users.filter((user) => user.username.toLowerCase() === req.body.username.toLowerCase())
        res.send(JSON.stringify(searchedUsers))
    } else {
        res.status(404)
    }
})

app.post('/approve', (req, res) => {
    const { selected, loggedInUser } = req.body
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        users.forEach(user => {
            if (user.id === loggedInUser.id) {
                selected.forEach(e => {
                    user.friends.forEach(friend => {
                        if (friend.id === e) {
                            friend.status = "true"
                            // user.friends.push(friend)
                        }
                    })
                })
            }
            selected.forEach(e => {
                if(user.id === e){
                    user.friends.forEach(friend => {
                        if (friend.id === loggedInUser.id) {
                            friend.status = "true"
                        }
                    })
                }
            });
        })
        fs.writeFile('data/DB.json', JSON.stringify(users), (err) => {
            if (err) throw err
            console.log("approved")
        })
        res.send(JSON.stringify(users))
    } else {
        res.status(404)
    }
})

app.post('/decline', (req, res) => {
    const { selected, loggedInUser } = req.body
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        users.forEach(user => {
            if (user.id === loggedInUser.id) {
                selected.forEach(e => {
                    user.friends.forEach((friend, index) => {
                        if (friend.id === e) {
                            user.friends.splice(index, 1)
                        }
                    })
                })
            }
        })
        fs.writeFile('data/DB.json', JSON.stringify(users), (err) => {
            if (err) throw err
            console.log("declined")
        })
        res.send(JSON.stringify(users))
    } else {
        res.status(404)
    }
})

app.post('/deletefriend', (req, res) => {
    const { id, loggedInUser } = req.body
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        users.forEach(user => {
            if (user.id === loggedInUser.id) {
                user.friends.forEach((friend, index) => {
                    if (friend.id === id) {
                        user.friends.splice(index, 1)
                    }
                })
            }
            if (user.id === id) {
                user.friends.forEach((friend, index) => {
                    if (friend.id === loggedInUser.id) {
                        user.friends.splice(index, 1)
                    }
                })
            }
        })
        fs.writeFile('data/DB.json', JSON.stringify(users), (err) => {
            if (err) throw err
            console.log("friend deleted")
        })
        res.send(JSON.stringify(users))
    } else {
        res.status(404)
    }
})

app.post('/sendrequest', (req, res) => {
    if (fs.existsSync(dataPath)) {
        const users = JSON.parse(fs.readFileSync("data/DB.json", "utf-8"))
        users.forEach(u => {
            const isRequested = u.friends.filter(friend => friend.id === req.body.id)
            if(isRequested.length > 0){
                console.log("Already requested")
                res.status(404)
            }else{
            if (u.id === req.body.id) {
                u.friends.push({
                    "username": req.body.loggedInUser.username,
                    "id": req.body.loggedInUser.id,
                    "status": "required"
                })
                users.forEach(e => {
                    if(e.id === req.body.loggedInUser.id){
                        e.friends.push({
                            username: u.username,
                            id: u.id,
                            status: "pending"
                        })
                    }
                });
            }
        }
        });
        fs.writeFile('data/DB.json', JSON.stringify(users), (err) => {
            if (err) throw err
            console.log("request sended")
        })
        res.send(JSON.stringify(users))
    } else {
        res.status(404)
    }
})

//----------------------------------------------------------------




//Private Methods
app.post('/registration', (req, res) => {
    const user = req.body
    let users
    let publicDatabase
    if (fs.existsSync(dataPath)) {
        if (fs.existsSync(usersFilePath)) {
            users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"))
            publicDatabase = JSON.parse(fs.readFileSync(publicDbPath, "utf-8"))
            const userFound = users.find(singleUser => singleUser.id === user.id || singleUser.email.toLowerCase() === user.email.toLowerCase())
            if (userFound) {
                console.log("user already exist")
                res.status(404).send("user already exist")
            } else {
                user.password = nanoid.nanoid(8)
                sendAccountDetails(user.email, user.username, user.password)
                users.push(user)
                fs.writeFile('data/users.json', JSON.stringify(users), (err) => {
                    if (err) throw err
                    console.log("user successfully created")
                })
                publicDatabase.push({
                    "id": user.id,
                    "image": null,
                    "username": user.username,
                    "dayOfBirth": "",
                    "wishes": [],
                    "friends": []
                })
                fs.writeFile('data/DB.json', JSON.stringify(publicDatabase), (err) => {
                    if (err) throw err
                    console.log("user added to public DB")
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
    return users.find(({ email }) => email.toLowerCase() === userLogin.toLowerCase())
}

app.post('/checklogin', (req, res) => {
    if (req.cookies) {
        const authToken = req.cookies["auth-token"]
        const userLogin = authorisedUsers[authToken]
        if (userLogin) {
            const user = findUserByLogin(userLogin)
            res.status(200).send({
                "username": user.username,
                "id": user.id,
                "cookie": authToken
            })
            return
        }
    }
    res.status(401).send({})
})

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
        const cookieAge = 24 * 60 * 60 * 1000 * 10
        const authToken = generateAuthToken()
        authorisedUsers[authToken] = userFound.email
        console.log(authorisedUsers)
        const userData = {
            "username": userFound.username,
            "id": userFound.id,
            "cookie": authToken
        }
        console.log("login successful")
        res.cookie('auth-token', authToken, { domain: 'localhost', maxAge: cookieAge, httpOnly: false })
        
        //TODO: fix cookie setting
        res.status(200).send(userData)
    } else {
        console.log("user not found")
        res.status(401).send("user not found")
    }
})


function sendAccountDetails(email, username, pass) {
    let transporter = nodemailer.createTransport({
        service: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: "nodemailerwb@gmail.com",
            pass: "cPAtwgjr8BE5pOaZ"
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