# Plano de Projeto — API de Gestão da Livraria

**Grupo:** 3 · **Integrantes:** Luis Miguel, Ana Laura, Victor G, Maria M.
**Versão:** 1.0 · **Data:** 18/11/2026

> **Aviso de rascunho:** nomes, datas, horas, riscos e itens de infraestrutura abaixo são **valores de exemplo coerentes entre si**. Substitua pelos dados reais do grupo e refaça as contas das seções 7 e 8 se algum número mudar.

Siglas usadas: **RF** (requisito funcional), **RNF** (requisito não-funcional), **PO** (Product Owner), **RACI** (Responsible, Accountable, Consulted, Informed), **API** (Application Programming Interface), **CRUD** (criar, ler, atualizar, apagar), **CRUD** e **SQL** (linguagem de consulta a bancos de dados).

---

## 1. Visão geral

A livraria precisa organizar seu catálogo de livros e categorias, hoje controlado de forma manual. Este projeto constrói a **API de Gestão da Livraria**: um serviço de Back-End que permite cadastrar, consultar, atualizar, remover e buscar livros, e gerenciar as categorias a que eles pertencem. Qualquer sistema futuro da livraria (site, aplicativo, painel interno) poderá consumir essa API.

**Objetivo:** entregar uma API funcional, testada e documentada, dentro do prazo de 3 sprints, ao custo estimado de R$ 13.759,75 (seção 8).

**Justificativa:** concentrar as regras do catálogo num único serviço evita planilhas duplicadas, reduz erros de cadastro e prepara a livraria para novas interfaces.

## 2. Metodologia

O grupo adota uma abordagem **ágil, baseada em Scrum**, com **3 sprints de 2 semanas**. Escolhemos Scrum porque o escopo é pequeno e pode ser refinado a cada ciclo, e porque as reuniões curtas de planejamento e revisão mantêm os 5 integrantes alinhados. Na sprint planning de 16/10 o grupo distribuiu os papéis de Scrum (PO, Scrum Master e desenvolvedores), descritos na seção 9.

O acompanhamento é feito no **Project do GitHub**: cada tarefa é uma _issue_ com estimativa e responsável (assignee), movida entre as colunas A fazer, Em andamento e Concluído.

## 3. Escopo

### 3.1. Escopo incluído

- CRUD de livros (cadastro, listagem, consulta por id, atualização e remoção).
- Busca de livros por título, autor ou categoria.
- CRUD de categorias.
- Banco de dados MySQL modelado e acessado com SQL puro.
- Testes da API, documentação das rotas em README e disponibilização da API em ambiente hospedado.

### 3.2. Escopo excluído

- Autenticação e controle de usuários.
- Vendas, carrinho e pagamentos.
- Controle de estoque.
- Interface gráfica (Front-End).

Esses itens ficaram de fora para caber no prazo e no orçamento. Nenhum deles aparece como requisito ou issue (rastreabilidade, linha 3, seção 10).

### 3.3. Premissas e restrições

- **Premissas:** a livraria fornece os dados iniciais do catálogo; o grupo mantém os 5 integrantes até a defesa.
- **Restrições:** prazo de 3 sprints; orçamento da seção 8; tecnologias fixas (Node.js, Express e MySQL com mysql2).

### 3.4. Critérios de aceitação

O escopo é considerado entregue quando todos os requisitos funcionais (seção 4.1) passam nos testes da API, as rotas estão documentadas no README e a API responde no ambiente hospedado.

## 4. Requisitos

### 4.1. Requisitos funcionais

A tabela abaixo lista o que a API deve fazer e como cada requisito é verificado.

| Código | Descrição                                    | Critério de aceitação                                                                                               |
| ------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| RF001  | Cadastrar livro                              | `POST /livros` com título, autor e categoria válidos retorna 201 e o livro criado                                   |
| RF002  | Listar livros                                | `GET /livros` retorna 200 e a lista completa em JSON                                                                |
| RF003  | Consultar livro por id                       | `GET /livros/:id` retorna 200 com o livro, ou 404 se não existir                                                    |
| RF004  | Atualizar livro                              | `PUT /livros/:id` retorna 200 e o livro atualizado, ou 404 se não existir                                           |
| RF005  | Remover livro                                | `DELETE /livros/:id` retorna 204, ou 404 se não existir                                                             |
| RF006  | Buscar livros por título, autor ou categoria | `GET /livros?titulo=&autor=&categoria=` retorna apenas livros que atendem ao filtro                                 |
| RF007  | Gerenciar categorias (CRUD)                  | Rotas `/categorias` criam, listam, consultam, atualizam e removem categorias, com os mesmos códigos HTTP dos livros |

