var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = "abcdefg";
module.exports= function(router){
    
   //http://localhost:2006/api/users 
    //User registration route
    
    router.post('/users',function(req,res){
var user = new User(); 
        user.username = req.body.username;
        user.password = req.body.password;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.Phone = req.body.Phone;
        user.location = req.body.location;
	
	if(req.body.username == null || req.body.username == " " || req.body.password == null || req.body.password == " " || req.body.firstname == null || req.body.firstname == " " || req.body.lastname == null || req.body.lastname == " " || req.body.email == null || req.body.email == " " || req.body.Phone == null || req.body.Phone == " " || req.body.location == null || req.body.location == " ") 
    {
        
        res.json({success: false , message: "Please fill in all the details"});
    }
        else{
            
            user.save(function(err) {
                            if(err){
                           res.json({success: false , message:"username  already exists"}) ;
                                }
             else{
                 res.json({success:true, message:"user Created"});
                 
             }
        });
		
	
}
});
    //user login route
    //http:localhost:2006/api/authenticate
router.post('/authenticate',function(req,res){
    User.findOne({ username : req.body.username  }).select('email password username Phone firstname lastname location').exec(function(err,user){
        if(err) throw err;
        
        if(!user){
            res.json({success : false , message : 'could not authenticate user'});
        }
        else if (user){
            if(req.body.password){
           var validPassword =  user.comparePassword(req.body.password);
            }
            else 
            {
                res.json({success : false , message : "no password provided"});
            }
            if(!validPassword){
                res.json({success : false , message : "could not authenticate password"});
            }
            else {
                var token = jwt.sign({username : user.username , email : user.email, Phone : user.Phone , firstname : user.firstname, lastname : user.lastname, location: user.location},secret,{expiresIn : '24h'});
                res.json({success:true , message: " User authenticated",token: token});
            }
        }
    });
});
    
   router.use(function(req,res,next){
      var token =  req.body.token ||req.body.query ||req.headers['x-access-token'];
       
       if(token){
           jwt.verify(token,secret,function(err,decoded){
                      
               if(err)
               {
                   res.json({success : false ,message : "token invalid"});
               }
               else {
                   
                     req.decoded = decoded;     
                     next();
                      }
           });
       }
       else {
           res.json({success: false,message : "No token provided"});
       }
   }) ;
    
    
    router.post('/me',function(req,res){
        res.send(req.decoded);
    });
    
    

  return router;  
    
    }
