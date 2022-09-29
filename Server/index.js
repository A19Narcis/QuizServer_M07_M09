const cors = require("cors");
const express = require("express");

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
})

app.post('/finalista', (req, res) => {
    //
})


/*Obrir Servidor*/
app.listen(PORT, () => {
    console.log("Server RUNNING ["+PORT+"]");
});