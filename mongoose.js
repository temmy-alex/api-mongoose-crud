const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/latihan', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const quoteSchema = new mongoose.Schema({
    word: String
})

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    status: { type: Boolean, default: true }
})

const Quote = mongoose.model('Quote', quoteSchema)
const Product = mongoose.model('Product', productSchema)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error: '))
db.once('open', async () => {
    // const quote = new Quote({
    //     word: 'Besar pasak daripada tiang'
    // })

    // quote.save((error, quote) => {
    //     if (error) return console.error(error)
    //     console.log(quote)
    // })

    // await Product.find().exec((err, result) => {
    //     console.log(result)
    // })

    // const newProduct = await Product.create({
    //     name: 'USB Converter',
    //     price: 50000,
    //     stock: 20,
    //     status: true
    // })

    // console.log(newProduct)
})