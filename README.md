# 🚀 LeadFlow API

API para captura, processamento e gerenciamento de leads, construída com **Node.js + TypeScript**, utilizando arquitetura em camadas, filas assíncronas e envio de e-mails.

---

## 📌 Sobre o projeto

O **LeadFlow** é um sistema backend responsável por:

- Capturar leads via API
- Validar dados de entrada
- Persistir no banco de dados
- Processar tarefas assíncronas com filas
- Enviar e-mails automáticos
- Permitir listagem com filtros e paginação

Projeto desenvolvido com foco em **boas práticas de arquitetura**, escalabilidade e código limpo.

---

## 🧱 Arquitetura

Controller → Service → Repository → Database  
                    ↓  
                  Queue → Worker → Email

---

## ⚙️ Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- BullMQ (Redis)
- Zod
- Nodemailer
- Handlebars

---

## 🚀 Funcionalidades

### ✅ Criar Lead
- Validação com Zod
- Verificação de e-mail duplicado
- Persistência no banco
- Envio para fila assíncrona

### 📄 Listar Leads
- Paginação
- Filtro por e-mail
- Filtro por data
- Ordenação por data

### ⚙️ Processamento Assíncrono
- Envio de e-mail
- Notificação interna

---

## 🔌 Endpoints

### ➕ Criar Lead
POST /leads

### 📋 Listar Leads
GET /leads?page=1&limit=10

---

## 🛠️ Configuração

```bash
git clone https://github.com/seu-repo/leadflow-api.git
cd leadflow-api
npm install
```

### .env
```
DATABASE_URL=
MAILTRAP_USER=
MAILTRAP_PASS=
```

---

## ▶️ Rodando

```bash
npm run dev
npm run worker
```

---

## 👨‍💻 Autor

Lucas Martins
