const express = require("express");
const router = express.Router();
const workoutOperation = require("./utils/workoutUtil");
const authentic= require("../middleware/auth");

// add workout after after a user identifies (in authentic middleware)
router.post('/addWorkout', authentic , async (req, res, next)=> {
    try{
        const result=await workoutOperation.createWorkout(
            req.username, // after authentication- the user name is extracted
            req.body.type,// example: 'cycling'
            req.body.location, //  example: [32.065830, 34.838560]
            req.body.duration , //   example: 20
            req.body.comments); //'I am a lot of good comments'
        res.status(200).send({workout_id: result});    
    }
    catch(err)
    {
        next(err);
    }
});

// update workout by id
router.delete('/deleteWorkout', authentic, async function(req, res) {
    try{
        console.log(req.body.id)
        const result=await workoutOperation.deleteTheWorkout(req.body.id);
        if(result)
            res.status(200).send({ message: 'This workout has been deleted', success: true });
    }
    catch(err)
    {
      res.status(400).send({ message: 'could not delete this id', success: false });
    }
});

// update workout 
router.put('/updateWorkout', authentic, async(req, res) => {
    try{
        const result=await workoutOperation.updateWorkout(
            req.body.id,
            req.body.type,
            req.body.location,
            req.body.duration,
            req.body.comments);
        if(result)
            res.status(200).send({ message: 'This workout has been updated', success: true });
    }
    catch(err)
    {
      res.status(400).send({ message: 'could not update this id', success: false });
    }
});

// all the user's workouts sort by date
router.post('/workoutsByDate/:username', authentic, async function(req, res) {
    try{
        const result=await workoutOperation.getWorkoutsByDate(req.params.username);
        res.status(200).send(result);
    }
    catch(err)
    {
      res.status(400).send({ message: 'this user have alreay Workout', success: false });
    }
});

// all the user's workouts sort by air pollution
router.post('/workoutsByAirPollution/:username',authentic,  async function(req, res) {
    try{
        const result=await workoutOperation.getWorkoutsByAirPollution(req.params.username);
        res.status(200).send(result);
    }
    catch(err)
    {
      res.status(400).send({ message: 'this user have alreay Workout', success: false });
    }
});

module.exports = router;

