const axios = require("axios");
const { Workout }= require('../../modules/workout');
const { User }= require('../../modules/user');


exports.createWorkout= async function createWorkout(username, type ,location,duration,comments){
    try{
        pollution_level= await getPollution_level(location);
        aqi= pollution_level.data.data.indexes.baqi.aqi;
        const user= await User.find({name: username});
        console.log(user[0])
        if(user[0]){
            const workout= new Workout({
                user: user[0],
                type,
                location,
                duration,
                comments,
                pollution_level: aqi
            });
            const result= await workout.save();
            return result._id;
        }
    }catch(err){
        console.log(err)
        throw(err);
    }
}

async function getPollution_level(location){
    return await axios.get(`https://api.breezometer.com/air-quality/v2/current-conditions`, {
        params: {
            lat: location[0],
            lon: location[1],
            key: '51098babd6194abbaba039be13d8a6a7',
            features: 'breezometer_aqi'
        }
      });
}

exports.deleteTheWorkout=  async function deleteTheWorkout(id){
    try{
        console.log(id);
        const result= await Workout.findByIdAndDelete({ _id: id});
        return result;
    }catch(err){
        throw(err);
    }
}

exports.updateWorkout=  async function updateWorkout(id, type, location,duration, comments){
    try{
        const workout= await Workout.findById({ _id: id});
        console.log(workout)
        if(workout!=null){
            workout.type= type;
            if(workout.location[0]!=parseInt(location[0]) || workout.location[1]!=parseInt(location[1])){
                try{
                pollution_level= await getPollution_level(location);
                console.log('workout.pollution_level',pollution_level)
                aqi= pollution_level.data.data.indexes.baqi.aqi;
                workout.pollution_level=aqi;
                }catch(err){
                aqi= 56; // defult aqi if the api is not available
                workout.pollution_level=aqi;
                }
            }
            workout.location=location;
            workout.duration=duration;
            workout.comments=comments;
            const result= await workout.save();
            return result;
        }
    }catch(err){
        throw(err);
    }
}


exports.getWorkoutsByDate= async function getWorkoutsByDate(username){
    try{
    const user= await User.find({name: username});
    console.log(user);
    const result= await Workout.find({user : user[0]})
    .sort({date : 1});
    return result;
    }catch(err){
        throw(err);
    }
}


exports.getWorkoutsByAirPollution= async function getWorkoutsByAirPollution (username){
    try{
        const user= await User.find({name: username});
        console.log(user);
        const result= await Workout.find({user : user[0]})
        .sort({pollution_level : 1});
        return result;
        }catch(err){
            throw(err);
        }
}