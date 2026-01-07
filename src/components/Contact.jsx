import { useRef, useState } from "react";
import Section from "./Section";
import { BackgroundCircles } from "./design/Hero";
import ReactDOMServer from "react-dom/server";
import ContactEmailTemplate from "./ContactEmailTemplate";
import Footer from "./Footer";

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        company: "",
        email: "",
        message: "",
        phoneCountry: "+1",
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

    const phoneFull = `${form.phoneCountry}${form.phoneNumber?.trim() ? ` ${form.phoneNumber.trim()}` : ""}`;

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
                        phoneCountry: "+1",
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

    return (
        <Section customPaddings="py-0">
            <div className="relative min-h-screen overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, #0A6CFF 0%, #064199 100%)",
                    }}
                />

                <div className="absolute inset-0 pointer-events-none opacity-50">
                    <BackgroundCircles className="absolute left-1/2 top-1/2 w-[78rem] aspect-square -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="relative z-10 flex min-h-screen flex-col">
                    <div className="flex flex-1 flex-col items-center justify-center px-4 pt-44 pb-14">
                        <h2 className="text-center text-white font-semibold text-4xl md:text-6xl tracking-tight mb-10">
                            Contact us!
                        </h2>

                        <div className="w-full max-w-[440px] rounded-2xl border border-white/20 bg-white/15 shadow-black/30 shadow-xl">
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
                                                <option value="+1">🇺🇸 +1</option>
                                                <option value="+52">🇲🇽 +52</option>
                                                <option value="+57">🇨🇴 +57</option>
                                                <option value="+34">🇪🇸 +34</option>
                                                <option value="+54">🇦🇷 +54</option>
                                                <option value="+56">🇨🇱 +56</option>
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
                                </form>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </Section>
    );
};

export default Contact;
