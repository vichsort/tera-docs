<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      
      <RouterLink to="/" class="logo">
        <strong>tera</strong> docs
      </RouterLink>

      <nav class="navigation">
        <RouterLink to="/" class="nav-link">
          Minhas APIs
        </RouterLink>
        
        <a 
          href="https://github.com/seu-usuario/tera-docs" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="nav-link"
        >
          GitHub
        </a>
      </nav>

      </div>
  </header>
</template>

<style scoped>

.app-header {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1440px; 
  margin: 0 auto;
  height: 64px;
  padding: 0 2rem;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 300;
  color: #1a202c;
  text-decoration: none;
}

.logo strong {
  font-weight: 700;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 1.5rem; 
}

.nav-link {
  font-size: 1rem;
  font-weight: 500;
  color: #4a5568;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  
  transition: color 0.2s ease, border-color 0.2s ease;
}

.nav-link:hover {
  color: #2b6cb0;
}

.nav-link.router-link-exact-active {
  color: #2b6cb0;
  font-weight: 600;
  border-bottom-color: #2b6cb0;
}
</style>