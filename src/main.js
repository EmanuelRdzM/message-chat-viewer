import { createApp } from 'vue'
import App from './App.vue'

// Import Vuetify
import 'vuetify/styles' // Global CSS de Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Opcional: iconos
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .mount('#app')