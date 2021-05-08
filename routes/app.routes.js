const app = require('express').Router();
const auth = require('../middleware/auth/auth')



// signUp
const signUpValidation = require('../middleware/validation/signUp.validation');
const signUpController = require('../controllers/signUp.controller')
app.post('/', signUpValidation, signUpController);
// 
// checkEmail
const checkEmaillController = require('../controllers/checkEmail.controller')
app.get('/checkemail/:token', checkEmaillController);
// 


// signIn
const signInValidation = require('../middleware/validation/signIn.validation');
const signInController = require('../controllers/signIn.controller')
app.post('/handleSignin', signInValidation, signInController);
// 


// home
const homeController = require('../controllers/home.controller')
app.get('/home',auth, homeController);
// 

// addPost
const addPostVlidation = require('../middleware/validation/post.validation');
const addPostController = require('../controllers/addPost.controller')
app.post('/addPost', auth,addPostVlidation, addPostController);
// 


// profile
const profileController = require('../controllers/profile.controller')
app.get('/profile', auth, profileController);
// 

// delete
const deleteController = require('../controllers/delete.controller')
app.delete('/deletePost', auth, deleteController);
// 

// update
const updateController = require('../controllers/update.controller')
app.put('/updatePost', auth, updateController);
// 
module.exports = app