const express = require('express')
const routers = express.Router()
const multer = require('multer')
require('./connection')
const Product = require('./Product')

routers.get('/', (req, res) => res.send('Hello World'))

routers.get('/products', async (req, res) => {
    const products = await Product.find()
    if (products.length > 0) {
        res.send({
            status: 'success',
            message: 'List products ditemukan',
            data: products
        })
    } else {
        res.send({
            status: 'success',
            message: 'List products tidak ditemukan'
        })
    }
})


const ObjectId = require('mongodb').ObjectId

routers.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send({
            status: 'success',
            message: 'Single product ditemukan',
            data: product
        })
    } else {
        res.send({
            status: 'warning',
            message: 'Single product tidak ditemukan'
        })
    }
})

routers.post('/product', multer().none(), async (req, res) => {
    const { name, price, stock, status } = req.body

    try {
        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            status: status
        })

        if (product) {
            res.send({
                status: 'success',
                message: 'Tambah product success',
                data: product
            })
        } else {
            res.send({
                status: 'warning',
                message: 'Tambah product gagal'
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message
        })
    }
})

routers.put('/product/:id', multer().none(), async (req, res) => {
    const { name, price, stock, status } = req.body
    try {
        const result = await Product.updateOne(
            { _id: req.params.id },
            {
                name: name,
                price: price,
                stock: stock,
                status: status
            },
            { runValidators: true }
        )

        if (result.ok == 1) {
            res.send({
                status: 'success',
                message: 'Update product success',
                data: result
            })
        } else {
            res.send({
                status: 'warning',
                message: 'Update product gagal',
                data: result
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message
        })
    }
})

routers.delete('/product/:id', async (req, res) => {
   try {
       const result = await Product.deleteOne(
           { _id: req.params.id }
       )

       if (result.deletedCount == 1) {
           res.send({
               status: 'success',
               message: 'Delete product success',
               data: result
           })
       } else {
           res.send({
               status: 'warning',
               message: 'Delete product gagal',
               data: result
           })
       }
   } catch (error) {
        res.send({
            status: 'error',
            message: error.message
        })
   }
})

module.exports = routers