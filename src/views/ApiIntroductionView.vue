<script setup>
import { inject, computed } from 'vue'
import { marked } from 'marked'

/**
 * @file ApiIntroductionView.vue
 * @description A "página" lateral do sistema de exibição que inicia o
 * junto ao usuário na documentação de uma API. Mostra informações como
 * título, versão, contato e uma descrição geral da API. Também reutiliza
 * componentes de "widgets" para exibir tabelas de uso. Esta view é
 * acessada quando o usuário seleciona uma API na página inicial.
 * Com suporte à formatação Markdown para a descrição convertida em HTML.
 */

const apiSpec = inject('apiSpec')
const isLoading = inject('isLoadingSpec')

const apiInfo = computed(() => {
  return apiSpec.value ? apiSpec.value.info : null
})

// Converte a descrição de Markdown para HTML
const renderedDescription = computed(() => {
  if (apiInfo.value && apiInfo.value.description) {
    return marked(apiInfo.value.description)
  }
  return ''
})
</script>

<template>
  <article v-if="!isLoading && apiInfo" class="api-introduction">
    
    <h1 class="api-title">{{ apiInfo.title }}</h1>
    
    <span class="api-version">Versão: {{ apiInfo.version }}</span>
    
    <div v-if="apiInfo.contact" class="api-contact">
      <strong>Contato:</strong> 
      <a :href="`mailto:${apiInfo.contact.email}`">
        {{ apiInfo.contact.name || apiInfo.contact.email }}
      </a>
    </div>

    <hr class="divider" />

    <div classs="description-content" v-html="renderedDescription"></div>
    
  </article>
</template>

<style scoped>
.api-introduction {
  max-width: 800px;
}

.api-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.api-version {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.api-contact {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.api-contact a {
  color: #2b6cb0;
  text-decoration: none;
}
.api-contact a:hover {
  text-decoration: underline;
}

.divider {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #e2e8f0;
}

/* --- Estilizando o Conteúdo do Markdown --- */
.description-content :deep(h1),
.description-content :deep(h2),
.description-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.description-content :deep(h1) { font-size: 2rem; }
.description-content :deep(h2) { font-size: 1.75rem; }
.description-content :deep(h3) { font-size: 1.5rem; }

.description-content :deep(p) {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.description-content :deep(ul),
.description-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.description-content :deep(li) {
  margin-bottom: 0.5rem;
}

.description-content :deep(pre) {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', monospace;
}

.description-content :deep(code) {
  background-color: #f3f4f6;
  color: #c026d3;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Consolas', 'Monaco', monospace;
}

.description-content :deep(pre code) {
  background-color: transparent;
  color: inherit;
  padding: 0;
}
</style>