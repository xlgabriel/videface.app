import { useRef, useState, useEffect } from "react";
import Section from "./Section";
import { BackgroundCircles } from "./design/Hero";
import ReactDOMServer from "react-dom/server";
import ContactEmailTemplate from "./ContactEmailTemplate";
import Footer from "./Footer";
import { countries } from "../constants/countries";

// Utility functions for animations
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (t) => t * t * (3 - 2 * t);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const Contact = () => {
    const formRef = useRef();
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const lastScrollYRef = useRef(
        typeof window !== "undefined" ? window.scrollY || 0 : 0
    );
    const glowLockedRef = useRef(false);

    const [form, setForm] = useState({
        name: "",
        company: "",
        email: "",
        message: "",
        phoneCountry: "+1-United States",
        phoneNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [errors, setErrors] = useState({
        name: false,
        company: false,
        email: false,
        message: false,
    });

    const [glowAmount, setGlowAmount] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Main scroll progress tracker for the section
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let rafId = 0;

        const update = () => {
            rafId = 0;
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;

            // Progress: 0 when section top hits bottom of viewport, 1 when section top is at 30% from top
            const start = vh;
            const end = vh * 0.3;
            const progress = clamp01((start - rect.top) / (start - end));

            setScrollProgress(progress);
        };

        const onScrollOrResize = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            rafId && window.cancelAnimationFrame(rafId);
        };
    }, []);

    // Title glow effect
    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;

        let rafId = 0;

        const update = () => {
            rafId = 0;

            const currentScrollY = window.scrollY || 0;
            const isScrollingDown = currentScrollY > lastScrollYRef.current;
            lastScrollYRef.current = currentScrollY;

            const rect = el.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const titleCenter = rect.top + rect.height / 2;
            const distance = Math.abs(titleCenter - viewportCenter);

            // Near = strongly glowing, Far = fully gradient
            const near = 130;
            const far = 260;
            const t = clamp01(1 - (distance - near) / (far - near));
            const dynamicGlow = smoothstep(t);

            // Only lock the glow once the title is sufficiently centered.
            const LOCK_THRESHOLD = 0.72;

            if (!isScrollingDown) {
                glowLockedRef.current = false;
                setGlowAmount(dynamicGlow);
                return;
            }

            if (dynamicGlow >= LOCK_THRESHOLD) glowLockedRef.current = true;

            if (!glowLockedRef.current) {
                setGlowAmount(dynamicGlow);
                return;
            }

            // User is scrolling down and glow has been locked: prevent it from decreasing.
            setGlowAmount((prev) => Math.max(prev, dynamicGlow));
        };

        const onScrollOrResize = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            rafId && window.cancelAnimationFrame(rafId);
        };
    }, []);

    const phoneFull = `${form.phoneCountry.split('-')[0]}${form.phoneNumber?.trim() ? ` ${form.phoneNumber.trim()}` : ""}`;

    const emailContact = ReactDOMServer.renderToString(
        <ContactEmailTemplate
            message={form.message}
            name={form.name}
            email={form.email}
            company={form.company}
            phone={phoneFull}
        />
    );

    const emailConfig = {
        subject: "Thank you for contacting VideFace!",
        from: "VideFace",
        receiverEmails: [
            "videfaceapp@gmail.com",
            "ariel@videface.com",
            "nathalia.benitez@videface.app",
            form.email, // el cliente que escribió
        ],
    };

    //const emailConfig = {
    //    subject: "Thank you for contacting VideFace!",
    //    from: "VideFace",
    //    receiverEmail1: "videfaceapp@gmail.com",
    //    receiverEmail2: form.email,
    //};

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = {
            name: form.name === "",
            company: form.company === "",
            email: form.email === "",
            message: form.message === "",
        };

        if (newErrors.name || newErrors.company || newErrors.email || newErrors.message) {
            hasErrors = true;
        }

        setErrors(newErrors);

        if (hasErrors) {
            return;
        }

        setLoading(true);

        const data = {
            name: form.name,
            email: form.email,
            phone: phoneFull,
            companyId: "VideFace",
            office: "Webpage",
            emailConfig: emailConfig,
            htmlContactTemplate: emailContact,
        };

        fetch("https://videface-backend-166917106706.us-east1.run.app/api/v1/cars/inspections/emails/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(
                () => {
                    setLoading(false);
                    setEmailSent(true);

                    setForm({
                        name: "",
                        company: "",
                        email: "",
                        message: "",
                        phoneCountry: "+1-United States",
                        phoneNumber: "",
                    });
                },
                (error) => {
                    setLoading(false);
                    console.error(error);

                    alert("Ahh, something went wrong. Please try again.");
                }
            );
    };

    // Animation progress calculations
    const bgMotion = easeOutCubic(clamp01(scrollProgress / 0.38));
    const bgOpacity = smoothstep(clamp01(scrollProgress / 0.75));

    // Particles: 44-82% of scroll
    const particlesProgress = easeOutCubic(clamp01((scrollProgress - 0.44) / 0.38));
    // Title: 60-94% of scroll
    const titleProgress = easeOutCubic(clamp01((scrollProgress - 0.60) / 0.34));
    // Form: 75-100% of scroll
    const formProgress = easeOutCubic(clamp01((scrollProgress - 0.75) / 0.25));

    // Background style with animation
    const bgStyle = {
        background:
            "radial-gradient(ellipse 135% 135% at 50% 48%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
        opacity: bgOpacity,
        transform: `translateY(${(1 - bgMotion) * 120}px)`,
        transition: "transform 170ms ease-out, opacity 220ms ease-out",
    };

    // Particles styles (expansion + fade)
    const particlesStyle = {
        opacity: particlesProgress * 0.5,
        transform: `translate(-50%, -50%) scale(${0.5 + 0.5 * particlesProgress})`,
        transition: "transform 200ms ease-out, opacity 200ms ease-out",
    };

    // Title container styles
    const titleContainerStyle = {
        opacity: titleProgress,
        transform: `translateY(${(1 - titleProgress) * 40}px)`,
        transition: "transform 180ms ease-out, opacity 180ms ease-out",
    };

    // Form container styles
    const formContainerStyle = {
        opacity: formProgress,
        transform: `translateY(${(1 - formProgress) * 60}px)`,
        transition: "transform 200ms ease-out, opacity 200ms ease-out",
    };

    return (
        <Section customPaddings="py-0">
            <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
                {/* Animated background */}
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={bgStyle}
                />

                {/* Animated particles */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] z-10"
                    style={particlesStyle}
                >
                    <BackgroundCircles className="absolute inset-0 rounded-full border border-white/10" />
                </div>

                <div className="relative z-20 flex min-h-screen flex-col">
                    <div className="flex flex-1 flex-col items-center justify-center px-4 mt-28 pb-14">
                        {/* Title with glow effect */}
                        <div style={titleContainerStyle}>
                            <h2
                                ref={titleRef}
                                className="text-center font-semibold text-4xl md:text-6xl tracking-tight mb-10"
                            >
                                <span className="relative inline-block">
                                    <span
                                        aria-hidden
                                        style={{
                                            background: "linear-gradient(90deg, #FFFFFF 66%, #007FFF 90%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            color: "transparent",
                                            display: "inline-block",
                                            opacity: 1 - glowAmount,
                                            transition: "opacity 280ms ease",
                                        }}
                                    >
                                        Contact us!
                                    </span>

                                    <span
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            color: "#fff",
                                            WebkitTextFillColor: "#fff",
                                            opacity: glowAmount,
                                            transition: "opacity 280ms ease",
                                            filter:
                                                "drop-shadow(0 0 18px rgba(255, 255, 255, 0.9)) brightness(1.15)",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        Contact us!
                                    </span>
                                </span>
                            </h2>
                        </div>

                        <div style={formContainerStyle} className="w-full max-w-[440px] rounded-2xl border border-white/20 bg-blue-200/20  shadow-black/30 shadow-xl">
                            <div className="p-7 md:p-8">
                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <div className="mb-5">
                                        <label htmlFor="name" className="block text-white/90 font-semibold text-sm mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            className={`w-full h-10 rounded-md bg-white px-3 text-sm text-slate-900 outline-none ${
                                                errors.name
                                                    ? "ring-2 ring-red-200"
                                                    : "ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                            }`}
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <span className="mt-2 block text-xs text-red-100">
                                                Please, write your name here.
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="company" className="block text-white/90 font-semibold text-sm mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            placeholder="Company Name"
                                            className={`w-full h-10 rounded-md bg-white px-3 text-sm text-slate-900 outline-none ${
                                                errors.company
                                                    ? "ring-2 ring-red-200"
                                                    : "ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                            }`}
                                            value={form.company}
                                            onChange={handleChange}
                                        />
                                        {errors.company && (
                                            <span className="mt-2 block text-xs text-red-100">
                                                Please, write your company&#39;s name here.
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="email" className="block text-white/90 font-semibold text-sm mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            className={`w-full h-10 rounded-md bg-white px-3 text-sm text-slate-900 outline-none ${
                                                errors.email
                                                    ? "ring-2 ring-red-200"
                                                    : "ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                            }`}
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <span className="mt-2 block text-xs text-red-100">
                                                Don&#39;t forget to write your email.
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="phoneNumber" className="block text-white/90 font-semibold text-sm mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex gap-3">
                                            <select
                                                id="phoneCountry"
                                                className="h-10 w-[132px] rounded-md bg-white px-2 text-sm text-slate-900 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                                value={form.phoneCountry}
                                                onChange={handleChange}
                                                aria-label="Country code"
                                            >
                                                {countries.map((country) => (
                                                    <option key={`${country.code}-${country.name}`} value={`${country.code}-${country.name}`}>
                                                        {country.flag} {country.name} {country.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                id="phoneNumber"
                                                type="tel"
                                                className="w-full h-10 rounded-md bg-white px-3 text-sm text-slate-900 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                                placeholder="Phone number"
                                                value={form.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-white/90 font-semibold text-sm mb-2">
                                            Tell us about your wants and needs
                                        </label>
                                        <textarea
                                            id="message"
                                            placeholder="Message"
                                            className={`w-full h-28 rounded-md bg-white px-3 py-2 text-sm text-slate-900 outline-none resize-none ${
                                                errors.message
                                                    ? "ring-2 ring-red-200"
                                                    : "ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                            }`}
                                            value={form.message}
                                            onChange={handleChange}
                                        />
                                        {errors.message && (
                                            <span className="mt-2 block text-xs text-red-100">
                                                The message can&#39;t be empty. Please, say anything!
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={emailSent}
                                            className={`h-10 w-36 rounded-md border border-white/40 text-white font-semibold tracking-wide uppercase text-sm transition-colors ${
                                                emailSent
                                                    ? "opacity-60 cursor-not-allowed"
                                                    : "hover:bg-white/10"
                                            }`}
                                        >
                                            {loading ? "Sending..." : emailSent ? "Sent" : "Send"}
                                        </button>
                                    </div>

                                    {emailSent && (
                                        <div className="mt-4 text-center text-white font-semibold text-lg">
                                            Form submitted successfully!
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </section>
        </Section>
    );
};

export default Contact;
