import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import englishI18n from "../i18n/en.json";
import preferencesChoices from "./preferencesChoices.json";

const i18n = createI18n({
  locale: "en",
  messages: {
    en: englishI18n
  }
});

createApp(App, {
  preferencesChoices
})
  .use(i18n)
  .mount("#app");
