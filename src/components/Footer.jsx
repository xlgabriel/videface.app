import { useTranslation } from "react-i18next";
import Section from "./Section";
import TermsModalTrigger from "./TermsModalTrigger";

const Footer = ({ className = "" }) => {
    const { t } = useTranslation("terms");
    return (
        <Section customPaddings="py-0" className={className}>
            <div className="px-6 pb-8">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col md:flex-row items-center md:items-center justify-between text-white gap-4 md:gap-0">
                    <div className="w-full md:w-auto text-center md:text-left">
                        <div className="mb-2 text-center md:text-left">
                            <TermsModalTrigger
                                className="text-sm text-white/80 underline hover:text-white transition-colors"
                                buttonLabel={t("linkLabel")}
                            />
                        </div>
                        <p className="text-white/80 text-sm flex items-center justify-center md:justify-start gap-3">
                            © {new Date().getFullYear()} VideFace.
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.35 2.07.68 3.04a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.04-1.04a2 2 0 0 1 2.11-.45c.97.33 1.99.56 3.04.68A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>+1 (407) 558-6889</span>
                            
                        </p>
                    </div>

                    <div className="flex items-center gap-5 justify-center md:justify-end w-full md:w-auto">
                        <a
                            href="https://www.youtube.com/@videfaceapp"
                            target="_blank"
                            rel="noreferrer"
                            className="footerIcon transition-opacity hover:opacity-80"
                            aria-label="VideFace on YouTube"
                        >
                            <span className="iconBase icon-youtube w-12 h-12 block" />
                        </a>
                        <a
                            href="https://www.instagram.com/videface.app/"
                            target="_blank"
                            rel="noreferrer"
                            className="footerIcon transition-opacity hover:opacity-80"
                            aria-label="VideFace on Instagram"
                        >
                            <span className="iconBase icon-instagram w-9 h-9 block" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/videface/"
                            target="_blank"
                            rel="noreferrer"
                            className="footerIcon transition-opacity hover:opacity-80"
                            aria-label="VideFace on LinkedIn"
                        >
                            <span className="iconBase icon-linkedin w-9 h-9 block" />
                        </a>
                        <a
                            href="mailto:contact@videface.com"
                            className="footerIcon transition-opacity hover:opacity-80"
                            aria-label="Email VideFace"
                        >
                            <span className="iconBase icon-email w-12 h-12 block" />
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .footerIcon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: filter 220ms ease, transform 220ms ease, opacity 220ms ease;
                    will-change: filter, transform;
                }

                .footerIcon:hover {
                    filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.95))
                        drop-shadow(0 0 38px rgba(255, 255, 255, 0.75));
                    transform: scale(1.08);
                }
            `}</style>
        </Section>
    );
};

export default Footer;
