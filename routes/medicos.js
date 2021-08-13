/* 
ruta 
'/api/medico' 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require("../controllers/medicos");

const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");



const router = Router();

router.post(
    "/", [
        validarJWT,
        check('nombre', 'El nombre no es Valido').notEmpty().not(),
        check('hospital', 'Id de Hospital invalido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.get("/", getMedicos);

router.put(
    "/:id", [

    ],
    actualizarMedico
);

router.delete("/:id", borrarMedico);




module.exports = router;