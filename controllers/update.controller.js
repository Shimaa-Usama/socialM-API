const postModel = require('../models/post.model');


module.exports = async(req, res) => {
    const {_id, title, desc, userID}= req.body
    try {
        await postModel.findOneAndUpdate({_id},{title, desc, userID:req.userID})
        res.json({messages : 'post updated'})
    } catch (error) {
        res.json({messages: 'post update catch error'})
        
    }
    
}