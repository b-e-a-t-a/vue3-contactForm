<template>
  <label>{{ label }}</label>
  <input
    :value="modelValue"
    class="form-input"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  >
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
  }
})
</script>

<style lang="sass" scoped>
.form-input
</style>