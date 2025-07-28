<script setup>
import { ref, onMounted } from 'vue'
import ChatView from './ChatView.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const messages = ref([])
const fileInputRef = ref(null)
const isDragging = ref(false)

// estado para snackbar
const showSnackbar = ref(false)
const snackbarText = ref('')

// estado para dialog
const showDialog = ref(false)

// Animación de bienvenida
const welcomeAnim = ref(false)
onMounted(() => {
  setTimeout(() => welcomeAnim.value = true, 300)
})

function triggerFileInput() {
  fileInputRef.value?.click()
}

function handleDragOver(e) {
  e.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(e) {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer.files.length) {
    handleFile({ target: { files: e.dataTransfer.files } })
  }
}

const loading = ref(false)

function handleFile(e) {
  const file = e.target.files[0]
  if (!file) return

  loading.value = true // ⏳ activar loading

  const reader = new FileReader()
  reader.onload = (event) => {
    const text = event.target.result
    parseChat(text)
    loading.value = false // ✅ desactivar loading
  }
  reader.onerror = () => {
    snackbarText.value = 'Error al leer el archivo'
    showSnackbar.value = true
    loading.value = false
  }
  reader.readAsText(file, 'utf-8')
}

function parseChat(text) {
  const lines = text.split('\n').filter(l => l.trim() !== '')

  let firstUser = null
  let secondUser = null
  let currentDate = null

  const parsed = []
  let lastMessage = null

  lines.forEach(line => {
    const [dateTimePart, rest] = line.split(' - ')

    // si no hay " - ", es continuación
    if (!rest) {
      if (lastMessage) {
        lastMessage.message += '\n' + line.trim()
      }
      return
    }

    const [userPart, messagePart] = rest.split(': ')
    if (!messagePart) {
      // mensaje de sistema, ignorar
      return
    }

    const [date, time] = dateTimePart.split(', ')

    if (firstUser === null) firstUser = userPart
    if (userPart !== firstUser && secondUser === null) secondUser = userPart

    const side = userPart === firstUser ? 'left' : 'right'

    if (currentDate !== date) {
      currentDate = date
      parsed.push({ type: 'date-separator', date: currentDate })
    }

    const newMsg = {
      type: 'message',
      date,
      time,
      user: userPart,
      message: messagePart,
      side
    }
    parsed.push(newMsg)
    lastMessage = newMsg
  })

  if (parsed.length === 0) {
    snackbarText.value = 'El archivo no tiene el formato esperado.'
    showSnackbar.value = true
    return
  }

  messages.value = parsed
}
</script>

