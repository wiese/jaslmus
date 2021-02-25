import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import englishI18n from "../i18n/en.json";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const i18n = createI18n({
  locale: "en",
  messages: {
    en: englishI18n
  }
});

createApp(App)
  .use(i18n)
  .use(PrimeVue)
  .mount("#app");