### 4.2. Requisitos não-funcionais

| Código | Descrição                                                            | Critério de aceitação                                                       |
| ------ | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| RNF001 | API em Node.js e Express, banco MySQL acessado com mysql2 e SQL puro | Repositório não contém outro framework nem ORM                              |
| RNF002 | Respostas em JSON com códigos HTTP corretos                          | Testes verificam código e formato de cada rota                              |
| RNF003 | Validação de dados de entrada com mensagem de erro clara             | Dados inválidos retornam 400 com a descrição do problema                    |
| RNF004 | Consultas SQL parametrizadas                                         | Nenhuma consulta concatena dados do usuário no texto SQL                    |
| RNF005 | Rotas documentadas no README                                         | README lista método, caminho, parâmetros e exemplo de resposta de cada rota |
| RNF006 | API acessível em ambiente hospedado                                  | Rotas respondem a partir do endereço público do projeto                     |

## 5. Riscos

A matriz abaixo usa escala de 1 a 5 para probabilidade e impacto; a pontuação é a multiplicação dos dois (baixo até 8, médio de 9 a 15, alto a partir de 16). Os riscos médios foram os que definiram a reserva de contingência (seção 8.5).

| #   | Risco                                            | Prob. | Impacto | Pontuação | Classificação |
| --- | ------------------------------------------------ | ----- | ------- | --------- | ------------- |
| R1  | Estimativa subestimada, estourando as horas      | 4     | 3       | 12        | Médio         |
| R2  | Ausência de integrante durante uma sprint        | 3     | 4       | 12        | Médio         |
| R3  | Instabilidade da hospedagem ou do banco em nuvem | 3     | 3       | 9         | Médio         |
| R4  | Erro de SQL puro que cause falha em consultas    | 2     | 3       | 6         | Baixo         |

O plano de resposta de cada risco médio, com dono e gatilho:

| #   | Resposta                                                                                                                                              | Dono                        | Gatilho                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------- |
| R1  | Mitigar: revisar a estimativa no fim da Sprint 1 e replanejar; reserva de contingência cobre o estouro                                                | Integrante 1 (PO)           | Velocidade da Sprint 1 abaixo de 80% do planejado              |
| R2  | Mitigar: tarefas com um responsável e um consultado (RACI), para outro integrante assumir; reserva de contingência cobre horas extras                 | Integrante 2 (Scrum Master) | Integrante sem entregar nada por 3 dias úteis                  |
| R3  | Mitigar: manter script SQL de criação do banco no repositório e ambiente local de reserva; reserva de contingência cobre troca de plano de hospedagem | Integrante 5                | Indisponibilidade acima de 2 horas ou falha em teste de acesso |

## 6. Cronograma

O cronograma abaixo mostra as fases e marcos do projeto. O acompanhamento diário está no Project do GitHub: **<link do Project>**.

