const MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb://localhost:27017";

// MongoClient.connect(connectionString, { useUnifiedTopology: true }, 
//     (error, client) => {
//         if (error) return console.error(error)
//         console.log("Server database connect!")
//     })

// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//     .then(client => {
//         console.log("Server database connect!")
//     })
//     .catch(error => console.error(error))

(async () => {
    try {
        const client = await MongoClient.connect(connectionString, {
            useUnifiedTopology: true
        })

        const db = client.db('latihan')
        const quotes = await db.collection('quotes').find().toArray()
        console.log(quotes)
    } catch (error) {
        console.error(error);
    }
})();