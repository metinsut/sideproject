import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import projectEn from "./locales/project/en.json";
import projectTr from "./locales/project/tr.json";
import en from "./locales/root/en.json";
import tr from "./locales/root/tr.json";
import tasksEn from "./locales/tasks/en.json";
import tasksTr from "./locales/tasks/tr.json";

export enum SupportedLangs {
  TR = "tr",
  EN = "en",
}

const resources = {
  [SupportedLangs.EN]: { root: en, tasks: tasksEn, project: projectEn },
  [SupportedLangs.TR]: { root: tr, tasks: tasksTr, project: projectTr },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: "root",
    ns: ["root", "tasks", "project"],
    fallbackLng: SupportedLangs.EN,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ["cookie", "navigator", "htmlTag"],
      caches: ["cookie"],
      cookieMinutes: Number.MAX_SAFE_INTEGER,
      cookieOptions: {
        path: "/",
        sameSite: "strict",
      },
    },
  });

export default i18n;
