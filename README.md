# API de Tarefas — TaskFlow Produtividade

Projeto Final Individual das UCs de **Programação Back-End** e **Projetos de Software** — Curso Técnico em Desenvolvimento de Sistemas  
Escola SENAI "Santo Paschoal Crepaldi" — Turma 1-2026-SESI_DEV_OC_1

API REST desenvolvida com **Node.js**, **Express** e **MySQL** seguindo o padrão **MVC** para organização de tarefas diárias e categorias da empresa **TaskFlow Produtividade**.

---

## Sumário

- [Autora](#autora)
- [Tecnologias](#tecnologias)
- [Como executar o projeto](#como-executar-o-projeto)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Banco de dados](#banco-de-dados)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rotas da API (Endpoints)](#rotas-da-api-endpoints)
- [Testes e Placar (`npm run conferir`)](#testes-e-placar-npm-run-conferir)
- [Diagrama de Classes](#diagrama-de-classes)
- [Quadro Kanban (Sprints 1 e 2)](#quadro-kanban-sprints-1-e-2)
- [Reflexão Final](#reflexão-final)

---

## Autora

- **Maria Eduarda da Silva Mendes** — [@madumendes21](https://github.com/madumendes21)

---

## Tecnologias

| Tecnologia | Uso | Versão |
| :--- | :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript | 18+ |
| **Express** | Criação do servidor HTTP e gerenciamento de rotas | ^5.2.1 |
| **mysql2** | Conexão com o banco de dados MySQL (com Promises) | ^3.24.6 |
| **dotenv** | Carregamento de variáveis de ambiente via `.env` | ^18.0.9 |
| **nodemon** | Reinício automático do servidor em desenvolvimento | ^3.1.14 |
| **MySQL** | Banco de dados relacional (`todo_db`) | 8.0 |

---

## Como executar o projeto

**1. Clone o repositório e acesse a pasta**

```bash
git clone https://github.com
cd todo-api-maria