<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center" :class="{'px-2': mobile}">

    <!-- Mostrar card grande solo si no hay mensajes -->
    <v-card
      v-if="messages.length === 0"
      class="pa-6 animate__animated"
      :class="{'animate__fadeInUp': welcomeAnim}"
      elevation="8"
      max-width="500"
      :style="{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,245,245,0.98))',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(4px)',
        borderRadius: '16px'
      }"
    >
      <v-card-title class="text-h5 text-center d-flex justify-space-between align-center">
        <span style="background: linear-gradient(45deg, #2196F3, #00BCD4); background-clip: text; -webkit-text-fill-color: transparent; font-weight: 600;">
          Message Chat Viewer
        </span>
        <v-btn 
          icon="mdi-information-outline" 
          variant="text" 
          @click="showDialog = true"
          color="primary"
        ></v-btn>
      </v-card-title>
      
      <v-card-text class="text-center py-4">
        <v-icon 
          icon="mdi-chat-processing-outline" 
          size="64" 
          color="primary"
          class="mb-4 animate__animated animate__pulse animate__infinite"
          style="animation-duration: 3s;"
        ></v-icon>
        <p class="text-body-1 mb-4">
          Sube tu archivo <strong>.txt</strong> exportado de WhatsApp para visualizar tu chat con una interfaz moderna.
        </p>
        
        <div
          @dragover.prevent="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
          @click="triggerFileInput"
          class="drop-zone pa-8 text-center"
          :class="{'drop-zone-active': isDragging}"
          style="
            border: 2px dashed #2196F3;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
          "
        >
          <v-icon 
            :icon="isDragging ? 'mdi-cloud-upload' : 'mdi-cloud-upload-outline'" 
            size="48"
            :color="isDragging ? 'primary' : 'grey'"
            class="mb-2"
          ></v-icon>
          <p class="text-subtitle-1" :class="{'text-primary': isDragging}">
            {{ isDragging ? 'Suelta tu archivo aquí' : 'Arrastra tu archivo o haz clic para seleccionar' }}
          </p>
          <p class="text-caption text-grey">
            Formato soportado: .txt
          </p>
        </div>
      </v-card-text>
      
      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          variant="flat" 
          @click="triggerFileInput"
          size="large"
          class="px-6 animate__animated animate__pulse animate__infinite"
          style="animation-duration: 4s;"
        >
          <v-icon icon="mdi-upload" class="mr-2"></v-icon>
          Subir archivo
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Si ya hay mensajes, mostrar botón pequeño -->
    <div v-else class="d-flex justify-center my-4 animate__animated animate__fadeIn">
      <v-btn 
        color="primary" 
        @click="triggerFileInput" 
        variant="tonal"
        prepend-icon="mdi-upload"
        class="px-4"
      >
        Subir otro chat
      </v-btn>
    </div>

    <input
      type="file"
      accept=".txt"
      ref="fileInputRef"
      style="display: none"
      @change="handleFile"
    />

    <v-overlay v-model="loading" persistent class="align-center justify-center">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <!-- Chat UI -->
    <transition name="slide-fade">
      <ChatView v-if="messages.length > 0" :messages="messages" />
    </transition>

    <!-- Snackbar mejorado -->
    <v-snackbar 
      v-model="showSnackbar" 
      :timeout="4000"
      location="bottom center"
      :color="snackbarText.includes('éxito') ? 'success' : 'error'"
      elevation="24"
    >
      <div class="d-flex align-center">
        <v-icon 
          :icon="snackbarText.includes('éxito') ? 'mdi-check-circle' : 'mdi-alert-circle'" 
          class="mr-2"
        ></v-icon>
        {{ snackbarText }}
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="showSnackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Dialog con ejemplo mejorado -->
    <v-dialog v-model="showDialog" max-width="600" scrollable>
      <v-card>
        <v-card-title class="text-h6 d-flex align-center">
          <v-icon icon="mdi-information" color="primary" class="mr-2"></v-icon>
          Formato del archivo
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
          <p class="mb-4">El archivo debe seguir la estructura exportada por WhatsApp:</p>
          
          <v-alert
            variant="tonal"
            color="primary"
            class="mb-4"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-alert-circle-outline"></v-icon>
            </template>
            Asegúrate de exportar el chat <strong>sin medios</strong> para obtener solo texto.
          </v-alert>
          
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon icon="mdi-code-json" class="mr-2"></v-icon>
                Ejemplo del formato
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <pre style="
                  background: #f8f9fa;
                  padding: 12px;
                  border-radius: 6px;
                  font-size: 0.85rem;
                  white-space: pre-line;
                  border-left: 3px solid #2196F3;
                ">
                  15/2/23, 7:12 p. m. - Usuario 1: Mensaje de ejemplo
                  15/2/23, 7:13 p. m. - Usuario 2: Respuesta al mensaje
                  15/2/23, 7:14 p. m. - Usuario 1: Mensaje con
                  salto de línea
                  16/2/23, 9:00 a. m. - Usuario 2: Nuevo día, nuevo mensaje</pre>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn 
            color="primary" 
            variant="text" 
            @click="showDialog = false"
          >
            Entendido
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.drop-zone {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.drop-zone-active {
  transform: scale(1.02);
  background-color: rgba(33, 150, 243, 0.05);
  border-color: #2196F3 !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.chat-container {
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: thin;
}

/* Estilo personalizado para la scrollbar */
.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(33, 150, 243, 0.3);
  border-radius: 10px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(33, 150, 243, 0.5);
}
</style>