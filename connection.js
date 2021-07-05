// const MongoClient = require("mongodb").MongoClient
// const connectionString = "mongodb://localhost:27017";

// const client = new MongoClient(connectionString, {
//     useUnifiedTopology: true
// });

// (async () => {
//     try {
//         await client.connect();
//     } catch(error) {
//         console.error(error);
//     }
// })();

// module.exports = client

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/training', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error:'))
db.once('open', () => {
    console.log('Server database connect!')
})
