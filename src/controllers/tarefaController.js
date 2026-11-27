const tarefaService = require("../services/tarefaService");

async function listarTarefas(req, res) {
  const tarefas = await tarefaService.listarTarefas(req.query);
  res.status(200).json(tarefas);
}

async function buscarPorId(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID deve ser um numero" });
  }

  const tarefa = await tarefaService.buscarTarefaPorId(id);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  res.status(200).json(tarefa);
}

async function criar(req, res) {
  const erro = tarefaService.validarTarefa(req.body, true);
  if (erro) {
    return res.status(400).json({ erro });
  }

  const existeCat = await tarefaService.categoriaExiste(req.body.categoria_id);
  if (!existeCat) {
    return res.status(400).json({ erro: "Categoria nao encontrada" });
  }

  const novaTarefa = await tarefaService.criarTarefa(req.body);
  res.status(201).json(novaTarefa);
}

async function atualizarCompleto(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID deve ser um numero" });
  }

  const erro = tarefaService.validarTarefa(req.body, true);
  if (erro) {
    return res.status(400).json({ erro });
  }

  const existeCat = await tarefaService.categoriaExiste(req.body.categoria_id);
  if (!existeCat) {
    return res.status(400).json({ erro: "Categoria nao encontrada" });
  }

  const tarefa = await tarefaService.atualizarTarefa(id, req.body);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  res.status(200).json(tarefa);
}

async function atualizarParcial(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID deve ser um numero" });
  }

  const erro = tarefaService.validarTarefa(req.body, false);
  if (erro) {
    return res.status(400).json({ erro });
  }

  if (req.body.categoria_id !== undefined) {
    const existeCat = await tarefaService.categoriaExiste(req.body.categoria_id);
    if (!existeCat) {
      return res.status(400).json({ erro: "Categoria nao encontrada" });
    }
  }

  const tarefa = await tarefaService.atualizarParcialTarefa(id, req.body);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  res.status(200).json(tarefa);
}

async function deletar(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID deve ser um numero" });
  }

  const apagou = await tarefaService.deletarTarefa(id);
  if (!apagou) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  res.status(204).send();
}

module.exports = {
  listarTarefas,
  buscarPorId,
  criar,
  atualizarCompleto,
  atualizarParcial,
  deletar,
};
