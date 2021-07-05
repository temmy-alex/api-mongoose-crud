const express = require('express')
const app = express()

const port = 5000

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const log = (req, res, next) => {
    console.log(Date.now() + ' ' + req.ip + ' ' + req.originalUrl)
    next();
}
app.use(log)

const routers = require('./routers')
app.use(routers)

const notFound = (req, res, next) => {
    res.json({
        status: 'error',
        message: 'Resource tidak ditemukan',
    })
}

app.use(notFound)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))

