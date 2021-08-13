/* 
ruta 
'/api/hospitales' 
*/



/*
    Ruta: /api/usuario

*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getHospital, crearHospital, actualizarHospital, borrarHospital } = require("../controllers/hospitales");

const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");



const router = Router();

router.post(
    "/", [validarJWT,
        check('nombre', 'El nombre del hosputal es necesario').not().notEmpty(),
        validarCampos
    ],
    crearHospital
);

router.get("/", getHospital);

router.put(
    "/:id", [

    ],
    actualizarHospital
);

router.delete("/:id", borrarHospital);




module.exports = router;