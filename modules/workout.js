const mongoose= require('../config/DB');
const { User , userSchema }= require('./user')

const workoutSchema= new mongoose.Schema({
    user: {
        type: userSchema,
        required: true
    },
    type: {
        type: String,
        enum : ['cycling','running', 'walking'],
        default: 'cycling',
        required: true
    },
    location: {
        type: [Number],
        required: true
    },
    duration : {
        type: Number,
        required: true,
    },
    comments:{
        type: String
    } ,
    pollution_level:{
        type: String
    },
    date: {
         type: Date,
         default: Date.now,
    },
    time: {
        type: Date,
        default: Date.now.time
   }
});

const Workout= mongoose.model('Workout',workoutSchema);

module.exports.Workout= Workout;
module.exports.workoutSchema= workoutSchema;