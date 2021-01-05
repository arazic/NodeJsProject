const express = require('express');
const workoutHandler = require('./routes/workoutHandler'); 
const authHandler = require('./routes/signupHandler'); 

const app= express();
app.use(express.json());
app.use('/workouts', workoutHandler);
app.use('/auth', authHandler);

app.get('/', (req, res) => {
    res.send('welcome!');
});

// error middleware
app.use(function (err, req, res, next) 
{
    console.error(err);
    res.status(err.status || 500).send({ message: err.message, success: false });
});

const port= 3500;
app.listen(port, () => {
    console.log(`Server started on port 3500`);
});

