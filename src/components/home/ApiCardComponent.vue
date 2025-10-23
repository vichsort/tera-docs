<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

// Ele espera um objeto 'api' que contenha as infos.
const props = defineProps({
  api: {
    type: Object,
    required: true
  }
})

const defaultCardColor = '#2b6cb0'

// Se o objeto 'api' tiver uma propriedade 'color', usa ela.
// Senão, usa o azul padrão.
const cardColor = computed(() => {
  return props.api.color || defaultCardColor
})

//    Ex: /api/bratz-api
const apiLink = computed(() => {
  return `/api/${props.api.id}`
})

// Mapeia nomes de tags (em minúsculo) para cores
const tagColorMap = {
  // backend
  'flask': { background: '#333333', color: '#ffffff' },
  'php': { background: '#7A86B8', color: '#ffffff' },
  'node': { background: '#68A063', color: '#ffffff' },
  
  // database
  'postgresql': { background: '#336791', color: '#ffffff' },
  'mysql': { background: '#00758F', color: '#ffffff' },
  'mariadb': { background: '#003545', color: '#ffffff' },
  
  // frontend
  'vue.js': { background: '#42b883', color: '#ffffff' },
  'react': { background: '#61dafb', color: '#000000' },
  'angular': { background: '#dd0031', color: '#ffffff' },
  
  // outros: sem cores específicas
}

// Função que retorna o objeto de estilo para a tag
function getTagStyle(tag) {
  const normalizedTag = tag.toLowerCase()
  
  // Se a tag estiver no mapa, retorna as cores.
  if (tagColorMap[normalizedTag]) {
    return {
      backgroundColor: tagColorMap[normalizedTag].background,
      color: tagColorMap[normalizedTag].color,
      borderColor: 'transparent' // Remove borda se for colorida
    }
  }
  
  // Senão, retorna o estilo padrão (cinza)
  return {} // O estilo padrão já está no CSS
}
</script>

<template>
  <RouterLink :to="apiLink" class="api-card">
    
    <header 
      class="card-header" 
      :style="{ backgroundColor: cardColor }"
    >
      <h3 class="card-title">{{ api.nome }}</h3>
      <p class="card-subtitle">{{ api.descricao }}</p>
    </header>
    
    <div class="card-body">
      </div>
    
   <footer class="card-footer">
      <div class="tags-container">
        <span 
          v-for="tag in api.tags" 
          :key="tag" 
          class="api-tag"
          :style="getTagStyle(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </footer>
    
  </RouterLink>
</template>

<style scoped>
.api-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 8px;
  border: 1px solid #dadce0;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  background-color: #ffffff;
  overflow: hidden;

  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.api-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px 0 rgba(60,64,67,0.3), 0 6px 20px 0 rgba(60,64,67,0.19);
}

.card-header {
  padding: 1.5rem;
  color: #ffffff;
}

.card-title {
  font-size: 1.375rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0.25rem 0 0 0;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-body {
  flex-grow: 1;
  min-height: 100px;
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  background-color: #ffffff;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.api-tag {
  background-color: #f1f3f4;
  color: #3c4043;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>