const express = require("express");
const server = express();
const bodyParser = require("body-parser")
const { Author, Book } = require("./models.js");


let autores =[
    {
        id:1,
        name: "Jorge Luis",
        lastName: "Borges",
        birthdate: "24/08/1899",
        books: [
            {
                id: 1,
                title: "Ficciones",
                description:"Se trata de uno de sus más ...",
                year: 1944
            },
            {
                id: 2,
                title: "EL Aleph",
                description: "Otra recopilación de cuentos ...",
                year: 1949
            }
        ]
    },
    {

    }
]

server.listen("3002",()=>{
    console.log(" Servidor iniciado en http://localhost:3002");
});

server.use(bodyParser.json());

//Middleware Log {Verbo} - {ruta} - {queryStrings} - {body}
function logger(req, res, next){
    const {method, path, query, body } = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
}

server.use(logger);

// Middleware validar un autor
function authorValidate(req, res, next){
    const {name, lastName, birthdate} = req.body
    if(name && lastName && birthdate){
        next();
    }
    res.status(401)
        .json({
            message: "Datos incorrectos."
        });
}

// Middleware validar un libro
function bookValidate(req, res, next){
    const {title, description, year} = req.body
    if(title && description && year){
        next();
    }
    res.status(401)
        .json({
            message: "Datos incorrectos."
        });
}
// Middleware si existe un autor
function authorExist(req, res, next){
    const {name, lastName, birthdate} = req.body
    if(autores.find(autor => 
        autor.name === name &&
        autor.lastName === lastName &&
        autor.birthdate === birthdate))
    {
        res.status(401)
            .json({
                message: "El autor ya existe."
            });
    }
    else{
        next();
    }
}

// MIddleware existe autor por id
function authorExistById(req, res, next){
    const {id} = req.params;
    autor = autores.find(autor => autor.id === parseInt(id));
    if(autor){
        req.autor= autor
        next();
    }else{
        res.status(401)
        .json(`No existe el autor con id: ${id}`);
    }
}

let middlewareAuthor=[authorValidate, authorExist]

//AUTORES
// GET : todos los autores
server.get("/autores",(req, res, next )=>{
    res.status(200)
        .json(autores);
})

// POST : crea un autor
server.post("/autores",middlewareAuthor,(req, res, next )=>{
    const {name, lastName, birthdate} = req.body
    autores.push(new Author(autores.length,name,lastName,birthdate));
    res.status(200).json({
        message: "Autor agregado satisfactoriamente"
    });
})

// AUTOR POR ID
// GET: autor por id
server.get("/autores/:id",authorExistById,(req, res, next )=>{
    res.status(200)
    .json(req.autor);
    
})

// PUT : 
server.put("/autores/:id",authorExistById,(req, res, next )=>{
    const autor = req.autor;
    const {name,lastName,birthdate} = req.body;
    if(name || lastName || birthdate){
        if(name){
            autor.name = name;
        }
        if(lastName){
            autor.lastName = lastName;
        }
        if(birthdate){
            autor.birthdate = birthdate;
        }
        res.status(200)
            .json("El autor fue editado satisfactoriamente.");
    }else{
        res.status(401)
            .json("No se han especificado valores.");
    }
    
})

// DELETE : 
server.delete("/autores/:id",authorExistById,(req, res, next )=>{
    const autor = req.autor;
    const index = autores.indexOf(autor);
    autores.splice(index,1);
    res.status(204)
        .json("");
})