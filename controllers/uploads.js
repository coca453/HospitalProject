const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actulizarImagen } = require("../helpers/actulizar-imagen");


const fileUploads = (req, res = response) => {


    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo Valido'
        })
    }

    // Exista un Archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //procesar Imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extensiones
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        })
    }

    //generar nombre
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover Imagen
    file.mv(path, (err) => {
        if (err)
            console(err);
        return res.status(500).send(err);
    });


    //Actualizar DB
    actulizarImagen(tipo, id, nombreArchivo);



    res.json({
        ok: true,
        msg: 'fileUploads',
        nombreArchivo,
        path
    })
}

module.exports = {
    fileUploads
}