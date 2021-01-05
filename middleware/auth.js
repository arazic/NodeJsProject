
const { User , userSchema }= require('../modules/user')

//authentic function for all the login functions
module.exports= async (req, res, next) => {
    const authHeader= req.headers.authorization;

    // check for basic auth header
    if(!authHeader){
        throw { status: 401, message: 'You are not authenticated' };
     }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[0];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    try{
    const user= await User.find({name: username, password: password});
    req.username =user[0].name;
   
    next();    

    }catch(err){
        let new_err = new Error('You are not authenticated')
        new_err.status = 400
        next(new_err);
    }

}
  

 
