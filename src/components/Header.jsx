import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { useState, useEffect, useRef } from "react";

const Header = () => {

    const location = useLocation();
    const [openNavigation, setOpenNavigation] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

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

    const closeSolutionsTimer = useRef(null);

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

    const solutionsItems = [
        { label: "Kiosk", iconClass: "icon-kiosk", url: "/kiosk" },
        { label: "Smart Locker", iconClass: "icon-locker-key", url: "/smart-locker" },
        { label: "KeyDrop", iconClass: "icon-key", url: "/keydrop" },
        { label: "Acoustic Cabin Booth", iconClass: "icon-acoustic-cabin", url: "/acoustic-cabin" },
        { label: "Agents", iconClass: "icon-agent-support", url: "/agents" },
    ];

    const isHashUrl = (url) => typeof url === "string" && url.includes("#");

    // Keep Solutions dropdown open briefly after mouse leaves to allow
    // comfortable movement into the submenu.
    const openSolutionsWithCancel = () => {
        if (closeSolutionsTimer.current) {
            clearTimeout(closeSolutionsTimer.current);
            closeSolutionsTimer.current = null;
        }
        setSolutionsOpen(true);
    };

    const scheduleCloseSolutions = (delay = 250) => {
        if (closeSolutionsTimer.current) clearTimeout(closeSolutionsTimer.current);
        closeSolutionsTimer.current = setTimeout(() => {
            setSolutionsOpen(false);
            closeSolutionsTimer.current = null;
        }, delay);
    };

    useEffect(() => {
        return () => {
            if (closeSolutionsTimer.current) {
                clearTimeout(closeSolutionsTimer.current);
                closeSolutionsTimer.current = null;
            }
        };
    }, []);


    return (
        <>
            {showHeader && (
                <>
                    {/* Backdrop blur while Solutions menu is open (desktop only) */}
                    <div
                        className={`fixed inset-0 z-40 hidden lg:block transition-opacity duration-300 ${
                            solutionsOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}
                        aria-hidden="true"
                        style={{
                            transition:
                                "opacity 320ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 320ms cubic-bezier(0.22,1,0.36,1), -webkit-backdrop-filter 320ms cubic-bezier(0.22,1,0.36,1), background-color 320ms cubic-bezier(0.22,1,0.36,1)",
                            backgroundColor: solutionsOpen ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0)",
                            backdropFilter: solutionsOpen ? "blur(6px)" : "blur(0px)",
                            WebkitBackdropFilter: solutionsOpen ? "blur(6px)" : "blur(0px)",
                        }}
                    >
                    </div>

                    <div
                        className="fixed top-4 left-1/2 -translate-x-1/2 max-w-[1600px] w-[calc(100%-2rem)] z-50 border-b border-n-6 rounded-3xl headerbar-enter"
                        style={{ ...headerGlassStyle, animationDelay: '0s' }}
                    >
                        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                        <Link
                            className="block w-[12rem] hover:scale-110 transition-transform duration-100"
                            to="/home"
                            onMouseEnter={e => {
                                e.currentTarget.querySelector('img').style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,1))';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.querySelector('img').style.filter = 'drop-shadow(0 0 4px rgba(255,255,255,0.7))';
                            }}
                        >
                            <img
                                src={brainwave}
                                width={190}
                                height={40}
                                alt="Brainwave"
                                style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.7))", transition: "filter 0.35s cubic-bezier(0.4,0,0.2,1)" }}
                            />
                        </Link>

                        <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
                            <div className="flex items-center justify-center">
                                {navigation.map((item) => {
                                    if (item.title === "Solutions") {
                                        return (
                                            <div
                                                key={item.id}
                                                className="relative"
                                                onMouseEnter={openSolutionsWithCancel}
                                                onMouseLeave={() => scheduleCloseSolutions()}
                                            >
                                                <button
                                                    type="button"
                                                    className={`block relative text-md text-white font-medium hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] px-6 py-6 lg:-mr-0.25 lg:font-semibold lg:text-white lg:leading-5 xl:px-12 lowercase transform-gpu transition-[transform,color,text-shadow] duration-200 ease-out hover:scale-[1.06]`}
                                                    style={{
                                                        textTransform: "none",
                                                        transition:
                                                            "transform 200ms cubic-bezier(0.22,1,0.36,1), color 0.3s cubic-bezier(0.4,0,0.2,1), text-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
                                                    }}
                                                    onClick={() => setSolutionsOpen(false)}
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        {item.title}
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            aria-hidden="true"
                                                            className={`transition-transform duration-200 ${
                                                                solutionsOpen ? "rotate-180" : "rotate-0"
                                                            }`}
                                                        >
                                                            <path
                                                                d="M6 9l6 6 6-6"
                                                                stroke="rgba(255,255,255,0.95)"
                                                                strokeWidth="2.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                </button>

                                                <div
                                                    className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 w-[16rem] rounded-3xl border border-white/15 overflow-hidden transform transition-[transform,opacity] duration-320 ease-in-out ${
                                                        solutionsOpen
                                                            ? "translate-y-0 opacity-100 pointer-events-auto"
                                                            : "translate-y-3 opacity-0 pointer-events-none"
                                                    }`}
                                                    style={headerGlassStyle}
                                                >
                                                    <div className="py-4">
                                                        {solutionsItems.map((opt) => {
                                                            const NavTag = isHashUrl(opt.url) ? HashLink : Link;
                                                            const to = opt.url ?? "/home";
                                                            return (
                                                                <NavTag
                                                                    key={opt.label}
                                                                    to={to}
                                                                    smooth={isHashUrl(opt.url) ? true : undefined}
                                                                    onClick={() => {
                                                                        setSolutionsOpen(false);
                                                                        if (opt.url) handleClick();
                                                                    }}
                                                                    className="block px-6 py-3 text-white font-semibold lowercase hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] transform-gpu transition-[transform,color,text-shadow] duration-200 ease-out hover:scale-[1.03]"
                                                                    style={{
                                                                        textTransform: "none",
                                                                        transition:
                                                                            "transform 200ms cubic-bezier(0.22,1,0.36,1), color 0.3s cubic-bezier(0.4,0,0.2,1), text-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
                                                                    }}
                                                                >
                                                                    <span className="flex items-center gap-3">
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={`${opt.iconClass} text-white/95 opacity-90 shrink-0`}
                                                                            style={{ width: 26, height: 26 }}
                                                                        />
                                                                        <span>{opt.label}</span>
                                                                    </span>
                                                                </NavTag>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    const NavTag = isHashUrl(item.url) ? HashLink : Link;
                                    const to = item.url ?? "/home";

                                    return (
                                        <NavTag
                                            key={item.id}
                                            to={to}
                                            smooth={isHashUrl(item.url) ? true : undefined}
                                            onClick={handleClick}
                                            className={`block relative text-md text-white font-medium hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] transform-gpu transition-[transform,color,text-shadow] duration-200 ease-out hover:scale-[1.06] ${
                                                item.onlyMobile ? "lg:hidden" : ""
                                            } px-6 py-6 lg:-mr-0.25 lg:font-semibold ${
                                                item.url === location.hash ? "z-2 lg:text-white" : "lg:text-white"
                                            } lg:leading-5 xl:px-12 lowercase`}
                                            style={{
                                                textTransform: "none",
                                                transition:
                                                    "transform 200ms cubic-bezier(0.22,1,0.36,1), color 0.3s cubic-bezier(0.4,0,0.2,1), text-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
                                            }}
                                        >
                                            {item.title}
                                        </NavTag>
                                    );
                                })}
                            </div>
                        </nav>

                        <div className="w-[12rem] xl:w-[14rem] lg:w-[13rem] ml-auto lg:flex-shrink-0">
                            <HashLink
                                to="/home/#contact"
                                smooth
                                className="hidden lg:flex text-xl font-bold text-white px-8 py-4 hover:text-white hover:scale-110 transition-all lowercase"
                                style={{ textTransform: "none", transition: "color 0.3s cubic-bezier(0.4,0,0.2,1), filter 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)" }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,1))';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.filter = '';
                                }}
                            >
                                <span className="icon-user w-7 h-7 mr-2" />
                                Contact us
                            </HashLink>
                        </div>

                        <Button href={null} className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
                            <MenuSvg openNavigation={openNavigation} />
                        </Button>
                        </div>
                    </div>
                </>
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
                        {navigation.map((item) => {
                            if (item.title === "Solutions") {
                                return (
                                        <div key={item.id} className="w-full flex flex-col items-center">
                                            <button
                                                type="button"
                                                className={` w-auto text-xl text-white font-semibold transition-colors hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] px-8 py-5 lowercase text-center flex items-center justify-center mx-auto`}
                                                style={{ textTransform: "none", transition: "color 0.3s cubic-bezier(0.4,0,0.2,1), text-shadow 0.3s cubic-bezier(0.4,0,0.2,1)" }}
                                                onClick={() => setMobileSolutionsOpen((v) => !v)}
                                                aria-expanded={mobileSolutionsOpen}
                                            >
                                                <span>{item.title}</span>
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                    className={`transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : "rotate-0"}`}
                                                >
                                                    <path
                                                        d="M6 9l6 6 6-6"
                                                        stroke="rgba(255,255,255,0.95)"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                            <div
                                                className={`w-full overflow-hidden transition-all duration-350 ease-in-out ${mobileSolutionsOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                                                style={{
                                                    transition: "max-height 350ms cubic-bezier(0.22,1,0.36,1), opacity 320ms cubic-bezier(0.22,1,0.36,1)",
                                                }}
                                            >
                                                {solutionsItems.map((opt) => {
                                                    const NavTag = isHashUrl(opt.url) ? HashLink : Link;
                                                    const to = opt.url ?? "/home";
                                                    return (
                                                        <NavTag
                                                            key={opt.label}
                                                            to={to}
                                                            smooth={isHashUrl(opt.url) ? true : undefined}
                                                            onClick={() => {
                                                                setMobileSolutionsOpen(false);
                                                                handleClick();
                                                            }}
                                                            className="flex items-center gap-4 px-8 py-5 text-white text-xl font-semibold lowercase hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] transition-[transform,color,text-shadow] duration-200 ease-out hover:scale-[1.05]"
                                                            style={{textTransform: "none", transition: "transform 200ms cubic-bezier(0.22,1,0.36,1), color 0.3s cubic-bezier(0.4,0,0.2,1), text-shadow 0.3s cubic-bezier(0.4,0,0.2,1)"}}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={`${opt.iconClass} text-white/95 opacity-90 shrink-0`}
                                                                style={{ width: 34, height: 34 }}
                                                            />
                                                            <span>{opt.label}</span>
                                                        </NavTag>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                );
                            }

                            const NavTag = isHashUrl(item.url) ? HashLink : Link;
                            const to = item.url ?? "/home";

                            return (
                                <NavTag
                                    key={item.id}
                                    to={to}
                                    smooth={isHashUrl(item.url) ? true : undefined}
                                    onClick={handleClick}
                                    className={`block text-xl text-white font-semibold transition-colors hover:text-white hover:[text-shadow:0_0_14px_rgba(255,255,255,0.85)] px-8 py-5 lowercase ${
                                        item.onlyMobile ? "" : ""
                                    }`}
                                    style={{ textTransform: "none", transition: "color 0.3s cubic-bezier(0.4,0,0.2,1), text-shadow 0.3s cubic-bezier(0.4,0,0.2,1)" }}
                                >
                                    {item.title}
                                </NavTag>
                            );
                        })}

                        <HashLink
                            to="/home/#contact"
                            smooth
                            onClick={handleClick}
                            className="flex items-center text-2xl text-white font-semibold px-8 py-5 hover:text-white hover:scale-110 transition-all lowercase"
                            style={{ textTransform: "none", transition: "color 0.3s cubic-bezier(0.4,0,0.2,1), filter 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)" }}
                            onMouseEnter={e => {
                                e.currentTarget.style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,1))';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.filter = '';
                            }}
                        >
                            <span className="icon-user w-7 h-7 mr-2" />
                            Contact us
                        </HashLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
