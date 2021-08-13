const { response } = require("express");
const bcrypt = require('bcryptjs')

const Usuario = require("../models/usuario");
const usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jws");

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    // const usuarios = await Usuario.find({}, "nombre email password uid")
    //                               .skip( desde )
    //                               .limit(5);
    // const total = await Usuario.count();
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, "nombre email password uid img")
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ])
    res.json({
        ok: true,
        usuarios,
        total
    });
};

const crearUsuarios = async(req, res = response) => {
    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // generar el token
        const token = await generarJWT(usuario._id);



        res.json({
            ok: true,
            usuario,
            token,
            useFindAndModify: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};




const actualizarUsuarios = async(req, res = response) => {

    //TODO:  validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    console.log(await Usuario.findById(uid));

    try {


        console.log("TEST2");
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            });

        }

        //Actualizaciones

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            console.log("TEST1");
            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya exxiste ese Email"
                });
            }
        }

        campos.email = email;
        console.log("TEST");
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado,
            useFindAndModify: false
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "error inseperado..."
        });
    }


}


const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            });

        }

        await Usuario.findOneAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        });


    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: "error inesperado..."
        })


    }





}





module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario
};