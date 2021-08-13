"use strict";

var _require = require("express"),
    response = _require.response;

var _require2 = require('uuid'),
    uuidv4 = _require2.v4;

var _require3 = require("../helpers/actulizar-imagen"),
    actulizarImagen = _require3.actulizarImagen;

var fileUploads = function fileUploads(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var tipo = req.params.tipo;
  var id = req.params.id;
  var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es un tipo Valido'
    });
  } // Exista un Archivo


  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningun archivo'
    });
  } //procesar Imagen


  var file = req.files.imagen;
  var nombreCortado = file.name.split('.');
  var extensionArchivo = nombreCortado[nombreCortado.length - 1]; //validar extensiones

  var extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extension permitida'
    });
  } //generar nombre


  var nombreArchivo = "".concat(uuidv4(), ".").concat(extensionArchivo); //path para guardar imagen

  var path = "./uploads/".concat(tipo, "/").concat(nombreArchivo); //Mover Imagen

  file.mv(path, function (err) {
    if (err) console(err);
    return res.status(500).send(err);
  }); //Actualizar DB

  actulizarImagen(tipo, id, nombreArchivo);
  res.json({
    ok: true,
    msg: 'fileUploads',
    nombreArchivo: nombreArchivo,
    path: path
  });
};

module.exports = {
  fileUploads: fileUploads
};