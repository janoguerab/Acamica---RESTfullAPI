const express = require("express");
const server = express();
const bodyParser = require("body-parser")

server.listen("3000",()=>{
    console.log(" Servidor iniciado en http://localhost:3000");
});

server.use(bodyParser.json());

//Middleware Log {Verbo} - {ruta} - {queryStrings} - {body}
function logger(req, res, next){
    const {method, path, query, body } = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
}

server.use(logger);

// GET : 
server.get("/",(req, res, next )=>{
    res.status(200)
        .json("soy GET");
})

// POST : 
server.post("/",(req, res, next )=>{
    res.status(200)
        .json("soyt POST");
})

// PUT : 
server.put("/",(req, res, next )=>{
    res.status(200)
        .json("soy PUT");
})

// DELETE : 
server.delete("/",(req, res, next )=>{
    res.status(200)
        .json("soy DELETE");
})