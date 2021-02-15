import { ComponentOptionsMixin } from "vue";

export function storedPropMixin(
  prop: string,
  version: string,
  defaultValue: any
): ComponentOptionsMixin {
  function buildKey() {
    return `storedProp_${prop}_${version}`;
  }

  return {
    data() {
      const storeValueJSON = window.localStorage.getItem(buildKey());
      return {
        [prop]: storeValueJSON ? JSON.parse(storeValueJSON) : defaultValue
      };
    },
    watch: {
      [prop]: {
        handler(value: any) {
          window.localStorage.setItem(buildKey(), JSON.stringify(value));
        },
        deep: true
      }
    }
  };
}
