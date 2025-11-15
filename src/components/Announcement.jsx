import { useEffect, useState } from "react";

export default function Announcement() {
    const [open, setOpen] = useState(false);

    // --- LÓGICA DE FECHA ---
    const today = new Date();
    const month = today.getMonth(); // 0 = enero, 10 = noviembre
    const day = today.getDate();

    let word = "starting December 1st"; // default

    // Nov 30 -> "tomorrow"; Dec 1 -> "today"
    if (month === 10 && day === 30) {
        word = "tomorrow";
    } else if (month === 11 && day === 1) {
        word = "today";
    }

    useEffect(() => {
        const timer = setTimeout(() => setOpen(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div
                className={`fixed top-[72px] left-0 w-full z-40 transition-all duration-300 
                    ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
                `}
            >
                <div className="flex items-center justify-center gap-3 pt-8 pb-4 bg-n-7 text-n-1 text-xs md:text-sm py-3 px-4 border-b border-n-6 shadow-lg">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="opacity-80">
                        <path d="M12 2L1 21h22L12 2zm1 15h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>

                    <p className="text-center">Service prices will increase {word}. Take advantage of current rates.</p>

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
