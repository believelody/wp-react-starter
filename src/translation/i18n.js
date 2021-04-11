import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import fr_translations from "./languages/fr.json";
import en_translations from "./languages/en.json";
import languageDetection from "./languageDetection";

const resources = {
    fr: { translation: fr_translations},
    en: { translation: en_translations}
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        detection: languageDetection,
        lng: "fr",
        fallbackLng: "fr",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n