import { createI18n } from "vue-i18n";
import zh from "../locales/zh.json";
import en from "../locales/en.json";

// 定义支持的语言
const langs = {
  en,
  zh,
};

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: "zh", // 默认语言
  fallbackLocale: "en", // 回退语言
  messages: langs,
});

export default i18n;
