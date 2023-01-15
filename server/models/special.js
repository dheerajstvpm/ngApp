const mongoose = require('mongoose')

const Schema = mongoose.Schema

const specialSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    date: String
})

module.exports = mongoose.model('special', specialSchema)