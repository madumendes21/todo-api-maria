const express = require("express");
const router = express.Router();
const tarefaController = require("../controllers/tarefaController");

router.get("/", tarefaController.listarTarefas);
router.get("/:id", tarefaController.buscarPorId);
router.post("/", tarefaController.criar);
router.put("/:id", tarefaController.atualizarCompleto);
router.patch("/:id", tarefaController.atualizarParcial);
router.delete("/:id", tarefaController.deletar);

module.exports = router;
