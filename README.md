# Trampo Fácil — App Mobile

Frontend mobile do **Trampo Fácil**, marketplace que conecta trabalhadores a clientes.

## Stack

| Tecnologia | Uso |
|---|---|
| **React Native + Expo** | Framework mobile |
| **Expo Router** | Navegação file-based |
| **TypeScript** | Tipagem estática |
| **NativeWind (Tailwind)** | Estilização |
| **Zustand** | Estado global (auth) |
| **TanStack Query** | Cache e estado de servidor |
| **Axios** | Cliente HTTP |
| **React Hook Form + Zod** | Formulários e validação |

## Estrutura

```
app/                      # Rotas (Expo Router)
├── (auth)/               # Fluxo de autenticação
│   ├── sign-in.tsx       # Tela de login
│   └── sign-up.tsx       # Cadastro de trabalhador
├── (tabs)/               # Navegação principal
│   ├── home.tsx          # Busca de profissionais
│   └── profile.tsx       # Perfil e configurações
└── worker/[id].tsx       # Detalhes do profissional

src/
├── components/
│   ├── ui/               # Button, Input, Badge, Avatar, Divider
│   └── shared/           # WorkerCard, EmptyState, ErrorMessage
├── hooks/                # useWorkers, useJobCategories, useLocales
├── services/
│   ├── api/client.ts     # Axios + interceptors (token JWT)
│   ├── auth.service.ts
│   └── marketplace.service.ts
├── stores/
│   └── auth.store.ts     # Zustand (isAuthenticated, signIn, signOut)
├── types/api.types.ts    # Interfaces TypeScript
└── utils/validators.ts   # Schemas Zod
```

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variável de ambiente
cp .env.example .env
# Editar EXPO_PUBLIC_API_URL com o endereço da API

# 3. Iniciar
npm start
```

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `EXPO_PUBLIC_API_URL` | URL base da API (`tpf-api`) |
