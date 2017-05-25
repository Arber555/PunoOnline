var express=require('express');
var nodemailer = require("nodemailer");
const config = require('../config/database');
var app=express();
const router = express.Router();

var smtpTransport = require('nodemailer-smtp-transport');
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "punoonlineemail@gmail.com",
        pass: "PunoOnline123"
    }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});

router.get('/send/:email',function(req,res){

    rand=Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link="http://"+req.get('host')+"/test/verify/"+rand;
    mailOptions ={
        to : req.params.email,
        subject : "Please confirm your Email account",
        text : "Click here to verify: "+link 
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error)
        {
            res.end("error");
        }else
        {
            res.end("sent");
        }
    }); 
});

router.get('/verify/:nr',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.params.nr==rand)
        {
            //console.log("email is verified");
            res.end("Email "+mailOptions.to+" is been Successfully verified");
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});

/*--------------------Routing Over----------------------------*/




module.exports = router;
