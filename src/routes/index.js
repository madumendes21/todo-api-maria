const express = require("express");
const router = express.Router();

const tarefaRoutes = require("./tarefaRoutes");
const categoriaRoutes = require("./categoriaRoutes");

router.use("/tarefas", tarefaRoutes);
router.use("/categorias", categoriaRoutes);

module.exports = router;
