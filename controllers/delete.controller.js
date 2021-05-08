const postModel = require('../models/post.model');


module.exports = async(req, res) => {
    
    try {
        await postModel.findByIdAndDelete({_id:req.body.id})
        res.json({messages : 'post deleted'})
    } catch (error) {
        res.json({messages: 'post delete catch error'})
        
    }
    
}