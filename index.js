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

// 7zkIyjch2lvxT9Va
// meadDB

///

// app.get( '/api/usuarios', (req, resp) => {
//     resp.json({
//         ok: true,
//         usuarios: {
//             id: 123,
//             nombre: 'Fernando'
//         }
//     })
// });

app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );  





app.listen( process.env.PORT, () =>{
    console.log('Hola Puerto: ' + process.env.PORT);
})