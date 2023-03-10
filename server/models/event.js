const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    date: String
})

module.exports = mongoose.model('event', eventSchema)