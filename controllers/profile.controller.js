

const postModel = require('../models/post.model')

module.exports = async(req, res) => {

    try {
        const postList = await postModel.find({userID:req.userID})
        res.json({postList})
    } catch (error) {
        res.json({messages: 'profile catch error'})
    }

}