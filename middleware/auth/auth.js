var jwt = require('jsonwebtoken');


module.exports = (req, res, next)=>{
    const token = req.header("token")
    try {
        if(token && token !=undefined && token!=null){

            jwt.verify(token, 'shhhhh',async function(err, decoded) {
                if(err){
                    res.json({message: 'invalid token'})
                }else{
               
                    if(decoded.isLoggedIn){
                        req.userName = decoded.userName;
                        req.userID = decoded.userID
                        next()
                    }else{
                        res.json({messages : 'please login first'})
                    }
                }
              });
    
    
        }
    } catch (error) {
        res.json({messages : 'catch auth error', error})
        
    }
}