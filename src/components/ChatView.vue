<script setup>
import { ref } from 'vue'
import ChatMessage from './ChatMessage.vue'

defineProps({
  messages: {
    type: Array,
    required: true
  }
})

const chatContainer = ref(null)

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

function scrollToTop() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = 0
  }
}
</script>

<template>
  <div class="chat-wrapper">
    <!-- Contenedor scrollable -->
    <div class="chat-container" ref="chatContainer">
      <template v-for="(msg, i) in messages" :key="i">
        <div v-if="msg.type === 'date-separator'" class="date-separator">
          <span>{{ msg.date }}</span>
        </div>
        <ChatMessage v-else :msg="msg" />
      </template>
    </div>

    <!-- Botones de scroll -->
    <div class="scroll-buttons">
      <v-btn
        icon="mdi-arrow-up"
        color="primary"
        size="small"
        variant="tonal"
        @click="scrollToTop"
      />
      <v-btn
        icon="mdi-arrow-down"
        color="primary"
        size="small"
        variant="tonal"
        @click="scrollToBottom"
      />
    </div>
  </div>
</template>

<style scoped>
.chat-wrapper {
  position: relative;
}
.chat-container {
  background: #ece5dd;
  padding: 12px;
  border-radius: 8px;
  max-height: 70vh;
  overflow-y: auto;
  width: 100%;
}

.scroll-buttons {
  position: absolute;
  right: 20px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
