const mongoose=require('mongoose');
// const sequelize=require('sequelize');
const dotenv = require("dotenv");
require("dotenv").config();

const uuid=require("uuid");

const mongo=process.env.MONGO;
mongoose.connect(mongo);




const ReimbursementsSchema=mongoose.Schema({
    reimbursement_id:{type:String , default: () => uuidv4().replace(/\-/g, '')},
    user_id:{type:String, required: true},
    description:{type:String, required: true},
    amount:{type:Number, required:true},
    status:{type:String, default:"pending"},
    currency: {
        type: String,
        enum : ['USD','INR'],
        default: 'USD',

    },
    created_at    : { type:Date,required: true, default: Date.now }
});

module.exports=mongoose.model('r',ReimbursementsSchema);


