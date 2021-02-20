import SchemaBasedForm from "@/components/SchemaBasedForm.vue";

describe("SchemaBasedForm", () => {
  it("augments formvuelate schema", () => {
    const schema = {
        some: {
          component: "foo"
        },
        other: {
          component: "bar",
          options: [
            { id: 7, value: "seven" },
            { id: 99, value: "ninetynine" }
          ]
        }
      },
      $i18n = {
        t: jest.fn().mockImplementation(m => m),
        te: jest.fn().mockReturnValue(true)
      },
      i18nPrefix = "foo.bar",
      augmentedSchema = {
        some: {
          component: "foo",
          label: "foo.bar.some.label",
          placeholder: "foo.bar.some.placeholder"
        },
        other: {
          component: "bar",
          label: "foo.bar.other.label",
          placeholder: "foo.bar.other.placeholder",
          options: [
            { value: "seven", label: "foo.bar.other.options.7" },
            { value: "ninetynine", label: "foo.bar.other.options.99" }
          ]
        }
      };

    expect(
      SchemaBasedForm!.methods!.augmentSchema(schema, $i18n, i18nPrefix)
    ).toEqual(augmentedSchema);
  });
});
