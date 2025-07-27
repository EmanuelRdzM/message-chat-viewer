<script setup>
import ChatMessage from './ChatMessage.vue'

defineProps({
  messages: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="chat-container">
    <template v-for="(msg, i) in messages" :key="i">
      <div v-if="msg.type === 'date-separator'" class="date-separator">
        <span>{{ msg.date }}</span>
      </div>
      <ChatMessage v-else :msg="msg" />
    </template>
  </div>
</template>

<style scoped>
.chat-container {
  background: #ece5dd; /* fondo WhatsApp */
  padding: 12px;
  border-radius: 8px;
  max-height: 70vh;
  overflow-y: auto;
  width: 100%;
}

/* separador de fecha */
.date-separator {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}
.date-separator span {
  background: rgba(0,0,0,0.1);
  color: #333;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}
</style>
