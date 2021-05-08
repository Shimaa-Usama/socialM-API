const { body } = require('express-validator');

module.exports = [
        body('title').notEmpty(),
        body('desc').notEmpty()
]