| Sprint / marco                                | Período       | Entregas principais                                                           | Depende de |
| --------------------------------------------- | ------------- | ----------------------------------------------------------------------------- | ---------- |
| Sprint 1                                      | 23/11 a 04/12 | Projeto Node/Express com mysql2, modelagem do banco, CRUD de livros (#1 a #7) | —          |
| Marco 1: revisão da estimativa (R1)           | 04/12         | Comparação entre horas previstas e realizadas                                 | Sprint 1   |
| Sprint 2                                      | 07/12 a 18/12 | Busca de livros, CRUD de categorias, validações (#8 a #10)                    | Sprint 1   |
| Sprint 3                                      | 21/12 a 08/01 | Testes, README e hospedagem da API (#11 a #13)                                | Sprint 2   |
| Marco 2: teste de acesso à API hospedada (R3) | 08/01         | API respondendo no endereço público                                           | Sprint 3   |
| Defesa oral                                   | a definir     | Apresentação do plano e da API                                                | Sprint 3   |

## 7. Estimativa e recursos

### 7.1. Técnica usada e justificativa

O grupo usou **Planning Poker** (cada integrante estima em pontos e as divergências são discutidas até chegar a um valor). A técnica aproveita a experiência de estimar em equipe feita na sprint planning de 16/10 e expõe diferenças de entendimento antes de programar. Cada ponto equivale a **2 horas**, e o total é de **120 pontos = 240 horas de desenvolvimento**.

### 7.2. Lista de recursos

- **Pessoas:** 5 integrantes (papéis na seção 9).
- **Tecnologias:** Node.js, Express, MySQL, mysql2, Jest (testes automatizados), Postman (testes manuais), VS Code, GitHub, todas gratuitas.
- **Infraestrutura:** hospedagem da API, banco de dados em nuvem e domínio (custos na seção 8.3).

## 8. Orçamento

O orçamento transforma as 240 horas da estimativa em dinheiro e soma infraestrutura, software e reserva. Os custos-hora são os de referência da atividade: Desenvolvedor(a) R$ 40,00 e Gerente de projeto/PO R$ 60,00.

### 8.1. Custo de pessoal

As horas de gestão (planejamento, reuniões de sprint, contato com o cliente, documentação) foram estimadas em **15%** das horas de desenvolvimento, dentro da faixa de 10% a 20% recomendada.

| Papel                | Horas | Custo-hora | Custo            |
| -------------------- | ----- | ---------- | ---------------- |
| Desenvolvimento      | 240   | R$ 40,00   | R$ 9.600,00      |
| Gestão (240 × 15%)   | 36    | R$ 60,00   | R$ 2.160,00      |
| **Total de pessoal** | 276   |            | **R$ 11.760,00** |

### 8.2. Infraestrutura

Os 3 meses de uso cobrem as 3 sprints, os testes de aceitação e a defesa.

| Item                                      | Valor            | Meses | Custo         |
| ----------------------------------------- | ---------------- | ----- | ------------- |
| Hospedagem da API (plano básico em nuvem) | R$ 30,00/mês     | 3     | R$ 90,00      |
| Banco de dados em nuvem                   | R$ 25,00/mês     | 3     | R$ 75,00      |
| Domínio da API                            | R$ 40,00 (único) | 1     | R$ 40,00      |
| **Total de infraestrutura**               |                  |       | **R$ 205,00** |

### 8.3. Software e serviços

Todas as ferramentas usadas são gratuitas (GitHub, VS Code, Postman, Jest), portanto o custo é **R$ 0,00**.

### 8.4. Resumo

| Bloco                                       | Valor            |
| ------------------------------------------- | ---------------- |
| 1. Pessoal                                  | R$ 11.760,00     |
| 2. Infraestrutura                           | R$ 205,00        |
| 3. Software e serviços                      | R$ 0,00          |
| Subtotal (1 + 2 + 3)                        | R$ 11.965,00     |
| 4. Reserva de contingência (subtotal × 15%) | R$ 1.794,75      |
| **TOTAL DO PROJETO**                        | **R$ 13.759,75** |

### 8.5. Justificativa da reserva de contingência

Usamos **15% de contingência** porque a matriz de riscos tem dois riscos médios no limite da faixa (R1 e R2, pontuação 12) e nenhum risco alto. Dez por cento seria pouco para absorver um estouro de horas ou a perda de um integrante; vinte por cento não se justifica sem riscos altos. A reserva também cobre a resposta ao R3 (troca de plano de hospedagem).

## 9. Equipe e papéis (RACI)

### 9.1. Papéis

| Integrante   | Papéis no projeto                                   | Papel no Scrum   |
| ------------ | --------------------------------------------------- | ---------------- |
| Integrante 1 | Gerente de projeto / PO, requisitos                 | Product Owner    |
| Integrante 2 | Desenvolvedor(a): banco de dados, gestão do Project | Scrum Master     |
| Integrante 3 | Desenvolvedor(a): rotas de livros                   | Desenvolvedor(a) |
| Integrante 4 | Desenvolvedor(a): rotas de categorias, validações   | Desenvolvedor(a) |
| Integrante 5 | Desenvolvedor(a): testes, riscos, hospedagem        | Desenvolvedor(a) |

### 9.2. Matriz RACI

A matriz mostra quem executa (R), aprova (A), é consultado (C) e é informado (I) em cada atividade. Cada linha tem exatamente um A e pelo menos um R.

| Atividade                            | Integrante 1 | Integrante 2 | Integrante 3 | Integrante 4 | Integrante 5 |
| ------------------------------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| Levantamento e revisão de requisitos | A/R          | C            | C            | C            | I            |
| Modelagem do banco de dados          | C            | A/R          | C            | C            | I            |
| Rotas de livros (CRUD e busca)       | I            | C            | A/R          | I            | C            |
| Rotas de categorias e validações     | I            | C            | I            | A/R          | C            |
| Testes da API                        | I            | C            | C            | C            | A/R          |
| Ambiente e hospedagem da API         | A            | C            | I            | I            | R            |
| Gestão do Project no GitHub          | A            | R            | I            | I            | I            |
| Acompanhamento da matriz de riscos   | A            | C            | I            | I            | R            |
| Documento de Planejamento do Projeto | A/R          | R            | C            | C            | C            |
| Documentação da API (README)         | I            | C            | R            | R            | A            |
| Preparação da defesa oral            | A            | R            | R            | R            | R            |

Carga de execução (R): Integrante 1 com 2, Integrante 2 com 4, Integrante 3 com 3, Integrante 4 com 3, Integrante 5 com 4. Ninguém concentra a maior parte das atividades.

---

## 10. Rastreabilidade

Esta seção mostra que as peças do plano conversam entre si.

### 10.1. Requisito → issue → estimativa → custo

A tabela mostra cada tarefa do Project, o requisito que ela atende, a estimativa em pontos e as horas que entram no orçamento (1 ponto = 2 h). A soma das horas é a base do custo de desenvolvimento (240 h × R$ 40,00 = R$ 9.600,00).

| Issue | Tarefa                                               | Requisito              | Pontos  | Horas   | Assignee          |
| ----- | ---------------------------------------------------- | ---------------------- | ------- | ------- | ----------------- |
| #1    | Criar projeto Node/Express e conexão mysql2          | RNF001                 | 8       | 16      | Integrante 2      |
| #2    | Modelar banco e script SQL (livros e categorias)     | RNF001                 | 13      | 26      | Integrante 2      |
| #3    | Criar rota `POST /livros`                            | RF001                  | 8       | 16      | Integrante 3      |
| #4    | Criar rota `GET /livros`                             | RF002                  | 5       | 10      | Integrante 3      |
| #5    | Criar rota `GET /livros/:id`                         | RF003                  | 5       | 10      | Integrante 3      |
| #6    | Criar rota `PUT /livros/:id`                         | RF004                  | 8       | 16      | Integrante 3      |
| #7    | Criar rota `DELETE /livros/:id`                      | RF005                  | 5       | 10      | Integrante 3      |
| #8    | Busca de livros por título, autor ou categoria       | RF006                  | 13      | 26      | Integrante 3      |
| #9    | CRUD de categorias                                   | RF007                  | 13      | 26      | Integrante 4      |
| #10   | Validação de dados, erros e consultas parametrizadas | RNF002, RNF003, RNF004 | 5       | 10      | Integrante 4      |
| #11   | Testes da API                                        | RF001 a RF007          | 21      | 42      | Integrante 5      |
| #12   | Documentação das rotas no README                     | RNF005                 | 8       | 16      | Integrantes 3 e 4 |
| #13   | Ambiente e hospedagem da API                         | RNF006                 | 8       | 16      | Integrante 5      |
|       | **Total**                                            |                        | **120** | **240** |                   |

### 10.2. Risco → resposta → cronograma ou contingência

R1 vira o Marco 1 (04/12) e usa a reserva; R2 tem responsável e consultado em cada atividade da RACI e usa a reserva; R3 vira o Marco 2 (08/01) e usa a reserva. R4 é baixo e é tratado nas validações da issue #10.

### 10.3. Escopo excluído → nenhum requisito, nenhuma issue

Autenticação, vendas, estoque e interface gráfica não aparecem nos requisitos (seção 4) nem nas issues (10.1).

### 10.4. RACI → assignees do Project

Cada R da matriz aparece como assignee das issues da atividade: banco (#1, #2) com o Integrante 2; livros (#3 a #8) com o Integrante 3; categorias e validações (#9, #10) com o Integrante 4; testes e hospedagem (#11, #13) com o Integrante 5; README (#12) com os Integrantes 3 e 4.

---

## Histórico de versões

| Versão | Data       | O que mudou                                    |
| ------ | ---------- | ---------------------------------------------- |
| v1.0   | 18/11/2026 | Consolidação inicial das peças de planejamento |

**Ajustes feitos na consolidação** (para a banca ver que as mudanças foram registradas, e não escondidas):

- A documentação da API passou a ser feita em README em vez de Swagger/OpenAPI, para ficar coerente com a stack do projeto (Node.js, Express e MySQL). O custo não mudou, pois ambos eram gratuitos.
- A atividade "Ambiente e hospedagem da API" foi adicionada à matriz RACI, pois o orçamento já previa hospedagem e a issue #13 não tinha atividade correspondente.
- A atividade "Rotas de categorias" passou a se chamar "Rotas de categorias e validações", para cobrir a issue #10.
