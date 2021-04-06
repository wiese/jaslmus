<template>
  <div>
    <h2>{{ $i18n.t("preferences.title") }}</h2>
    <Fieldset :legend="$i18n.t('preferences.keyboardSettings.title')">
      <SchemaBasedForm
        :schema="schema.keyboardSettings"
        :user-data="preferences.keyboardSettings"
        i18n-prefix="preferences.keyboardSettings"
        @updated="preferencesUpdated('keyboardSettings', $event)"
      />
    </Fieldset>
    <Fieldset :legend="$i18n.t('preferences.noteReading.title')">
      <SchemaBasedForm
        :schema="schema.noteReading"
        :user-data="preferences.noteReading"
        i18n-prefix="preferences.noteReading"
        @updated="preferencesUpdated('noteReading', $event)"
      />
    </Fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Fieldset from "primevue/fieldset";
import SchemaBasedForm from "@/components/SchemaBasedForm.vue";
import preferencesSchema from "@/preferences.schema.json";

export default defineComponent({
  components: {
    SchemaBasedForm,
    Fieldset
  },
  props: {
    preferences: Object
  },
  data() {
    return {
      schema: preferencesSchema
    };
  },
  emits: ["updated"],
  methods: {
    preferencesUpdated(key: string, preferences: Record<string, any>): void {
      this.$emit("updated", {
        ...this.preferences,
        [key]: preferences
      });
    }
  }
});
</script>
