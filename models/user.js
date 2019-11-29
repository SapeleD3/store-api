const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi)

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    storeName: {
        type: String,
        required: true
    },
    storeDescription: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

function validateUser(user) {
    const schema = joi.object({
        firstName: joi.string().min(3).max(70).required(),
        lastName: joi.string().min(3).max(70).required(),
        email: joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().min(6).max(255).required(),
        storeName: joi.string().min(3).max(70).required(),
        storeDescription: joi.string().min(15).max(1200).required(),
        phone: joi.string().min(10).max(14).required(),
    })
    return schema.validate(user)
}
const validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().min(6).max(255).required()
    })
    return schema.validate(user)
}

const user = mongoose.model('User', userSchema)
exports.User = user;
exports.validate = validateUser;
exports.validateLogin = validateLogin