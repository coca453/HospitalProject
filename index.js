require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
const { Mongoose } = require('mongoose');


// Inicio del servidor
const app = express();
//lectura del body
app.use(express.json());
// base de datos
dbConnection();

//Crud
//Bases DB
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));

//login
app.use('/api/login', require('./routes/auth'));

//busquedas
app.use('/api/todo', require('./routes/busquedas'));

//uploads
app.use('/api/upload', require('./routes/uploads'));




app.listen(process.env.PORT, () => {
    console.log('Hola Puerto: ' + process.env.PORT);
})