CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

DROP TABLE IF EXISTS tarefas;
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  prioridade ENUM('baixa', 'media', 'alta') NOT NULL,
  status ENUM('a_fazer', 'fazendo', 'feita') NOT NULL,
  categoria_id INT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Carga inicial obrigatória
INSERT INTO categorias (nome) VALUES ('Trabalho'), ('Estudos'), ('Pessoal');

INSERT INTO tarefas (titulo, prioridade, status, categoria_id) VALUES
('Configurar ambiente Node', 'alta', 'feita', 1),
('Estudar para a prova de PBE', 'alta', 'fazendo', 2),
('Organizar agenda da semana', 'baixa', 'a_fazer', 3);
