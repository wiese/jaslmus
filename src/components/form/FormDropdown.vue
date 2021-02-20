<template>
  <span class="p-float-label">
    <label :for="uuid">{{ label }}</label>
    <Dropdown
      :modelValue="modelValue"
      :options="options"
      optionLabel="label"
      optionValue="value"
      :placeholder="placeholder"
      :id="uuid"
      @change="$emit('update:modelValue', $event.value)"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown from "primevue/dropdown";

export default defineComponent({
  components: {
    Dropdown
  },
  props: {
    modelValue: { required: true },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    uuid: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"]
});
</script>
