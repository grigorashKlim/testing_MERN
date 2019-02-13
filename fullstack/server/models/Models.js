const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/**
 * mongoose
 * @type {MongoClient}
 */


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const port = process.env.PORT || 3001;

const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});
let dbo;
MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    dbo = db.db("fullstackDB");

});

app.get('/games-data-json', (req, res) => {
    dbo.collection("games_data").find({}).toArray(function (err, games_data_content) {
        if (err) throw err;
        res.json(games_data_content);
    });
});

app.get('/user-list', (req, res) => {
    dbo.collection("users").find({}).toArray(function (err, user_list) {
        if (err) throw err;
        res.json(user_list);
    });
});

app.post('/post_new_row', (req, res) => {
    console.log(req.body.row.result);

    let new_row = req.body.row;
    new_row = JSON.parse(JSON.stringify(new_row));
    dbo.collection("games_data").insertOne(new_row, function (err, res) {
        if (err) throw err;
        console.log("row '" + JSON.stringify(new_row) + "' added!");
    });
    /*res.send(
        `I received your POST request. This is your name: ${req.body.name}. Here is your role: ${req.body.role}`,
    );*/
});
app.post('/delete_row', (req, res) => {
    let row_ids = req.body.ids;
    const query={_id :{'$in':row_ids}};
    dbo.collection("games_data").deleteMany(query, function (err, res) {
        if (err) throw err;
        console.log("row '" + JSON.stringify(query) + "' deleted!");
    });
    /*res.send(
        `I received your POST request. This is your name: ${req.body.name}. Here is your role: ${req.body.role}`,
    );*/
});

app.post('/post_data', (req, res) => {

    const new_user = {name: req.body.name, role: req.body.role};
    dbo.collection("users").insertOne(new_user, function (err, res) {
        if (err) throw err;
        console.log("User '" + req.body.name + "' created!");

    });
    res.send(
        `I received your POST request. This is your name: ${req.body.name}. Here is your role: ${req.body.role}`,
    );
});




