const mongoose= require('../../config/DB');
const {User, userSchema} =  require('../../modules/user');

exports.createUser= async function createUser(name,password, age, city){
    const user= new User({
        name: name,
        password: password,
        age:age,
        city: city
    });

    try{
        const result= await user.save();
        return result;
    }catch(err){
        return "user is already exist";
    }

}

exports.existUser = async function existUser(username){
    try{
        const user= await User.find({name: username});
        console.log('user[0]', user[0]);
        if(user[0]==null)
            return false;
        return true;  
    }catch(err){
        return err;
    }
}

exports.validate = function validate(user_detailes){
    if(user_detailes.name==='' ||user_detailes.password==='' ||user_detailes.age==='' ||user_detailes.city==='')
        return false;
    return true;    
}
