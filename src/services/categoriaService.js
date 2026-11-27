const { db } = require("../config/db");

async function listarCategorias() {
  const [linhas] = await db.query("SELECT * FROM categorias");
  return linhas;
}

async function buscarCategoriaPorId(id) {
  const [linhas] = await db.query("SELECT * FROM categorias WHERE id = ?", [id]);
  return linhas[0];
}

async function criarCategoria(dados) {
  const [resultado] = await db.query(
    "INSERT INTO categorias (nome) VALUES (?)",
    [dados.nome.trim()]
  );
  return await buscarCategoriaPorId(resultado.insertId);
}

async function atualizarCategoria(id, dados) {
  const [resultado] = await db.query(
    "UPDATE categorias SET nome = ? WHERE id = ?",
    [dados.nome.trim(), id]
  );
  if (resultado.affectedRows === 0) return null;
  return await buscarCategoriaPorId(id);
}

async function deletarCategoria(id) {
  // Regra 409: verifica se tem tarefas vinculadas
  const [tarefas] = await db.query(
    "SELECT id FROM tarefas WHERE categoria_id = ?",
    [id]
  );
  if (tarefas.length > 0) {
    return "TEM_TAREFAS";
  }

  const [resultado] = await db.query("DELETE FROM categorias WHERE id = ?", [id]);
  return resultado.affectedRows > 0 ? "DELETADO" : "NAO_ENCONTRADO";
}

function validarCategoria(dados) {
  if (!dados || typeof dados.nome !== "string" || dados.nome.trim() === "") {
    return "O nome da categoria e obrigatorio";
  }
  return null;
}

module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
  validarCategoria,
};
