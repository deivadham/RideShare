const mongoose = require('mongoose');

const DriveSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    fName: String,
    lName: String,
    Scity: String,
    ECity: String,
    Eloc: String,
    Sloc: String, 
    date: Date, 
    time: String, 
    cap: Number, 
    cost: Number, 
    payType: String, 
    payID: String,
    addInfo: String,
})

const driveModel = mongoose.model('Drive', DriveSchema);

module.exports=driveModel;