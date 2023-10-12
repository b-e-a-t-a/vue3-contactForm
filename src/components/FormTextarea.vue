<template>
  <div :class="{'error': error}">
    <label :for="name">{{ label }}</label>
    <textarea
      :value="modelValue"
      :name="name"
      :id="name"
      class="input"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="error" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ""
  },
  modelValue: {
    type: [String],
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  errorMessage: {
    type: String,
    default: ""
  },
  error: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="sass" scoped>
</style>