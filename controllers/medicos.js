const { response } = require("express");

const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('hospital', 'nombre usuario')
        .populate('usuario', 'nombre img');



    res.json({
        ok: true,
        medico: medicos
    })
}
const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    console.log(uid)
    const medico = new Medico({ usuario: uid, ...req.body });
    console.log(medico);

    try {
        // //Verificar Hospital

        //  console.log(idHospital);
        // const existeHospital = await Hospital.findOne(medico.hospital.id);  

        //  console.log(existeHospital);

        //  if (!existeHospital){
        //      return res.status(404).json({
        //          ok: false,
        //          msg : 'No existe ese Hospital'
        //      })
        //  }

        const medicodb = await medico.save();
        res.json({
            ok: true,
            medico: medicodb
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en crear Medico'
        })
    }

}
const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}
const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}



module.exports = {
    actualizarMedico,
    borrarMedico,
    crearMedico,
    getMedicos
}