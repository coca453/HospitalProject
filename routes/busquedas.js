/* 
ruta 
'/api/todo' 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getTodo, getDocumentoColeccion } = require("../controllers/busquedas");


const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/:busqueda", validarJWT, getTodo);

router.get("/coleccion/:tabla/:busqueda", validarJWT, getDocumentoColeccion);



module.exports = router;