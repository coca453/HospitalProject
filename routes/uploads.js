/* 
ruta 
'/api/uploads' 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { fileUploads } = require("../controllers/uploads");
const expressfileUpload = require('express-fileupload');



const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const { retornaImagen } = require("../controllers/busquedas");

const router = Router();

router.use(expressfileUpload());

router.put("/:tipo/:id", validarJWT, fileUploads);

router.get('/:tipo/:foto', retornaImagen);

module.exports = router;