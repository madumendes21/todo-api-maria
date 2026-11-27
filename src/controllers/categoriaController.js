const categoriaService = require("../services/categoriaService");

async function listar(req, res) {
  const categorias = await categoriaService.listarCategorias();
  res.status(200).json(categorias);
}

async function buscarPorId(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID deve ser um numero" });
  }

  const categoria = await categoriaService.buscarCategoriaPorId(id);
  if (!categoria) {
    return res.status(404).json({ erro: "Categoria nao encontrada" });
  }

  res.status(200).json(categoria);
}

async function criar(req, res) {
  const erro = categoriaService.validarCategoria(req.body);
  if (erro) {
    return res.status(400).json({ erro });
  }

  const nova = await categoriaService.criarCategoria(req.body);
  res.status(201).json(nova);
}

async function atualizar(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID deve ser um numero" });
  }

  const erro = categoriaService.validarCategoria(req.body);
  if (erro) {
    return res.status(400).json({ erro });
  }

  const atualizada = await categoriaService.atualizarCategoria(id, req.body);
  if (!atualizada) {
    return res.status(404).json({ erro: "Categoria nao encontrada" });
  }

  res.status(200).json(atualizada);
}

async function deletar(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "O ID deve ser um numero" });
  }

  const status = await categoriaService.deletarCategoria(id);

  if (status === "TEM_TAREFAS") {
    return res
      .status(409)
      .json({ erro: "Nao e possivel excluir categoria com tarefas vinculadas" });
  }

  if (status === "NAO_ENCONTRADO") {
    return res.status(404).json({ erro: "Categoria nao encontrada" });
  }

  res.status(204).send();
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
