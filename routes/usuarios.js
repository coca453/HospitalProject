/*
    Ruta: /api/usuario

*/

const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUsuario
} = require("../controllers/usuarios");

const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    check("nombre", "Falta el usuario").notEmpty().not(),
    check("password", "Falta el password").not().notEmpty(),
    check("email", "Falta el Email").isEmail(),
    validarCampos,
  ],
  crearUsuarios
);

router.get("/", validarJWT ,getUsuarios);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "Falta el usuario").notEmpty().not(),
    check("role", "Falta el Role").not().notEmpty(),
    check("email", "Falta el Email").isEmail(),
    validarCampos
  ],
  actualizarUsuarios
);

router.delete("/:id",  validarJWT,borrarUsuario);




module.exports = router;
