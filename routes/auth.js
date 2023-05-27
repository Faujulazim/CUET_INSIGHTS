const express = require('express');
const { Mongoose } = require('mongoose');
var mongo= require('mongodb').MongoClient;
const bcryptjs = require('bcryptjs');
var ObjectId=require('mongodb').ObjectID;
var assert=require('assert');
var url="mongodb+srv://CUET_INSIGHTS:cuetcse@cuetdb.96uu1dgfdg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const router = express.Router();
const authController = require('../controllers/authController')
router.get('/login', (req, res) => res.render('login'));
router.get('/forgot', (req, res) => res.render('forgot'));
router.get('/reset/:id', (req, res) => {
    res.render('reset', { id: req.params.id })
});
router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.registerHandle);
router.get('/activate/:token', authController.activateHandle);
router.post('/forgot', authController.forgotPassword);
router.post('/reset/:id', authController.resetPassword);
router.get('/forgot/:token', authController.gotoReset);
router.post('/login', authController.loginHandle);
router.get('/logout', authController.logoutHandle);


router.get('/account', (req, res) => res.render('account'));

router.get('/update', (req, res) => res.render('update'));
router.post('/update',function(req,res,next){

      var name=req.body.name;
        

    var email=req.body.email;
    var password=req.body.password;
    
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;

         
    mongo.connect(url,function(err,Client){
        if (err) throw err;
        assert.equal(null,err);
        var db = Client.db('myFirstDatabase');
        db.collection('users').updateOne({"email":req.body.email},{$set:{name:name,password:password},function(err,result){
            assert.equal(null,err);
            console.log("Item Updated");
            Client.close();
        },
    });
});

        });
    });



});

module.exports = router;
