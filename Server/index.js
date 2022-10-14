const cors = require("cors");
const express = require("express");
const fs = require("fs");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use (cors({
    origin: function (origin, callback){
        return callback(null, true);
    }
}));


/*Get Total Preguntes*/
app.post('/getNumPreguntes', (req, res) => {
    var totalNumQuest = 0;
    fs.readFile(path.join(__dirname + '/quiz.json'), 'utf-8', function(err, data) {
        if (err) {
            return err;
        }
        var dades = JSON.parse(data);

        for (let i = 0; i < dades.questions.length; i++) {
            totalNumQuest++;
        }
        

        res.json(totalNumQuest);
    });
}),


app.use(session({
    secret: '12345678',
    resave: true,
    saveUninitialized: true,
}));


/*Get Preguntes*/
app.post('/getPreguntes', (req, res) => {
    req.session.preguntes =  [];
    //Rep un numero (#num), el numero de preguntes que ha de recuperar
    var ret = [];
    fs.readFile(path.join(__dirname + '/quiz.json'), 'utf-8', function(err, data) {
        if (err) {
            return err;
        }
        var dades = JSON.parse(data);

        for (let index = 0; index < req.body.num; index++) {
            var questionArray = {};
            var randomNum = Math.floor(Math.random() * 12);
            req.session.preguntes.push(randomNum);
            questionArray.question = (dades.questions[randomNum].question);
            questionArray.options = [];

            for (let posQuest = 0; posQuest < dades.questions[randomNum].answers.length; posQuest++) {
               questionArray.options.push(dades.questions[randomNum].answers[posQuest]);

            }
            ret.push(questionArray);
        }

        //console.log("Preguntes random [" + req.session.preguntes + "]");
        res.json(ret);
        var sesio = JSON.stringify(req.session);
        console.log("SESSIO 1.0 -> " + sesio);
    });
})


app.post('/finalista', (req, res,) => {
    //console.log("Respostes usuari: [" + req.body + "]");
    //console.log(req.session.preguntes);
    fs.readFile(path.join(__dirname + '/quiz.json'), 'utf-8', function(err, data) {
        if (err) {
            return err;
        }
        var dades = JSON.parse(data);
        var sesio = JSON.stringify(req.session);
        console.log("SESSIO 2.0 -> " + sesio);
        var correctes = 0;

        for (let i = 0; i < req.body.length; i++) {
            if (req.session.preguntes[i].correctIndex == req.body[i]){
                correctes++;
            }
        }
        res.json(correctes);

    });
})


/*Obrir Servidor*/
app.listen(PORT, () => {
    console.log("Server RUNNING ["+PORT+"]");
});