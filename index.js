require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Inicio del servidor


const app = express();
// base de datos

dbConnection();

// 7zkIyjch2lvxT9Va
// meadDB

///

app.get( '/', (req, resp) => {
    resp.json({
        ok: true,
        msg: 'Hola Mundo',
    })
});


app.listen( process.env.PORT, () =>{
    console.log('Hola Puerto: ' + process.env.PORT);
})