 const express = require('express');
 const nodemailer = require("nodemailer")
 const BodyParser = require("body-parser") 

 const app = express();
 require('dotenv').config()
 app.use(BodyParser.json())

 const port = process.env.PORT || 4000;
 const www = process.env.WWW || './';

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.DB_EMAIL,
    pass: process.env.DB_PASSWORD 
  }
});

// verifying the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});


app.post('/access', (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = ` name : ${name} \n email: ${email} \n message: ${message} `

  console.log(name)
  var mail = {
    from:'name <>',
    to:process.env.DB_EMAIL, 
    subject: "hellos sir",
    message: message, 
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
        console.log(err)
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})



 app.listen(port);
 