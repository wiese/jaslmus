<template>
  <SchemaForm
    :schema="augmentedSchema"
    :modelValue="formData"
    @update:modelValue="$emit('updated', $event)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"; // eslint-disable-line no-unused-vars
import { SchemaForm } from "formvuelate";
import { VueI18n } from "vue-i18n"; // eslint-disable-line no-unused-vars

interface OurSchema extends Record<string, OurSchemaProp> {}

interface OurSchemaProp {
  component: string;
  options?: OurSchemaOption[];
}

interface OurSchemaOption {
  id: string;
  value: string;
  label?: string;
}

interface FormvuelateSchema extends Record<string, FormvuelateSchemaProp> {}

interface FormvuelateSchemaOption {
  label: string;
  value: string;
}

interface FormvuelateSchemaProp {
  component: string;
  label: string;
  placeholder: string;
  options?: FormvuelateSchemaOption[];
}

export default defineComponent({
  props: {
    schema: {
      required: true,
      type: Object as PropType<OurSchema>
    },
    formData: {
      required: true,
      type: Object
    },
    i18nPrefix: {
      required: true,
      type: String
    }
  },
  computed: {
    augmentedSchema(): FormvuelateSchema {
      return this.augmentSchema(
        this.schema,
        this.$i18n as VueI18n,
        this.i18nPrefix
      );
    }
  },
  components: {
    SchemaForm
  },
  emits: ["updated"],
  methods: {
    augmentSchema(
      schema: OurSchema,
      $i18n: VueI18n,
      i18nPrefix: string
    ): FormvuelateSchema {
      const fields: FormvuelateSchema = {};

      Object.keys(schema).forEach(prop => {
        const settings = schema[prop];

        const options: FormvuelateSchemaOption[] = [];
        if (settings.options) {
          settings.options.forEach(option => {
            let label;
            if (option.label) {
              label = option.label;
            } else {
              label = $i18n.t(`${i18nPrefix}.${prop}.options.${option.id}`);
            }
            options.push({
              label,
              value: option.value
            });
          });
        }

        const placeholderMessage = `${i18nPrefix}.${prop}.placeholder`;

        fields[prop] = {
          component: settings.component,
          label: $i18n.t(`${i18nPrefix}.${prop}.label`),
          placeholder: $i18n.te(placeholderMessage)
            ? $i18n.t(placeholderMessage)
            : "",
          options: options.length ? options : undefined
        };
      });

      return fields;
    }
  }
});
</script>