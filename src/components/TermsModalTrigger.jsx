import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import TermsAndConditions from "./TermsAndConditions";

const EXIT_ANIMATION_MS = 320;

const TermsModalTrigger = ({ className = "", buttonLabel }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation("terms");

    const openModal = () => {
        setIsMounted(true);
        window.requestAnimationFrame(() => setIsVisible(true));
    };

    const closeModal = () => {
        setIsVisible(false);
        window.setTimeout(() => setIsMounted(false), EXIT_ANIMATION_MS);
    };

    useEffect(() => {
        if (!isMounted) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isMounted]);

    // Open modal automatically if URL contains ?terms=open (only once)
    useEffect(() => {
        if (typeof window === "undefined") return undefined;
        try {
            const params = new URLSearchParams(window.location.search);
            if (params.get("terms") === "open" && !window.__TERMS_MODAL_OPENED) {
                window.__TERMS_MODAL_OPENED = true;
                openModal();
            }
        } catch (e) {
            // ignore
        }
        return undefined;
    }, []);

    // Allow other parts of the app to open the modal by dispatching a global event
    useEffect(() => {
        if (typeof window === "undefined") return undefined;
        const onOpenEvent = () => openModal();
        window.addEventListener("open-terms-modal", onOpenEvent);
        return () => window.removeEventListener("open-terms-modal", onOpenEvent);
    }, []);

    const modalNode = isMounted
        ? createPortal(
            <div className="fixed inset-0 z-[120] flex items-center justify-center" aria-hidden={!isVisible}>
                <div
                    onClick={closeModal}
                    className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                />

                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={t("title")}
                    className={`relative mx-4 flex w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white text-slate-900 shadow-2xl transition-all duration-300 ease-out ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
                >
                    <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-start md:justify-between">
                        <h3 className="text-lg font-semibold">{t("title")}</h3>
                        <div className="flex items-center justify-between gap-3">
                            <LanguageSwitcher />
                            <button
                                onClick={closeModal}
                                aria-label={t("closeLabel")}
                                className="ml-1 text-slate-600 transition-colors hover:text-slate-800"
                            >
                                X
                            </button>
                        </div>
                    </div>

                    <div className="w-full max-h-[70vh] overflow-y-auto overscroll-contain">
                        <TermsAndConditions />
                    </div>
                </div>
            </div>,
            document.body
        )
        : null;

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className={className}
            >
                {buttonLabel || t("linkLabel")}
            </button>

            {modalNode}
        </>
    );
};

export default TermsModalTrigger;
