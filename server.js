/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __________Anthony Chablov______ Student ID: __158794214__ Date: __October 3, 2022_________
*
*  Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/ 

const express = require('express');
const app = express();
const path = require('path');
const dataService = require('./data-service');

// middleware
app.use(express.static('public'));

//routes
app.get(('/'), (req,res) => {
    res.sendFile(path.join( __dirname, "/views/home.html" ));
});

app.get(('/about'), (req,res) => {
    res.sendFile(path.join( __dirname, "/views/about.html" ));
});

app.get(('/employees'), (req,res) => {
    dataService.getAllEmployees()
        .then((data) => res.json(data))
        .catch((err) => { return {"message" : err} })
});

app.get(('/departments'), (req,res)=>{
    dataService.getDepartments()
        .then((data) => res.json(data))
        .catch((err) => { return {"message" : err} })
});

app.get(('/managers'), (req,res) => {
    dataService.getManagers()
        .then((data) => res.json(data))
        .catch((err) => { return {"message" : err} })
});

app.get('*', (req, res) => {
    res.send("Page Not Found.", 404);
});

dataService.initalize()
    .then(() => app.listen(process.env.PORT || 8080, () => console.log("Express http server listening on 8080")))
        .catch((err) => console.log(`${err}, Error has occured`))

