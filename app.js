const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;
const url = "https://jsonplaceholder.typicode.com/posts/";

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post("/", function(req, res) {
    const postId = req.body.postID
    https.get(url + postId, function(response){
    console.log(response.statusCode)
    response.on("data", function(data){
        const postData = JSON.parse(data)
        res.write("<p> userID is " + postData.userId + "</p>")
        res.write("<p> ID is " + postData.id + "</p>")
        res.write("<p> Title is " + postData.title + "</p>")
        res.write("<p> Body is " + postData.body + "</p>")
        res.send()
    })
})
})
app.listen(port, function() {
    console.log("Listening on port " + port)
})
