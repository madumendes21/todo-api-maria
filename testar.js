const URL = "http://localhost:3000";

async function req(metodo, rota, corpo = null, jsonBruto = null) {
  const opcoes = { method: metodo, headers: {} };
  if (jsonBruto !== null) {
    opcoes.headers["Content-Type"] = "application/json";
    opcoes.body = jsonBruto;
  } else if (corpo !== null) {
    opcoes.headers["Content-Type"] = "application/json";
    opcoes.body = JSON.stringify(corpo);
  }
  const res = await fetch(URL + rota, opcoes);
  let dados = null;
  try {
    dados = await res.json();
  } catch {}
  return { status: res.status, dados };
}

async function rodarTestes() {
  let s1Passou = 0, s1Total = 14;
  let s2Passou = 0, s2Total = 8;
  let bonusPassou = 0, bonusTotal = 4;

  const check = (condicao, nome, sprint) => {
    if (condicao) {
      console.log(`✅ [${sprint}] ${nome}`);
      if (sprint === "S1") s1Passou++;
      if (sprint === "S2") s2Passou++;
      if (sprint === "BONUS") bonusPassou++;
    } else {
      console.log(`❌ [${sprint}] ${nome}`);
    }
  };

  console.log("=== INICIANDO TESTES DO CONTRATO DA API ===\n");

  // --- SPRINT 1: TAREFAS ---
  let r = await req("GET", "/tarefas");
  check(r.status === 200 && Array.isArray(r.dados), "GET /tarefas -> 200", "S1");

  r = await req("GET", "/tarefas/abc");
  check(r.status === 400 && r.dados?.erro, "GET /tarefas/abc (id texto) -> 400", "S1");

  r = await req("GET", "/tarefas/99999");
  check(r.status === 404 && r.dados?.erro, "GET /tarefas/99999 (inexistente) -> 404", "S1");

  r = await req("POST", "/tarefas", { prioridade: "alta", status: "a_fazer" });
  check(r.status === 400 && r.dados?.erro, "POST /tarefas sem titulo -> 400", "S1");

  r = await req("POST", "/tarefas", { titulo: "Teste", prioridade: "média", status: "a_fazer" });
  check(r.status === 400 && r.dados?.erro, "POST /tarefas prioridade com acento -> 400", "S1");

  r = await req("POST", "/tarefas", { titulo: "Teste", prioridade: "alta", status: "a fazer" });
  check(r.status === 400 && r.dados?.erro, "POST /tarefas status com espaco -> 400", "S1");

  const criada = await req("POST", "/tarefas", {
    titulo: "Tarefa Teste Automatico",
    prioridade: "media",
    status: "a_fazer",
  });
  check(criada.status === 201 && criada.dados?.id, "POST /tarefas valida -> 201", "S1");
  const idTarefa = criada.dados?.id;

  r = await req("GET", `/tarefas/${idTarefa}`);
  check(r.status === 200 && r.dados?.titulo === "Tarefa Teste Automatico", "GET /tarefas/:id -> 200", "S1");

  r = await req("PUT", `/tarefas/${idTarefa}`, {
    titulo: "Tarefa Editada PUT",
    prioridade: "alta",
    status: "fazendo",
  });
  check(r.status === 200 && r.dados?.titulo === "Tarefa Editada PUT", "PUT /tarefas/:id -> 200", "S1");

  r = await req("PUT", "/tarefas/99999", { titulo: "X", prioridade: "alta", status: "feita" });
  check(r.status === 404, "PUT /tarefas/99999 -> 404", "S1");

  r = await req("PATCH", `/tarefas/${idTarefa}`, { status: "feita" });
  check(r.status === 200 && r.dados?.status === "feita", "PATCH /tarefas/:id -> 200", "S1");

  r = await req("PATCH", `/tarefas/${idTarefa}`, { status: "concluida" });
  check(r.status === 400, "PATCH /tarefas/:id status invalido -> 400", "S1");

  r = await req("DELETE", `/tarefas/${idTarefa}`);
  check(r.status === 204, "DELETE /tarefas/:id -> 204", "S1");

  r = await req("DELETE", `/tarefas/${idTarefa}`);
  check(r.status === 404, "DELETE /tarefas/:id ja apagada -> 404", "S1");

  // --- SPRINT 2: CATEGORIAS E JOIN ---
  r = await req("GET", "/categorias");
  check(r.status === 200 && Array.isArray(r.dados), "GET /categorias -> 200", "S2");

  r = await req("POST", "/categorias", {});
  check(r.status === 400 && r.dados?.erro, "POST /categorias sem nome -> 400", "S2");

  const cat = await req("POST", "/categorias", { nome: "Categoria Teste" });
  check(cat.status === 201 && cat.dados?.id, "POST /categorias valida -> 201", "S2");
  const idCat = cat.dados?.id;

  r = await req("GET", `/categorias/${idCat}`);
  check(r.status === 200 && r.dados?.nome === "Categoria Teste", "GET /categorias/:id -> 200", "S2");

  r = await req("POST", "/tarefas", {
    titulo: "Tarefa com Categoria Inexistente",
    prioridade: "baixa",
    status: "a_fazer",
    categoria_id: 99999,
  });
  check(r.status === 400, "POST /tarefas categoria inexistente -> 400", "S2");

  const tCat = await req("POST", "/tarefas", {
    titulo: "Tarefa com JOIN",
    prioridade: "alta",
    status: "fazendo",
    categoria_id: idCat,
  });
  check(tCat.status === 201 && tCat.dados?.categoria === "Categoria Teste", "JOIN retorna nome da categoria", "S2");

  r = await req("DELETE", `/categorias/${idCat}`);
  check(r.status === 409 && r.dados?.erro, "DELETE /categorias com tarefas -> 409", "S2");

  await req("DELETE", `/tarefas/${tCat.dados?.id}`);
  r = await req("DELETE", `/categorias/${idCat}`);
  check(r.status === 204, "DELETE /categorias vazia -> 204", "S2");

  // --- BÔNUS ---
  r = await req("GET", "/tarefas?status=fazendo");
  check(r.status === 200 && r.dados.every((t) => t.status === "fazendo"), "BONUS: Filtro ?status=fazendo", "BONUS");

  r = await req("GET", "/tarefas?prioridade=alta");
  check(r.status === 200 && r.dados.every((t) => t.prioridade === "alta"), "BONUS: Filtro ?prioridade=alta", "BONUS");

  const catBonus = await req("POST", "/categorias", { nome: "Cat Bonus" });
  r = await req("PUT", `/categorias/${catBonus.dados?.id}`, { nome: "Cat Editada" });
  await req("DELETE", `/categorias/${catBonus.dados?.id}`);
  check(r.status === 200 && r.dados?.nome === "Cat Editada", "BONUS: PUT /categorias/:id -> 200", "BONUS");

  r = await req("POST", "/tarefas", null, '{"titulo": "JSON quebrado"');
  check(r.status === 400 && r.dados?.erro, "BONUS: JSON mal escrito -> 400", "BONUS");

  console.log("\n=== PLACAR FINAL ===");
  console.log(`Sprint 1: ${s1Passou}/${s1Total}`);
  console.log(`Sprint 2: ${s2Passou}/${s2Total}`);
  console.log(`Bonus:    ${bonusPassou}/${bonusTotal}`);
}

rodarTestes();
