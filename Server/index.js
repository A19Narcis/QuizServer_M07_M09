const cors = require("cors");
const express = require("express");

const app = express();
const PORT = 3000;

app.use (cors({
    origin: function (origin, callback){
        return callback(null, true);
    }
}));


/*Get Preguntes*/
app.post('/getPreguntes', (req, res) => {
    console.log(req);
})


/*Obrir Servidor*/
app.listen(PORT, () => {
    console.log("Server RUNNING ["+PORT+"]");
});