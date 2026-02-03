import { useEffect, useState } from "react";

export default function Announcement() {
    const [open, setOpen] = useState(false);
    // Date logic removed; message is now static

    useEffect(() => {
        // Delay so the header finishes its entrance first (approx. 1.6s)
        const timer = setTimeout(() => setOpen(true), 1600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div
                className={`fixed top-[72px] left-1/2 -translate-x-1/2 max-w-[900px] w-[calc(100%-4rem)] z-40 rounded-3xl overflow-hidden ${
                    open ? "headerbar-enter opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                } transition-all duration-300 border-2 border-blue-400/70 ring-2 ring-blue-400/20 shadow-[0_10px_40px_rgba(2,132,199,0.12)]`}
            >
                <div className="flex items-center justify-center gap-3 pt-8 pb-4 bg-n-7 text-n-1 text-xs md:text-sm py-3 px-4">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="opacity-80">
                        <path d="M12 2L1 21h22L12 2zm1 15h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>

                    <p className="text-center">Please note that, effective February 2026, our prices have increased.</p>

                    <button onClick={() => setOpen(false)} className="ml-3 hover:opacity-70 transition">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
