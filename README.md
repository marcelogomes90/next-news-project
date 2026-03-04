# Portal de Noticias IBGE

Aplicacao em Next.js para listagem e visualizacao de noticias da API publica do IBGE, com filtros por termo, periodo e paginacao.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- TanStack React Query
- Tailwind CSS + Radix UI
- React Hook Form + Zod
- Vitest (testes unitarios)

## Como rodar

### 1. Requisitos

- Node.js >= 18.20 (recomendado usar a versao do `.nvmrc`)
- Yarn 1.22+

### 2. Instalar dependencias

```bash
yarn install
```

### 3. Ambiente de desenvolvimento

```bash
yarn dev
```

Aplicacao disponivel em `http://localhost:3000`.

## Scripts

- `yarn dev`: inicia ambiente de desenvolvimento
- `yarn build`: gera build de producao
- `yarn start`: inicia aplicacao em modo producao
- `yarn lint`: executa lint
- `yarn test`: executa testes unitarios
- `yarn test:watch`: executa testes em modo watch

## Testes

O projeto possui testes unitarios para regras de negocio e camada de acesso a dados:

- `src/lib/news.test.ts`
  - parsing e serializacao de filtros
  - transformacao de params para API
  - parse seguro de imagem
  - formatacao de data de publicacao
- `src/processes/news.test.ts`
  - contrato de chamadas HTTP para lista
  - comportamento de detalhe por id para diferentes formatos de resposta
  - fallback em erro de requisicao

Rodar todos os testes:

```bash
yarn test
```

## Arquitetura resumida

- `src/app`: paginas e componentes da interface
- `src/hooks/useNews.ts`: hooks do React Query (lista e detalhe)
- `src/processes/news.ts`: client HTTP e funcoes de consulta
- `src/lib/news.ts`: utilitarios de filtros, query params, imagem e data
- `src/interfaces/news.ts`: tipagens de dominio

### Fluxo de dados

1. A home le filtros da URL (`search params`).
2. Os filtros sao convertidos em params da API.
3. React Query busca e cacheia resultados.
4. Pagina de detalhe usa id da rota e reaproveita dados ja carregados quando possivel.

## Observacoes

- O favicon esta configurado com o arquivo `public/news.png`.
- Imagens remotas do IBGE estao habilitadas em `next.config.mjs`.
