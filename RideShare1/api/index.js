const express = require('express');
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config()
const User = require('./models/User.js');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const Drive = require('./models/drive');
const Book = require('./models/book');

app.use(express.json());
app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = '1234';

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


mongoose.connect(process.env.MONGO_URL);


app.get('/test', (req,res) =>{
    res.json('test ok');
});

app.post('/signup', async (req,res)=> {
    const {fName, lName, email, password} = req.body;

    try{
        const userDoc = await User.create({
            fName, 
            lName,
            email, 
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({userDoc});
    }
    catch(e){
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) =>{
    const {email, password} =req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            jwt.sign({email:userDoc.email, id:userDoc._id, fName:userDoc.fName, lName:userDoc.lName}, jwtSecret, {}, (err,token)=>{
                if(err) throw err;
                res.cookie('token', token).json(userDoc);
            })
        }
        else{
            res.status(422).json('pass not ok');
        }
    }
    else{
        res.json('not found');
    }
});

app.get('/profile', (req,res) =>{
    const{token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, user)=>{
            if(err) throw err;
            res.json(user);
        });
    }
    else{
        res.json(null);
    }
})

app.post('/logout', (req, res) =>{
    res.cookie('token', '').json(true);
})

app.post('/drives', (req, res) => {
    const{token} = req.cookies;
    const {fName, lName, Scity,ECity,Eloc,Sloc, date, time, cap, cost, payType, payID,addInfo} = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, user)=>{
        if(err) throw err;
        const driveDoc = await Drive.create({
            owner:user.id,
            fName: user.fName,
            lName: user.lName,
            Scity, ECity,Eloc,Sloc, date, time, 
            cap, cost, payType, payID,addInfo
    })
    res.json(driveDoc);
})

});

app.get('/drives', (req,res) =>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async(err, user)=>{
        const {id} = user;
        res.json(await Drive.find({owner:id}));
    })

});

app.get('/drives/:id', async (req,res) =>{
    const {id} = req.params;
    res.json(await Drive.findById(id));
});

app.post('/drives/:id', async (req,res) =>{
    const{token} = req.cookies;
    const {fName, lName, Scity,ECity,Eloc,Sloc, date, time, cap, cost, payType, payID,addInfo} = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, user)=>{
        if(err) throw err;
        const driveDoc = await Drive.create({
            Scity, ECity,Eloc,Sloc, date, time, 
            cap, cost, payType, payID,addInfo
    })
    res.json(driveDoc);
    })
});


app.put('/drives', async (req,res) =>{
    const{token} = req.cookies;
    const {id, fName, lName, Scity,ECity,Eloc,Sloc, date, time, cap, cost, payType, payID,addInfo} = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, user)=>{
        const driveDoc = await Drive.findById(id)
        if(user.id == driveDoc.owner.toString()){
            driveDoc.set({
                Scity,ECity,Eloc,Sloc, date, time, cap, cost, payType, payID,addInfo,
            })
            await driveDoc.save();
            res.json('ok');
        }
    });
});

app.get('/drivelist', async(req,res)=> {
    res.json(await Drive.find())
})

function getUserData(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }

app.post('/rides', async(req,res)=>{
    const userData = await getUserData(req);
    const {driveID, fName, lName, seat, email, newdriveID, driveInfo} =req.body;
    Book.create({
        driveID, fName, lName, seat, email,userID:userData.id,newdriveID,driveInfo
    }).then((doc)=>{         
        res.json(doc)
    }).catch((err)=>{
            throw err;
    })
    const driveDoc = await Drive.findById(req.body.newdriveID)
    driveDoc.cap=driveDoc.cap-1; 
    await driveDoc.save();
})

app.get('/rides', async (req,res) =>{
    const userData = await getUserData(req);
    const Data = await Book.find({userID:userData.id});
    res.json(Data);
})




app.listen(4000);
