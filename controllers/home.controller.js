const postModel = require('../models/post.model')

module.exports = async(req, res) => {

    try {
        const postList = await postModel.find({}).populate("userID")
        res.json({postList})
    } catch (error) {
        res.json({messages: 'home catch error'})
    }

}