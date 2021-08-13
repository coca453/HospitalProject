const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jws");

const login = async(req, res = response) => {
    const { email, password } = req.body;




    try {

        const usuarioDB = await Usuario.findOne({ email });

        //Verificar Email

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no válida'
            });
        }
        // Verificar Contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(405).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // generar el token

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })


    } catch (error) {
        console.log(Error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el login'
        })
    }
}


module.exports = {
    login
}