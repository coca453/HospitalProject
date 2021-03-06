const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospital = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');


    res.json({
        ok: true,
        hospital: hospitales
    })
}



const crearHospital = async(req, res = response) => {


    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'ERROR DE JS'
        })
    }




}
const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}
const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}



module.exports = {
    actualizarHospital,
    borrarHospital,
    crearHospital,
    getHospital
}