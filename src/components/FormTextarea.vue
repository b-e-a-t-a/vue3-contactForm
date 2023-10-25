<template>
  <div>
    <label :for="name" class="font-weight-medium">{{ label }}</label>
    <v-textarea
      :clearable="clearable"
      clear-icon="mdi-close-circle"
      counter
      :value="modelValue"
      :name="name"
      :id="name"
      class="input"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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
  clearable: {
    type: Boolean,
    default: false
  }
})
</script>