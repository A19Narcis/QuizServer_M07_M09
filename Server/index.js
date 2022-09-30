const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use (cors({
    origin: function (origin, callback){
        return callback(null, true);
    }
}));


/*Get Preguntes*/
app.post('/getPreguntes', (req, res) => {
    //Rep un numero (#num), el numero de preguntes que ha de recuperar
    var ret = [];
    fs.readFile(path.join(__dirname + '/quiz.json'), 'utf-8', function(err, data) {
        if (err) {
            return err;
        }
        var dades = JSON.parse(data);

        for (let index = 0; index < 1; index++) {
            var questionArray = {};
            questionArray.question = (dades.questions[index].question);
            questionArray.options = [];

            for (let posQuest = 0; posQuest < dades.questions[index].answers.length; posQuest++) {
               questionArray.options.push(dades.questions[index].answers[posQuest]);

            }
            ret.push(questionArray);
        }

        res.json(ret);
    });
})



app.post('/finalista', (req, res) => {
    //
})


/*Obrir Servidor*/
app.listen(PORT, () => {
    console.log("Server RUNNING ["+PORT+"]");
});