# S/4HANA Migration Command Center (MVP)

Este repositório contém o código-fonte de um painel de controle executivo (Dashboard) focado na gestão de migrações SAP S/4HANA.

O projeto é uma **Proof of Concept (PoC)** para demonstrar a aceleração do desenvolvimento de software utilizando Inteligência Artificial Generativa como "braço de execução".

## 🎯 Objetivo do Projeto
Demonstrar como um Arquiteto de Soluções pode utilizar assistentes de codificação (neste caso, Claude Code) para sair da concepção arquitetural e chegar a um MVP funcional de *front-end* moderno, superando a curva de aprendizado de novas stacks (React/Vite) em tempo recorde.

## 🚀 Tech Stack
* **Core:** React (v18+)
* **Build Tool:** Vite
* **Estilização:** Tailwind CSS
* **Visualização de Dados:** Recharts
* **Ícones:** Lucide React

## ⚡ Funcionalidades (MVP)
* **Dashboard Executivo:** Visão geral de status de migração (Wave planning, Cutover status).
* **Data Visualization:** Gráficos interativos para monitoramento de objetos de migração e qualidade de dados.
* **UI Responsiva:** Layout moderno adaptado para desktop e mobile.
* **Mock Data:** Estrutura de dados simulada para representação de cenários reais de S/4HANA.

## 🛠️ Como rodar o projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/feliponi/migration-war-room
    ```

2.  **Instale as dependências:**
    ```bash
    cd migration-war-room
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  O projeto estará rodando em `http://localhost:5173` (ou porta similar indicada no terminal).

## 📝 Nota do Autor
Todo o código "boilerplate", a configuração do Vite e a lógica dos componentes React foram gerados através de prompts de arquitetura e refinamento via IA. O foco humano (meu papel) foi na definição de requisitos de negócio, validação da UX e integridade da lógica de migração SAP.

---
**Luiz [Sobrenome]**
*Senior Technical Executive & Solution Architect*
[Link para seu LinkedIn]
