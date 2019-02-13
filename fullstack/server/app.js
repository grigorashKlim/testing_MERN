const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';

/**
 * mongoose
 * @type {MongoClient}
 */
const url = "mongodb://localhost/klim_mongoDB";
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.connect(url);
const dbo = mongoose.connection;
dbo.on('error', console.error.bind(console, 'connection error:'));
dbo.once('open', function () {
    // we're connected!
});

const gamesResultSchema= new mongoose.Schema({
    player1: String,
    player2: String,
    result: String,
});
const gamesResult = mongoose.model('gamesResult',gamesResultSchema);

const fs = require("fs");

app.get('/testo', (req, res) => {



    const data= fs.readFileSync('./data/generated.json');
    res.write(JSON.stringify(JSON.parse(data)));
    /*const new_user = {name: req.body.name, role: req.body.role};
    dbo.collection("users").insertOne(new_user, function (err, res) {
        if (err) throw err;
        console.log("User '" + req.body.name + "' created!");

    });
    res.send(
        `I received your POST request. This is your name: ${req.body.name}. Here is your role: ${req.body.role}`,
    );*/
});




const port = 3001;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// console.log that your server is up and running
app.listen(port,hostname, () => console.log(`Listening on port ${port}`));

