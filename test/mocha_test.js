const mocha = require('mocha')
const assert = require('assert')
const Person = require('../models/Person')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
    mongoose.connect('mongodb://localhost:27017/testdb').then(() => {
        done()
    }).catch(() => {

    })
})

describe('test insert', () => {
    it('insert', (done) => {
        const person = new Person({
            name: 'Van',
            age: 30
        })
        person.save().then(() => {
            assert(person.isNew === false)
            done()
        }).catch(() => {

        })
    })
})