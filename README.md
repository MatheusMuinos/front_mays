# May's Flowers

Frontend de uma loja online de flores, desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## Sobre o projeto

O projeto implementa a interface de uma floricultura online, com páginas para visualização de produtos, detalhes do produto, carrinho, checkout e contato.

A aplicação está preparada para integração com uma API backend por meio de serviços centralizados usando Axios.

## Tecnologias

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Axios
* Context API

## Estrutura principal

```txt
src/
├── components/   # Componentes reutilizáveis
├── pages/        # Páginas da aplicação
├── services/     # Comunicação com API
├── context/      # Estado global
├── hooks/        # Hooks customizados
├── types/        # Tipos TypeScript
├── utils/        # Funções auxiliares
├── constants/    # Constantes do projeto
├── styles/       # Estilos globais
└── App.tsx       # Rotas principais
```

## Funcionalidades

* Página inicial com produtos em destaque
* Listagem de produtos
* Detalhes de produto
* Carrinho de compras
* Atualização de quantidade no carrinho
* Remoção de itens
* Checkout
* Página de contato
* Sistema de notificações
* Estados de loading e erro

## Como executar

Instale as dependências:

```bash
npm install
```

Execute o projeto em modo desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```txt
http://localhost:5173
```

## Variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=May's Flowers
VITE_ENV=development
```

## Scripts disponíveis

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run preview
```

Executa uma prévia do build.

```bash
npm run lint
```

Executa a verificação de lint.

## Aliases de importação

O projeto usa aliases para facilitar os imports:

```ts
import { Button } from "@components/index";
import { useAppContext } from "@context/AppContext";
import { productService } from "@services/api";
import type { Product } from "@/types";
```

## Integração com API

As chamadas HTTP ficam centralizadas em:

```txt
src/services/api.ts
```

Principais serviços:

* Produtos
* Pedidos
* Carrinho
* Contato

## Observações

O frontend está estruturado para funcionar com um backend local em:

```txt
http://localhost:3000/api
```

Algumas rotas podem depender da API estar ativa e configurada corretamente.