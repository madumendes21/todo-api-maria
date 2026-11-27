const { db } = require("../config/db");

const PRIORIDADES_VALIDAS = ["baixa", "media", "alta"];
const STATUS_VALIDOS = ["a_fazer", "fazendo", "feita"];

async function buscarTarefaPorId(id) {
  const [linhas] = await db.query(
    "SELECT tarefas.*, categorias.nome AS categoria FROM tarefas LEFT JOIN categorias ON tarefas.categoria_id = categorias.id WHERE tarefas.id = ?",
    [id]
  );
  return linhas[0];
}

async function listarTarefas(filtros) {
  const [linhas] = await db.query(
    "SELECT tarefas.*, categorias.nome AS categoria FROM tarefas LEFT JOIN categorias ON tarefas.categoria_id = categorias.id"
  );

  let resultado = linhas;

  if (filtros.status) {
    resultado = resultado.filter((t) => t.status === filtros.status);
  }

  if (filtros.prioridade) {
    resultado = resultado.filter((t) => t.prioridade === filtros.prioridade);
  }

  return resultado;
}

async function categoriaExiste(categoriaId) {
  if (categoriaId === null || categoriaId === undefined) return true;
  const [linhas] = await db.query("SELECT id FROM categorias WHERE id = ?", [
    categoriaId,
  ]);
  return linhas.length > 0;
}

async function criarTarefa(dados) {
  const catId = dados.categoria_id ?? null;
  const [resultado] = await db.query(
    "INSERT INTO tarefas (titulo, prioridade, status, categoria_id) VALUES (?, ?, ?, ?)",
    [dados.titulo.trim(), dados.prioridade, dados.status, catId]
  );
  return await buscarTarefaPorId(resultado.insertId);
}

async function atualizarTarefa(id, dados) {
  const catId = dados.categoria_id ?? null;
  const [resultado] = await db.query(
    "UPDATE tarefas SET titulo = ?, prioridade = ?, status = ?, categoria_id = ? WHERE id = ?",
    [dados.titulo.trim(), dados.prioridade, dados.status, catId, id]
  );

  if (resultado.affectedRows === 0) return null;
  return await buscarTarefaPorId(id);
}

async function atualizarParcialTarefa(id, dados) {
  const tarefa = await buscarTarefaPorId(id);
  if (!tarefa) return null;

  if (dados.titulo !== undefined) tarefa.titulo = dados.titulo;
  if (dados.prioridade !== undefined) tarefa.prioridade = dados.prioridade;
  if (dados.status !== undefined) tarefa.status = dados.status;
  if (dados.categoria_id !== undefined) tarefa.categoria_id = dados.categoria_id;

  return await atualizarTarefa(id, tarefa);
}

async function deletarTarefa(id) {
  const [resultado] = await db.query("DELETE FROM tarefas WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}

function validarTarefa(dados, completo) {
  if (!dados || typeof dados !== "object") {
    return "Envie os dados da tarefa em JSON";
  }

  if (completo && !dados.titulo) return "O titulo e obrigatorio";
  if (completo && !dados.prioridade) return "A prioridade e obrigatoria";
  if (completo && !dados.status) return "O status e obrigatorio";

  if (
    dados.titulo !== undefined &&
    (typeof dados.titulo !== "string" || dados.titulo.trim() === "")
  ) {
    return "O titulo deve ser um texto nao vazio";
  }

  if (
    dados.prioridade !== undefined &&
    !PRIORIDADES_VALIDAS.includes(dados.prioridade)
  ) {
    return "Prioridade invalida. Use: baixa, media ou alta";
  }

  if (dados.status !== undefined && !STATUS_VALIDOS.includes(dados.status)) {
    return "Status invalido. Use: a_fazer, fazendo ou feita";
  }

  if (
    dados.categoria_id !== undefined &&
    dados.categoria_id !== null &&
    typeof dados.categoria_id !== "number"
  ) {
    return "O categoria_id deve ser um numero";
  }

  return null;
}

module.exports = {
  buscarTarefaPorId,
  listarTarefas,
  categoriaExiste,
  criarTarefa,
  atualizarTarefa,
  atualizarParcialTarefa,
  deletarTarefa,
  validarTarefa,
};
