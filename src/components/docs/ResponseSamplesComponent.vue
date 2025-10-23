<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  responses: {
    type: Object,
    required: true
  }
})

const activeStatusCode = ref(null)
const activeExampleName = ref(null)

const activeExample = computed(() => {
  if (!activeStatusCode.value || !activeExampleName.value) {
    return null
  }
  
  try {
    return props.responses[activeStatusCode.value]
                .content['application/json']
                .examples[activeExampleName.value]
  } catch (e) {
    return null
  }
})

function selectStatusCode(statusCode) {
  activeStatusCode.value = statusCode
  activeExampleName.value = null
  
  try {
    const content = props.responses[statusCode].content
    if (content && content['application/json'] && content['application/json'].examples) {
      activeExampleName.value = Object.keys(content['application/json'].examples)[0]
    }
  } catch (e) {
  }
}

if (Object.keys(props.responses).length > 0) {
  selectStatusCode(Object.keys(props.responses)[0])
}
</script>

<template>
  <div class="response-samples">
    <h3 class="widget-title">Respostas (Response)</h3>
    
    <div class="status-tabs">
      <button
        v-for="(responseInfo, statusCode) in responses"
        :key="statusCode"
        :class="['tab', { 'active': statusCode === activeStatusCode }]"
        @click="selectStatusCode(statusCode)"
      >
        <span :class="['status-dot', `status-${Math.floor(Number(statusCode)/100)}xx`]"></span>
        {{ statusCode }}
        <span class="description">{{ responseInfo.description }}</span>
      </button>
    </div>

    <div v-if="activeStatusCode && responses[activeStatusCode].content" class="response-content">
      <div v-if="responses[activeStatusCode].content['application/json'] && responses[activeStatusCode].content['application/json'].examples">
        
        <div class="example-tabs">
          <button
            v-for="(example, name) in responses[activeStatusCode].content['application/json'].examples"
            :key="name"
            :class="['example-tab', { 'active': name === activeExampleName }]"
            @click="activeExampleName = name"
          >
            {{ example.summary || name }}
          </button>
        </div>

        <div v-if="activeExample" class="code-block">
          
          <p 
            v-if="activeExample.description" 
            class="example-description"
          >
            {{ activeExample.description }}
          </p>
          
          <pre>{{ JSON.stringify(activeExample.value, null, 2) }}</pre>
        </div>
      </div>
      
      <div v-else>
        <p>Esta resposta não retorna conteúdo no corpo.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.status-tabs {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 1rem;
}
.tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: -2px;
}
.tab:hover {
  background-color: #f7f7f7;
}
.tab.active {
  color: #2b6cb0;
  font-weight: 600;
  border-bottom-color: #2b6cb0;
}
.tab .description {
  margin-left: 0.5rem;
  color: #6b7280;
  font-weight: 400;
}
.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
/* 2xx = Sucesso (Verde) */
.status-2xx { background-color: #16a34a; }
/* 4xx = Erro do Cliente (Amarelo/Laranja) */
.status-4xx { background-color: #d97706; }
/* 5xx = Erro do Servidor (Vermelho) */
.status-5xx { background-color: #dc2626; }
/* 1xx, 3xx = Outros (Azul/Cinza) */
.status-1xx, .status-3xx { background-color: #0284c7; }


.response-content {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.example-tabs {
  display: flex;
  background-color: #f7f7f7;
  padding: 0.5rem;
  gap: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}
.example-tab {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  font-size: 0.8rem;
}
.example-tab.active {
  background-color: #e0e7ff;
  color: #3730a3;
  border-color: #3730a3;
  font-weight: 600;
}
.code-block {
  background-color: #0d1117;
}
.example-description {
  color: #aaa;
  font-size: 0.85rem;
  padding: 0.75rem 1.25rem 0;
  margin: 0;
}
pre {
  color: #d4d4d4;
  background-color: #0d1117;
  padding: 1rem 1.25rem;
  margin: 0;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9rem;
}
</style>