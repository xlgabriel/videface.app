import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { useState, useEffect } from "react";

const Header = () => {

    const location = useLocation();
    const [openNavigation, setOpenNavigation] = useState(false);
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowHeader(true), 1400);
        return () => clearTimeout(timer);
    }, []);

    const headerGlassStyle = {
        background: "rgba(10, 108, 255, 0.8)",
        boxShadow: "0 4px 32px 0 rgba(0, 127, 255, 0.10), 0 0 24px 2px rgba(255,255,255,0.45)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
    };

    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    const handleClick = () => {
        if (!openNavigation) return;

        enablePageScroll();
        setOpenNavigation(false);
    };


    return (
        <>
            {showHeader && (
                <div
                    className="fixed top-4 left-1/2 -translate-x-1/2 max-w-[1600px] w-[calc(100%-2rem)] z-50 border-b border-n-6 rounded-3xl headerbar-enter"
                    style={{ ...headerGlassStyle, animationDelay: '0s' }}
                >
                    <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                        <a className="block w-[12rem]" href="/home/#hero">
                            <img
                                src={brainwave}
                                width={190}
                                height={40}
                                alt="Brainwave"
                                style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.7))" }}
                            />
                        </a>

                        <nav className="hidden lg:flex lg:mx-auto">
                            <div className="flex items-center">
                                {navigation.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        onClick={handleClick}
                                        className={`block relative text-md text-white font-medium transition-colors hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] ${
                                            item.onlyMobile ? "lg:hidden" : ""
                                        } px-6 py-6 lg:-mr-0.25 lg:font-semibold ${
                                            item.url === location.hash ? "z-2 lg:text-white" : "lg:text-white"
                                        } lg:leading-5 xl:px-12 lowercase`}
                                        style={{ textTransform: "none" }}
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        </nav>

                        <div className="w-[14rem] xl:w-[14rem] lg:w-[13rem]">
                            <a
                                href="#contact"
                                className="hidden lg:flex text-md font-bold text-white px-6 py-6 lg:leading-5 hover:text-white lg:hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] xl:px-12 transition-colors lowercase"
                                style={{ textTransform: "none" }}
                            >
                                Contact us
                            </a>
                        </div>

                        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
                            <MenuSvg openNavigation={openNavigation} />
                        </Button>
                    </div>
                </div>
            )}

             {/* Mobile Navigation Menu */}

            <div
                className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
                    openNavigation ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <button
                    type="button"
                    aria-label="Close menu"
                    className={`absolute inset-0 bg-black/3 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
                        openNavigation ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={toggleNavigation}
                />

                <div
                    className={`fixed top-[7rem] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1600px] rounded-3xl border border-white/15 transform transition-[transform,opacity] duration-320 ease-in-out ${
                        openNavigation
                            ? "translate-y-0 opacity-100 delay-100"
                            : "translate-y-[100vh] opacity-0 delay-0"
                    }`}
                    style={headerGlassStyle}
                >
                    <div className="relative z-10 flex flex-col items-center justify-center py-6">
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                onClick={handleClick}
                                className={`block text-md text-white font-medium transition-colors hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] px-6 py-4 lowercase ${
                                    item.onlyMobile ? "" : ""
                                }`}
                                style={{ textTransform: "none" }}
                            >
                                {item.title}
                            </a>
                        ))}

                        <a
                            href="#contact"
                            onClick={handleClick}
                            className="block text-md text-white font-bold transition-colors hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] px-6 py-4"
                            style={{ textTransform: "none" }}
                        >
                            Contact us
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
