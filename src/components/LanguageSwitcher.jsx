import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "de", label: "German" },
    { code: "fr", label: "French" },
];

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);

    return (
        <div className="w-full sm:w-auto">
            <label htmlFor="language-select" className="sr-only">
                Select language
            </label>
            <select
                id="language-select"
                value={currentLanguage}
                onChange={(event) => i18n.changeLanguage(event.target.value)}
                className="w-full sm:w-[180px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-slate-500"
            >
                {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
