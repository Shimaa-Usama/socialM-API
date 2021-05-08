const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model')


module.exports = async(req, res) => {
    const { email, password } = req.body;
    try {
        const signInErrors = validationResult(req);
        if(signInErrors.isEmpty()){
            let user = await userModel.findOne({email})
            if(user){
                const match = await bcrypt.compare(password, user.password);
                if(user.confirmed){
                    if(match) {
                        var token = jwt.sign({ userID:user._id, userName:user.uname, isLoggedIn: true }, 'shhhhh');
                        res.header({token}).json({messages: 'loginSuccess'})
                    }else{
                        res.json({messages: 'invalid data', oldInputs:{ email, password }});
    
                    }
                }else{
                    res.json({messages:'please confirmed your email first'})

                }

            }else{
                res.json({message:'email not found'})
            }
        }else{
            res.json({messages: 'invalid data', oldInputs:{ email, password }, messagesError:signInErrors.errors});
        }

    } catch (error) {
            res.json({messages: 'catch error', error});
        
    }

}