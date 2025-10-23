import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ApiDocumentationView from '../views/ApiDocsView.vue'
import ApiIntroductionView from '../views/ApiIntroductionView.vue'
import EndpointDetailView from '../views/EndpointDetailView.vue'

const routes = [
  {
    // -- Dashboard --
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    // -- Container da API --
    path: '/api/:apiId', // Ex: /api/bratz-api
    name: 'ApiDocs',
    component: ApiDocumentationView,

    // -- Renders de conteudo --
    children: [
      {
        // Rota "padrão" quando você acessa /api/bratz-api
        path: '', // Fica "em branco"
        name: 'ApiIntroduction',
        component: ApiIntroductionView // Um componente que mostra a descrição geral da API
      },
      {
        path: 'endpoint/:operationId', // Ex: /api/bratz-api/endpoint/getUserById
        name: 'EndpointDetail',
        component: EndpointDetailView,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router