<script setup>
import { computed, inject } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const apiSpec = inject('apiSpec')
const route = useRoute()

// Vamos transformar a lista de 'paths' (que é por URL)
// em uma lista agrupada por 'TAGS' (que é como queremos exibir)
const groupedEndpoints = computed(() => {
  if (!apiSpec.value) return {}

  const groups = {}

  apiSpec.value.tags.forEach(tag => {
    groups[tag.name] = {
      description: tag.description,
      endpoints: []
    }
  })
  // Adiciona um grupo 'Outros' para endpoints sem tag
  groups['Outros'] = {
    description: "Endpoints sem categoria",
    endpoints: []
  }

  for (const [pathName, pathInfo] of Object.entries(apiSpec.value.paths)) {
    for (const [method, methodInfo] of Object.entries(pathInfo)) {
      
      const endpointData = {
        path: pathName,
        method: method,
        summary: methodInfo.summary,
        operationId: methodInfo.operationId
      }
      
      let tagName = 'Outros'
      if (methodInfo.tags && methodInfo.tags.length > 0) {
        tagName = methodInfo.tags[0]
      }

      if (groups[tagName]) {
        groups[tagName].endpoints.push(endpointData)
      }
    }
  }

  for (const groupName in groups) {
    if (groups[groupName].endpoints.length === 0) {
      delete groups[groupName]
    }
  }

  return groups
})
</script>

<template>
  <nav class="sidebar-nav">
    <RouterLink 
      :to="{ name: 'ApiIntroduction', params: { apiId: route.params.apiId } }"
      class="nav-item intro-link"
    >
      Overview (Introdução)
    </RouterLink>

    <div 
      v-for="(group, groupName) in groupedEndpoints" 
      :key="groupName" 
      class="nav-group"
    >
      <h3 class="group-title">{{ groupName }}</h3>
      
      <ul>
        <li v-for="endpoint in group.endpoints" :key="endpoint.operationId">
          <RouterLink
            :to="{ 
              name: 'EndpointDetail', 
              params: { 
                apiId: route.params.apiId, 
                operationId: endpoint.operationId 
              } 
            }"
            class="nav-item endpoint-link"
          >
            <span :class="['method', `method-${endpoint.method}`]">
              {{ endpoint.method.toUpperCase() }}
            </span>
            <span class="path">{{ endpoint.path }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  padding: 0;
}

.nav-group {
  margin-top: 1.5rem;
}

.group-title {
  font-size: 0.75rem; 
  font-weight: 700;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: block;
  padding: 0.5rem 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  color: #374151;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
}

.nav-item:hover {
  background-color: #e5e7eb;
}


.nav-item.router-link-exact-active {
  background-color: #e0e7ff;
  color: #3730a3;
  font-weight: 600;
}

.intro-link {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.endpoint-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Consolas', 'Monaco', monospace;
}

.endpoint-link .path {
  color: #1f2937;
  font-weight: 500;
}

/* --- Estilos dos Métodos (GET, POST, etc.) --- */
.method {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  min-width: 45px;
  text-align: center;
}

.method-get {
  background-color: #e0f2fe;
  color: #0284c7;
}
.method-post {
  background-color: #dcfce7;
  color: #16a34a;
}
.method-put {
  background-color: #fef3c7;
  color: #d97706;
}
.method-delete {
  background-color: #fee2e2;
  color: #dc2626;
}
.method-patch {
  background-color: #f3e8ff;
  color: #9333ea;
}
</style>