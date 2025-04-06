# WenLock - Sistema de Gerenciamento de Usuários

## Sobre o Projeto
WenLock é um sistema de gerenciamento de usuários com interface moderna desenvolvida em React. O sistema oferece funcionalidades de CRUD (Criar, Ler, Atualizar, Deletar) para gerenciamento de usuários, com uma interface intuitiva.

## Tecnologias Utilizadas

### Frontend:
- **React**
- **TypeScript**
- **React Router DOM**
- **React Hook Form**
- **Zod** (validação)
- **Material UI**
- **TanStack Query (React Query)**
- **Axios**
- **SASS/SCSS**
- **React Toastify**

### Ferramentas de Desenvolvimento:
- **Vite**
- **TypeScript**

## Pré-requisitos
- **Node.js**
- **npm**
- **API de backend rodando** (URL no arquivo `.env`)

## 🚀 Como Começar

Clone o Repositório:

### `git clone https://github.com/itseduardolima/wenlock.git`

Instale as Dependências:

### `cd wenlock`
### `npm install`

No diretório do projeto, você pode executar:

### `npm run dev`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:5173/] para visualizá-lo no navegador.

## Estrutura do Projeto

```plaintext
wenlock/
├── src/
│   ├── assets/           # Ícones e recursos
│   ├── components/       # Componentes reutilizáveis
│   ├── hooks/            # Custom hooks (React)
│   ├── interface/        # Interfaces TypeScript
│   ├── layouts/          # Componentes de layout
│   ├── pages/            # Páginas da aplicação
│   ├── providers/        # Providers React (Context API)
│   ├── schemas/          # Schemas de validação (Zod)
│   ├── services/         # Serviços para comunicação com API
│   ├── styles/           # Arquivos SCSS
│   ├── App.tsx           # Componente raiz
│   └── main.tsx          # Ponto de entrada React
├── .env                  # Variáveis de ambiente
├── package.json          # Dependências e scripts
├── vite.config.ts        # Configuração do Vite
└── tsconfig.json         # Configuração do TypeScript
```

## Funcionalidades Principais

### 1. Gerenciamento de Usuários

- **Listar Usuários**: Visualização paginada com pesquisa.
- **Criar Usuário**: Formulário com validação para cadastro.
- **Visualizar Usuário**: Drawer com detalhes do usuário.
- **Editar Usuário**: Formulário para atualização de dados.
- **Excluir Usuário**: Modal de confirmação para exclusão.

### 2. Interface

- Tema personalizado com componentes do Material UI
- Notificações toast para feedback ao usuário
- Navegação intuitiva com breadcrumbs
- Sidebar colapsável para melhor uso do espaço

### 3. Validação de Dados

- Validação de formulários com Zod e React Hook Form
- Feedback visual de erros para campos inválidos
- Contadores de caracteres para campos com limite

## Integração com API

O sistema foi projetado para consumir uma API REST. A comunicação é feita através do Axios, e os endpoints esperados são:

- `GET /users` - Listar usuários (paginado)
- `GET /users/:id` - Obter detalhes de um usuário
- `POST /users` - Criar um novo usuário
- `PATCH /users/:id` - Atualizar um usuário
- `DELETE /users/:id` - Excluir um usuário

### Estrutura de Dados

#### Usuário

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "matricula": "string",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

## Hooks Personalizados

O projeto utiliza hooks personalizados para gerenciar operações e estado:

- `useUsers`: Gerencia listagem paginada de usuários
- `useUserDetails`: Gerencia detalhes de um usuário específico
- `useCreateUser`: Lida com a criação de usuários
- `useEditUser`: Lida com a edição de usuários
- `useDeleteUser`: Gerencia a exclusão de usuários