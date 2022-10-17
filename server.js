/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __________Anthony Chablov______ Student ID: __158794214__ Date: __October 3, 2022_________
*
*  Online (Heroku) Link: ______________https://damp-taiga-06798.herokuapp.com/__________________________________________
*
********************************************************************************/ 

const express = require('express');
const app = express();
const path = require('path');
const dataService = require('./data-service');

const multer = require("multer");
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'ddazkiod2', 
    api_key: '859917284244576', 
    api_secret: 'ocGtYohQshpjpvSgmdBgAS65I1o' 
});

const upload = multer();

// middleware
app.use(express.static('public'));

//routes
app.get('/', (req,res) => {
    res.sendFile(path.join( __dirname, "/views/home.html" ));
});

app.get('/about', (req,res) => {
    res.sendFile(path.join( __dirname, "/views/about.html" ));
});

app.get('/employees', (req,res) => {
    dataService.getAllEmployees()
        .then((data) => res.json(data))
        .catch((err) => { return {"message" : err} })
});

app.get('/departments', (req,res)=>{
    dataService.getDepartments()
        .then((data) => res.json(data))
        .catch((err) => { return {"message" : err} })
});

app.get('/managers', (req,res) => {
    dataService.getManagers()
        .then((data) => res.json(data))
        .catch((err) => { return {"message" : err} })
});

app.get('/posts/add', (req,res) => {
    res.sendFile(path.join( __dirname, "/views/addPost.html" ));
});

app.get('*', (req, res) => {
    res.send("Page Not Found.", 404);
});

app.post('/posts/add', (req,res)=>{
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    }else{
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    
    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result);
        return result;
    }
    
    upload(req).then((uploaded)=>{
        req.body.featureImage = uploaded.url;
    
        // TODO: Process the req.body and add it as a new Blog Post before redirecting to /posts
    
    });

    dataService.addPost() 
        .then((data) => res.json(data))
        .catch((err) => { return {"message" : err} })
        
})


dataService.initalize()
    .then(() => app.listen(process.env.PORT || 8080, () => console.log("Express http server listening on 8080")))
        .catch((err) => console.log(`${err}, Error has occured`))

