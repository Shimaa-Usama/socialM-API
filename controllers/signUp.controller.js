const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model')

module.exports = async(req, res) => {
    const { fname, lname, uname, email, password, cPassword } = req.body;
    try {
        const signUpErrors = validationResult(req);
        if(signUpErrors.isEmpty()){
            const user = await userModel.findOne({email});
            if(user){
                res.json({message: 'email already exist', oldInputs:{ fname, lname, uname, email, password } })
            }else{
                bcrypt.hash(password, 7, async function(err, hash) {
                    if(err){
                        res.json({message: 'hash error'})
                    }else{
                        var token = jwt.sign({ email }, 'shhhhh');

                        let transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                              user: "shimaa.usama99@gmail.com", // generated ethereal user
                              pass: "engshimaa4611", // generated ethereal password
                            },
                          });
                          let info = await transporter.sendMail({
                            from: 'shimaa.usama99@gmail.com', // sender address
                            to: email, // list of receivers
                            subject: "Hello ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: `<a href='http://socialm-api.herokuapp.com/checkemail/${token}'>confirmed</a>`, // html body
                          });
                        
                        await userModel.insertMany({ fname, lname, uname, email, password:hash })
                        res.json({messages: 'success'})

                    }
                });
            }
        }else{
            res.json({messages: 'invalid data', errorMessage: signUpErrors.errors})
        }
    } catch (error) {
        res.json({messages: 'catch signUp errors', error})
        
    }
}