const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const Person = mongoose.model('users', PersonSchema)
module.exports = Person