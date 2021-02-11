export function storedPropMixin(prop, version, defaultValue) {
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
        handler(value) {
          window.localStorage.setItem(buildKey(), JSON.stringify(value));
        },
        deep: true
      }
    }
  };
}
