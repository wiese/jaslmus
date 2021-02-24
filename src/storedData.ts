import { ref, watch, Ref } from "vue";

export default function storedData<T extends any>(
  name: string,
  version: string,
  defaultValue: T
): Ref<T> {
  function buildKey() {
    return `storedData_${name}_${version}`;
  }

  const storeValueJSON = window.localStorage.getItem(buildKey());
  const watchedValue = ref(
    storeValueJSON ? JSON.parse(storeValueJSON) : defaultValue
  );

  watch(
    watchedValue,
    (newValue: any) => {
      window.localStorage.setItem(buildKey(), JSON.stringify(newValue));
    },
    { deep: true }
  );

  return watchedValue;
}
