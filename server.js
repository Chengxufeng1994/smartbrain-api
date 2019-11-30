var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    cors = require('cors'),
    knex = require('knex'),
    PORT = process.env.PORT || 3000;

const images = require('./controllers/images');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const sigin = require('./controllers/signin');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'f128891256a',
        database: 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data)
// });

// console.log(postgres.select('*').from('users'))

// const database = {
//     users: [{
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'Sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [{
//         id: '987',
//         hash: '',
//         email: 'john@gmail.com'
//     }]
// }

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

// 來自於不同網域（domain）、通訊協定（protocol）或通訊埠（port）的資源時，
// 會建立一個跨來源 HTTP 請求（cross-origin HTTP request）
app.use(cors())

// app.get('/', (req, res) => {
//     res.send(database.users)
// })

// app.get('/signin', (req, res) => {
//     res.json('sigining')
// })

app.post('/signin', (req, res) => {
    sigin.handleSignin(req, res, db, bcrypt)
})
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
})
app.put('/images', (req, res) => {
    images.handleImages(req, res, db)
})
app.post('/imagesurl', (req, res) => {
    images.handleApiCall(req, res)
})

app.listen(PORT, () => {
    console.log("The Smart Brain has started!!!")
})

/*  
 /=> res = this is working
 /signin => POST = success/fail
 /register => POST = user 
 /profile/:userId => GET = user
 /image => PUT => user 
 */