<template>
  <div>
    <h2>{{ $i18n.t("preferences.title") }}</h2>
    <Fieldset :legend="$i18n.t('preferences.noteReading.title')">
      <SchemaBasedForm
        :schema="schema.noteReading"
        :form-data="preferences.noteReading"
        i18n-prefix="preferences.noteReading"
        @updated="updated"
      />
    </Fieldset>
  </div>
</template>

<script>
import Fieldset from "primevue/fieldset";
import SchemaBasedForm from "@/components/SchemaBasedForm";
import preferencesSchema from "@/preferences.schema.json";

export default {
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
    updated(noteReadingPreferences) {
      this.$emit("updated", {
        ...this.preferences,
        noteReading: noteReadingPreferences
      });
    }
  }
};
</script>
