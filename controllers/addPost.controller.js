const postModel = require('../models/post.model')
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {

    try {
            const { title, desc } = req.body; 
            const postError = validationResult(req);
            if(postError.isEmpty()){
                await postModel.insertMany({title, desc, userID:req.userID})
                res.json({messages: 'post added'})


            }else{
                res.json({messages: 'add post  invalid', messages:postError.errors, oldInputs:{title, desc}})
                
            }
            
        } catch (error) {
            res.json({messages: 'add post catch error', error})
        }

}