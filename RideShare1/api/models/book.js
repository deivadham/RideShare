const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    driveID: {type: mongoose.Schema.Types.ObjectId},
    fName: {type:String, required:true},
    lName: {type:String, required:true},
    seat: {type:Number, required:true},
    email: {type:String, required:true},
    userID: {type: mongoose.Schema.Types.ObjectId, required:true},
    driveInfo: {type: mongoose.Schema.Types.Array, required:true },
    newdriveID: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'NewdriveID'},
});

const BookModel = mongoose.model('Book', bookingSchema)

module.exports=BookModel;