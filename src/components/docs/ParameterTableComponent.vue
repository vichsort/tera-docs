<script setup>
defineProps({
  parameters: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="parameters" v-if="parameters && parameters.length > 0">
    <h3 class="widget-title">Parâmetros</h3>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Em (in)</th>
          <th>Descrição</th>
          <th>Obrigatório</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param in parameters" :key="param.name">
          <td>
            <code class="param-name">{{ param.name }}</code>
            <span class="param-type">{{ param.schema.type }}</span>
          </td>
          <td>
            <span :class="['param-in', `in-${param.in}`]">{{ param.in }}</span>
          </td>
          <td class="description">
            {{ param.description }}
            <span v-if="param.schema.example" class="example">
              Ex: <code>{{ param.schema.example }}</code>
            </span>
          </td>
          <td>
            <span v-if="param.required" class="required">Sim</span>
            <span v-else>Não</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.widget-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
thead {
  background-color: #f7f7f7;
}
th, td {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  text-align: left;
  vertical-align: top;
}
th {
  font-weight: 600;
  color: #374151;
}
.param-name {
  font-weight: 600;
  color: #0b5b99;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.95rem;
}
.param-type {
  display: block;
  font-size: 0.8rem;
  color: #6b7280;
}
.param-in {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}
.in-path { background-color: #fee2e2; color: #dc2626; }
.in-query { background-color: #e0f2fe; color: #0284c7; }
.in-header { background-color: #dcfce7; color: #16a34a; }

.description {
  line-height: 1.5;
  color: #333;
}
.example {
  display: block;
  margin-top: 0.25rem;
  color: #555;
  font-size: 0.85rem;
}
.example code {
  background-color: #f3f4f6;
  padding: 1px 4px;
  border-radius: 3px;
  color: #333;
}
.required {
  font-weight: 600;
  color: #dc2626;
}
</style>