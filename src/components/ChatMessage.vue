<script setup>
defineProps({
  msg: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div :class="['message-container', msg.side]">
    <div class="message-bubble">
      <div v-if="msg.user" class="message-user">
        {{ msg.user }}
      </div>
      <div class="message-text">
        {{ msg.message }}
      </div>
      <div class="message-time">
        {{ msg.time }}
        <span v-if="msg.side === 'right'" class="message-status">
          <v-icon v-if="msg.status === 'read'" size="12" color="blue">mdi-check-all</v-icon>
          <v-icon v-else-if="msg.status === 'delivered'" size="12">mdi-check-all</v-icon>
          <v-icon v-else size="12">mdi-check</v-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  margin: 4px 8px;
}

.message-container.left {
  justify-content: flex-start;
}

.message-container.right {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.message-container.left .message-bubble {
  background-color: white;
  border-top-left-radius: 0;
}

.message-container.right .message-bubble {
  background-color: #dcf8c6;
  border-top-right-radius: 0;
}

.message-user {
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 4px;
  color: #555;
}

.message-text {
  font-size: 0.95rem;
  line-height: 1.4;
  white-space: pre-wrap;
}

.message-time {
  font-size: 0.7rem;
  color: #666;
  text-align: right;
  margin-top: 4px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
}

.message-status {
  margin-left: 4px;
  display: inline-flex;
}
</style>