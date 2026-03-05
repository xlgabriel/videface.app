import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const localeModules = import.meta.glob("./locales/*/*.json");

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: ["en", "es", "de", "fr"],
        defaultNS: "terms",
        ns: ["terms"],
        load: "languageOnly",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["querystring", "localStorage", "navigator", "htmlTag"],
            caches: ["localStorage"],
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
            request: async (_options, url, _payload, callback) => {
                try {
                    const relative = url.replace(/^\//, "./");
                    const loader = localeModules[relative];

                    if (!loader) {
                        callback(`Missing translation file: ${relative}`, {
                            status: 404,
                            data: "{}",
                        });
                        return;
                    }

                    const messages = await loader();
                    callback(null, {
                        status: 200,
                        data: JSON.stringify(messages.default ?? messages),
                    });
                } catch (error) {
                    callback(error, {
                        status: 500,
                        data: "{}",
                    });
                }
            },
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
