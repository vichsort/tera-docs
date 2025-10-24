# Tera Docs

O projeto Tera Docs surge com a necessidade de manter atualizadas as documentações das APIs que desenvolvi. Usando o sistema de leitura de JSONs, o Tera transforma uma documentação chata em um ambiente para melhorar a experiência do desenvolvedor. Como? Com um painel simples mas moderno que permite a visualização de diferentes "pastas" de APIs. Cada API tendo sua introspecção de sistema com seus endpoints de entrada e saída.

## Método

Todos os dados são INGERIDOS e não GERADOS. Você precisa anexar a informação antes de qualquer coisa. Existem duas entradas.

### 1. O consumo

o anexo das APIs de consumo ocorre em `public/docs/index.json`. Você, ao abrir o arquivo, vai se deparar com este padrão:

```json
{
    "id": "bratz-api", // condizente com o arquivo de inserção
    "nome": "Bratz (API)",
    "descricao": "API para o sistema de ponto de venda Bratz.",
    "tags": ["Flask", "PostgreSQL", "Financeiro", "PDV"],
    "arquivoSpec": "/docs/bratz-api.json" ,
    "links": {
      "github": "https://github.com/vichsort/BratzCORE",
      // possível também adicionar outra variável: production,
      // que condiz com link de acesso ao sistema em produção.
      // "production": "http://link_online.com.br" 
    }
  },
```

Este arquivo é analisado pela página principal que lê estas APIs para possibilitar a leitura de cada item interno da mesma.

### 2. A inserção

A inserção condiz com os tópicos / endpoints / consumos de **UMA API CONSUMIDA**. Isso quer dizer que dentro deste sistema, você colocará os metadados que ocorrem em cada endpoint. O nome que você deu ao campo `id` do json da inserção deve ser o mesmo que o nome do arquivo json aqui. Por exemplo,

- Se você nomeou o id assim:

```json
"id": "faif-api"
```

- O arquivo que você deve criar será `faif-api.json`. Sem nenhum espaço, traço ou letra maíuscula. Esse padrão deve ser seguido para que seja positivamente lido pelo sistema interno de ingestão do serviço.

Como o sistema foi pensado para auxiliar o desenvolvedor, a leitura do sistema de inserção segue os padrões mais comuns de documentação de API atuais, o **OpenAPI 3.0**, serviço oferecido pela Swagger para garantir que, globalmente, as APIs abertas tenham uma garantia de utilidade e efetividade em sua documentação e linting.
Os campos obrigatórios do sistema de inserção são:

- info: (Objeto)
- - info.title: (String) - CRÍTICO. Usado no ApiIntroductionView e nos breadcrumbs do AppHeader.
- - info.version: (String) - Usado no ApiIntroductionView.
- - info.description: (String) - Altamente recomendado. O ApiIntroductionView vai renderizar (como markdown), mas não quebra se estiver ausente.

- tags: (Array) - Altamente recomendado.
- - Nosso DocsSidebar.vue é baseado em tags para agrupar os endpoints. Se estiver vazio, a sidebar vai agrupar tudo em "Outros" (o que pode ser ok), mas a experiência fica melhor se ele existir.

- paths: (Objeto) - CRÍTICO.
- - Se estiver vazio, o app não quebra, mas a sidebar ficará vazia. Para ser útil, ele precisa de pelo menos uma rota.

- Dentro de cada Rota (ex: "/users") e Método (ex: "get"):

- - operationId: (String) - O MAIS CRÍTICO DE TODOS.
- - - Usamos o operationId como o parâmetro de rota (:operationId) no Vue Router. Se um endpoint não tiver operationId, o router-link na sidebar não funcionará e o EndpointDetailView não saberá o que buscar.

- - summary: (String) - CRÍTICO.
- - - Usamos o summary como o texto do link na DocsSidebar e como o título (breadcrumb) no AppHeader quando você entra no EndpointDetailView.

- - responses: (Objeto) - CRÍTICO.
- - - Nosso ResponseSamples.vue exige este objeto.

- Dentro de cada Resposta (ex: "200"):

- - description: (String) - CRÍTICO.
- - - Nosso ResponseSamples.vue usa isso como o texto na aba de status (ex: "200 - Descrição da resposta").

Abaixo, um JSON com o formato mínimo esperado:

```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "Minha API",  // <-- Obrigatório (para Introdução e Breadcrumb)
    "version": "1.0.0"   // <-- Obrigatório (para Introdução)
  },
  "tags": [
    { "name": "Minha Tag" } // <-- Recomendado (para agrupar na sidebar)
  ],
  "paths": {
    "/meu/endpoint": {
      "get": {
        "tags": ["Minha Tag"],
        "summary": "Resumo do endpoint", // <-- Obrigatório (para Sidebar e Header)
        "operationId": "getMeuEndpoint", // <-- ABSOLUTAMENTE CRÍTICO (para navegação)
        
        "responses": {
          "200": {
            "description": "Sucesso", // <-- Obrigatório (para a aba de Resposta)
            
            // O bloco abaixo é opcional, mas sem ele
            // a aba de resposta ficará vazia.
            "content": {
              "application/json": {
                "examples": {
                  "exemplo1": {
                    "summary": "Exemplo de sucesso",
                    "value": { "ok": true }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```
