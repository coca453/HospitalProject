
const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {


    const validadores = validationResult(req);

    if (!validadores.isEmpty()) {
        console.log('hola');

        return res.status(400).json({
            ok: false,
            msg: 'entro',
            errors: validadores.mapped()
        });
    }
    next();
}


module.exports = {
    validarCampos
}