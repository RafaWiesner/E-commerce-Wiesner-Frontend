# E-commerce Frontend

Frontend do projeto E-commerce desenvolvido com React, Vite e Tailwind CSS.

## Tecnologias Utilizadas

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione a URL da API:
     ```
     VITE_API_URL=http://localhost:3000/api
     ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a build de produção
- `npm run preview`: Visualiza a build de produção localmente
- `npm run lint`: Executa o linter

## Estrutura do Projeto

```
frontend/
├── assets/        # Imagens e outros recursos estáticos
├── components/    # Componentes reutilizáveis
├── context/       # Contextos do React
├── pages/         # Páginas da aplicação
├── services/      # Serviços e configurações da API
└── data/          # Dados estáticos
``` 