import React from "react";
import Section from "./Section";

const Footer = ({ className = "" }) => {
    return (
        <Section customPaddings="py-0" className={className}>
            <div className="px-6 pb-8">
                <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between text-white">
                    <p className="text-white/80 text-sm">© {new Date().getFullYear()}. VideFace</p>

                    <div className="flex items-center gap-5">
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
