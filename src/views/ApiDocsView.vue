<script setup>
import { ref, onMounted, watch, provide } from 'vue'
import { useRoute } from 'vue-router'
import DocsSidebar from '@/components/docs/DocsSidebarComponent.vue'

const route = useRoute()
const apiSpec = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fetchApiSpec = async (apiId) => {
  isLoading.value = true
  error.value = null
  apiSpec.value = null

  try {
    // Convenção: O 'apiId' da rota (ex: "faif-api")
    // é o nome do arquivo (ex: "/docs/faif-api.json")
    const response = await fetch(`/docs/${apiId}.json`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Arquivo de especificação não encontrado em /docs/${apiId}.json`)
      }
      throw new Error(`Erro ao buscar a API: ${response.statusText}`)
    }
    
    apiSpec.value = await response.json()
    
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchApiSpec(route.params.apiId)
})

// 'watch' observa mudanças no 'apiId' da URL.
// Se o usuário pular de uma doc (ex: /api/faif-api) para
// outra (ex: /api/bratz-api) sem voltar pro Home,
// este 'watch' garante que os novos dados sejam buscados.
watch(() => route.params.apiId, (newId) => {
  if (newId) {
    fetchApiSpec(newId)
  }
})

// Isso "envia" os dados para todos os componentes
// filhos (Sidebar, EndpointDetail, etc.) sem precisar
// passar 'props' manualmente por toda a árvore.
provide('apiSpec', apiSpec)
provide('isLoadingSpec', isLoading)
provide('specError', error)
</script>

<template>
  <div v-if="isLoading" class="spec-loading">
    Carregando especificação da API...
  </div>

  <div v-else-if="error" class="spec-error">
    <h2>Erro ao carregar a documentação</h2>
    <p>{{ error }}</p>
  </div>
  
  <div v-else-if="apiSpec" class="docs-layout">
    
    <aside class="docs-sidebar">
      <DocsSidebar />
    </aside>
    
    <main class="docs-content">
      <router-view />
    </main>
    
    </div>
</template>

<style scoped>
.docs-layout {
  display: flex;
  height: calc(100vh - 64px);
  width: 100%;
}

.docs-sidebar {
  width: 280px;
  flex-shrink: 0;
  background-color: #f7f7f7;
  border-right: 1px solid #e2e8f0;
  padding: 1.5rem;
  overflow-y: auto;
}

.docs-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #ffffff;
}

.spec-loading, .spec-error {
  padding: 4rem;
  text-align: center;
  color: #555;
  font-size: 1.2rem;
}
.spec-error {
  color: #d93025;
}
</style>