
const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        
    },
    password:{
        type:String
    },
    role:{
        type:Boolean
    }

},{timestamps:true})

const User = mongoose.model("user",userSchema)

function userValidation (object){
    const schema  = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(3).max(15).required()
    })
    return schema.validate(object)
}



module.exports= {User,userValidation}