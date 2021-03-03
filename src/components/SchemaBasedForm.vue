<template>
  <SchemaForm
    :schema="augmentedSchema"
    :modelValue="formData"
    @update:modelValue="$emit('updated', $event)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, markRaw } from "vue";
import { SchemaFormFactory } from "formvuelate";
import { VueI18n } from "vue-i18n";
import FormDropdown from "@/components/form/FormDropdown.vue";

markRaw(FormDropdown);

interface OurSchema extends Record<string, OurSchemaProp> {}

interface OurSchemaProp {
  component: string;
  options?: OurSchemaOption[];
  [key: string]: any;
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
  placeholder?: string;
  options?: FormvuelateSchemaOption[];
  [key: string]: any;
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
    SchemaForm: SchemaFormFactory([], { FormDropdown })
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
          ...settings,
          label: $i18n.t(`${i18nPrefix}.${prop}.label`),
          placeholder: $i18n.te(placeholderMessage)
            ? $i18n.t(placeholderMessage)
            : undefined,
          options: options.length ? options : undefined
        };
      });

      return fields;
    }
  }
});
</script>
