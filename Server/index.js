const cors = require("cors");
const express = require("express");
const fs = require("fs");
const session = require("express-session");
const path = require("path");
const { Cookie } = require("express-session");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use (cors({
    origin: function (origin, callback){
        return callback(null, true);
    }
}));

app.use(session({
    secret: '12345678',
    saveUninitialized: true,
    resave: true,
    cookie: {
        preguntes: []
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

//FUNCION (array, numeroMAX)
/*

do while if repetit is true

RETORNA NUMERO
*/


/*Get Preguntes*/
app.post('/getPreguntes', (req, res) => {
    //NO VA req.session.preguntes =  [];
    while (req.session.cookie.preguntes.length > 0) {
        req.session.cookie.preguntes.pop();
    }
    //Rep un numero (#num), el numero de preguntes que ha de recuperar
    var ret = [];
    fs.readFile(path.join(__dirname + '/quiz.json'), 'utf-8', function(err, data) {
        if (err) {
            return err;
        }
        var dades = JSON.parse(data);

        for (let index = 0; index < req.body.num; index++) {
            var questionArray = {};
            var randomNum = Math.floor(Math.random() * 12); //Funcio per validar el numero
            req.session.cookie.preguntes.push(randomNum);
            questionArray.question = (dades.questions[randomNum].question);
            questionArray.options = [];

            for (let posQuest = 0; posQuest < dades.questions[randomNum].answers.length; posQuest++) {
               questionArray.options.push(dades.questions[randomNum].answers[posQuest]);

            }
            ret.push(questionArray);
        }
        //console.log("Preguntes random [" + req.session.preguntes + "]");
        res.json(ret);
        console.log("Preguntes [" + req.session.cookie.preguntes + "]");
    });
})


app.post('/finalista', (req, res,) => {
    console.log("Respostes usuari: [" + req.body + "]");
    fs.readFile(path.join(__dirname + '/quiz.json'), 'utf-8', function(err, data) {
        if (err) {
            return err;
        }
        var dades = JSON.parse(data);
        var correctes = 0;

        for (let i = 0; i < req.body.length; i++) {
            if (dades.questions[req.session.cookie.preguntes[i]].correctIndex == req.body[i]){
                correctes++;
            }
        }
        res.json(correctes);
        console.log("Correctes: " + correctes + "/" + req.session.cookie.preguntes.length + "\n");

    });
})


/*Obrir Servidor*/
app.listen(PORT, () => {
    console.log("Server RUNNING ["+PORT+"]");
});