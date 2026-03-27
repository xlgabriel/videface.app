import Header from "../../Header";
import Footer from "../../Footer";
import Seo from "../../Seo";
import TermsAndConditions from "../../TermsAndConditions";
import LanguageSwitcher from "../../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Section from "../../Section";

export default function TermsPage() {
    const { t } = useTranslation("terms");

    return (
        <>
            <Seo
                title={`${t("title", "Terms and Conditions")} | VideFace`}
                description="Terms and Conditions for VideFace services."
            />

            <Header />

            <main className="pt-[12rem] pb-[6rem] relative">
                <div className="container relative z-10 shadow-blue-500 max-w-[800px] mx-auto bg-white/80 dark:bg-n-8/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-lg border border-n-1/10 dark:border-n-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-n-1/10 dark:border-n-6 pb-6">
                        <h1 className="h3 md:h2 mb-0 text-center md:text-left text-n-8 dark:text-n-1">
                            {t("title", "Terms and Conditions")}
                        </h1>
                        <LanguageSwitcher />
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-none text-n-6 dark:text-n-3">
                        <TermsAndConditions />
                    </div>
                </div>
            </main>

        </>
    );
}
