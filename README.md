# Desafio Globo — Frontend

Este projeto é uma aplicação **React** simples que serve como **demonstração/cliente** para consumir e testar os endpoints (GraphQL) do backend do desafio.

➡️ **Backend (repositório principal):**  
https://github.com/leandro5g/desafio-backend-globo

---

## 🔗 Produção

A aplicação foi publicada utilizando **Render.com**.

➡️ **URL em produção:**  
> **https://desafio-frontend-globo.onrender.com/**

---

## ✨ Tecnologias

Principais dependências utilizadas:

- **React** `^19.2.0`
- **React DOM** `^19.2.0`
- **React Router DOM** `^7.13.0`
- **Axios** `^1.13.5`

---

## 🧭 Funcionalidades

### ✅ Home
- Lista os vídeos cadastrados
- Paginação simples para navegação entre páginas

### ✅ Video Details
- Exibe o vídeo selecionado (player)
- Mostra feedbacks do vídeo (comentários com nota/estrelas)
- Permite registrar um **novo feedback** via modal

---

## 🧱 Arquitetura do Projeto

Estrutura principal do código:

```text
src/
  components/
    FeedbackModal/
    FeedbackSection/
    Pagination/
    VideoList/

  context/
    (contextos da aplicação)

  hooks/
    usePagedVideos.ts

  lib/
    api.ts   (configuração do Axios)

  pages/
    Home.tsx
    VideoScreen.tsx

  services/
    feedbacks/
      querys.ts
      mutations.ts
      index.ts
    videos/
      querys.ts
      index.ts
```

### 📌 Explicação rápida

- **components/**: componentes reutilizáveis (modal de feedback, seção de feedback, paginação, listagem).
- **context/**: estados globais/contextos da aplicação (ex: vídeo selecionado).
- **hooks/**: hooks de dados e lógica (ex: `usePagedVideos` para paginação).
- **lib/**: configuração base de libs (ex: `axios`).
- **pages/**: rotas principais (**Home** e **Video Details**).
- **services/**: camada de integração com GraphQL (queries e mutations).

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
VITE_BASEURL=http://localhost:4000
```

> `VITE_BASEURL` deve apontar para a URL do backend (onde está o endpoint `/graphql`).

---

## ▶️ Como rodar localmente

### 1) Clonar o repositório
```bash
git clone <url-do-repo-frontend>
cd <pasta-do-projeto>
```

### 2) Instalar dependências
```bash
yarn
```

### 3) Rodar em desenvolvimento
```bash
yarn dev
```

A aplicação ficará disponível em:
- `http://localhost:5173` (padrão do Vite)

---

## 🔁 Integração com o Backend

Este frontend consome o backend via GraphQL.

Repositório do backend:
https://github.com/leandro5g/desafio-backend-globo

Certifique-se de:
- Ter o backend rodando localmente (ou usar a URL de produção)
- Configurar `VITE_BASEURL` corretamente

---

## 📝 Observações

- Este projeto foi feito com foco em ser **direto**, **objetivo** e fácil de testar endpoints.
- Caso esteja com **CORS**, a solução recomendada é configurar o backend para permitir o origin do frontend (em dev/produção).

---

## 📄 Licença

Este projeto é apenas para fins de desafio/demonstração.
