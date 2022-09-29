const cors = require("cors");
const express = require("express");
const fs = require("fs");

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
    console.log(req.body);
    fs.readFile('/quiz.json', (err, data) =>{
        if (err) {
            return err;
        }
        for (let index = 0; index < req.body; index++) {
            console.log(data[index]);
            
        }
    })

})

app.post('/finalista', (req, res) => {
    //
})


/*Obrir Servidor*/
app.listen(PORT, () => {
    console.log("Server RUNNING ["+PORT+"]");
});