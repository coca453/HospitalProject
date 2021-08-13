const { response, json } = require("express");

const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const hospital = require("../models/hospital");


const getTodo = async(req, res = response) => {
    try {
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');
        console.log(regex);

        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
        ])


        res.json({
            ok: true,
            params: busqueda,
            usuarios,
            medicos,
            hospitales
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const getDocumentoColeccion = async(req, res = response) => {
    try {
        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');
        console.log(regex);

        let data = [];

        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                    .populate('usuario', 'nombre img');
                break;

            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                break;

            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                });
        }

        res.json({
            ok: true,
            resultados: data
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

module.exports = {
    getTodo,
    getDocumentoColeccion
}