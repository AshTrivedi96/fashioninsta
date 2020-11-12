var express = require('express');
var app = express();
var fs = require('fs');

app.get('/api/questions/:type', function(req, res) {
    //res.send("Hello world " + req.params.type + " query:" + req.query.akshay);
    dataPath = './data/' + req.params.type + '-questions.json';
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.send("No such quiz exists!!");
        }

        res.send(JSON.parse(data));
    });
});

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});