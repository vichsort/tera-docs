<script setup>
import { inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked' // Para a descrição do endpoint

// Importa os "widgets" que acabamos de criar
import ParameterTable from '@/components/docs/ParameterTableComponent.vue'
import ResponseSamples from '@/components/docs/ResponseSamplesComponent.vue'

// 1. Pega os dados globais e a rota atual
const apiSpec = inject('apiSpec')
const isLoading = inject('isLoadingSpec')
const route = useRoute() // Para pegar o :operationId da URL

// 2. O "Cérebro" deste componente
//    Ele encontra os dados exatos deste endpoint
const endpointData = computed(() => {
  if (!apiSpec.value) return null
  
  const operationId = route.params.operationId
  
  // Procura em todos os paths e métodos pelo operationId
  for (const [pathName, pathInfo] of Object.entries(apiSpec.value.paths)) {
    for (const [method, methodInfo] of Object.entries(pathInfo)) {
      if (methodInfo.operationId === operationId) {
        return {
          path: pathName,
          method: method,
          ...methodInfo // ...inclui summary, description, parameters, responses, etc.
        }
      }
    }
  }
  return null // Endpoint não encontrado
})

// 3. Renderiza a descrição (assim como na Introdução)
const renderedDescription = computed(() => {
  if (endpointData.value && endpointData.value.description) {
    return marked(endpointData.value.description)
  }
  return ''
})
</script>

<template>
  <div v-if="isLoading">
    Carregando...
  </div>
  
  <div v-else-if="!endpointData" class="not-found">
    <h2>Endpoint não encontrado</h2>
    <p>O operationId "{{ route.params.operationId }}" não foi localizado na especificação.</p>
  </div>
  
  <article v-else class="endpoint-detail">
    
    <header>
      <div class="summary-title">{{ endpointData.summary }}</div>
      <div class="path-title">
        <span :class="['method', `method-${endpointData.method}`]">
          {{ endpointData.method.toUpperCase() }}
        </span>
        <code class="path">{{ endpointData.path }}</code>
      </div>
    </header>
    
    <div class="description-content" v-html="renderedDescription"></div>
    
    <hr class="divider">
    
    <ParameterTable :parameters="endpointData.parameters" />
    
    <hr class="divider">
    
    <ResponseSamples :responses="endpointData.responses" />

  </article>
</template>

<style scoped>
.endpoint-detail {
  max-width: 900px;
}
/* ... Estilos do :deep(pre/code) ... */
.description-content :deep(p) { line-height: 1.6; }
.description-content :deep(pre) {
  background-color: #1e1e1e; color: #d4d4d4; padding: 1rem;
  border-radius: 8px; overflow-x: auto;
}
/* ... etc ... */

/* --- Cabeçalho --- */
.summary-title {
  font-size: 2rem; /* 32px */
  font-weight: 700;
  color: #111827;
}
.path-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #f7f7f7;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.path-title .path {
  font-size: 1.25rem; /* 20px */
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 600;
  color: #1f2937;
}

.divider {
  margin: 2.5rem 0;
  border: 0;
  border-top: 1px solid #e2e8f0;
}

.not-found {
  padding: 2rem;
  text-align: center;
  color: #dc2626;
}

/* --- Métodos (copiado da sidebar para consistência) --- */
.method {
  font-size: 1rem; /* 16px */
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #fff;
  min-width: 80px;
  text-align: center;
}
.method-get { background-color: #0284c7; }
.method-post { background-color: #16a34a; }
.method-put { background-color: #d97706; }
.method-delete { background-color: #dc2626; }
.method-patch { background-color: #9333ea; }
</style>