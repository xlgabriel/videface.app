import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import BlogCard from "./BlogCard";

import img1 from "../../../assets/gallery/1.webp";
import img2 from "../../../assets/gallery/2.webp";
import img4 from "../../../assets/gallery/4.webp";
import img6 from "../../../assets/gallery/6.webp";

const faqs = [
    {
        id: 1,
        question: "How long does it take to install a VideFace kiosk?",
        answer:
            "Installation typically takes between 2 and 4 hours depending on the location. Our team handles everything from hardware setup to software configuration and staff training.",
    },
    {
        id: 2,
        question: "Can the kiosk integrate with our existing rental management system?",
        answer:
            "Yes. VideFace kiosks are designed to integrate with the most widely used rental management platforms through a secure API. Custom integrations are also available.",
    },
    {
        id: 3,
        question: "What happens if a customer encounters an issue at the kiosk?",
        answer:
            "The kiosk has a built-in live support option that connects the customer with a remote agent in seconds. Additionally, our 24/7 monitoring team can intervene proactively.",
    },
    {
        id: 4,
        question: "Is the kiosk available in multiple languages?",
        answer:
            "Yes, the interface supports English, Spanish, French, German, and additional languages can be configured based on your location and customer base.",
    },
];

const recommendedPosts = [
    {
        id: "r1",
        image: img4,
        category: "Digital Innovation",
        title: "Top 5 Operational Challenges Solved by Smart Lockers",
        date: "February 20, 2026",
    },
    {
        id: "r2",
        image: img6,
        category: "Hotel Technology",
        title: "Seamless Guest Experience: VideFace Kiosks in Hospitality",
        date: "February 15, 2026",
    },
];

function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer select-none"
            onClick={() => setOpen((v) => !v)}
        >
            <div className="flex items-center justify-between px-5 py-4">
                <span className="font-semibold text-gray-800 text-[15px] pr-4">{question}</span>
                <span
                    className="text-blue-500 text-2xl font-light flex-shrink-0 transition-transform duration-200"
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                    +
                </span>
            </div>
            {open && (
                <div className="px-5 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 text-[14px] leading-relaxed pt-3">{answer}</p>
                </div>
            )}
        </div>
    );
}

export default function BlogPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state?.post;

    const heroImage = post?.image ?? img1;
    const title = post?.title ?? "Free Demo: See How Rently Can Transform Your Operation in Minutes";
    const category = post?.category ?? "Car Rental Software";
    const date = post?.date ?? "March 05, 2026";

    return (
        <>
            <Header />

            <main className="pt-28 pb-20">
                <article className="max-w-[780px] mx-auto px-4">

                    {/* Back link */}
                    <button
                        onClick={() => navigate("/blog")}
                        className="text-blue-500 text-sm font-semibold mb-6 flex items-center gap-1 hover:underline"
                        style={{ textTransform: "none" }}
                    >
                        ← Back to Blog
                    </button>

                    {/* Category */}
                    <p className="text-[11px] font-bold tracking-widest uppercase text-blue-500 mb-2">
                        {category}
                    </p>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-2">
                        {title}
                    </h1>
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-8">{date}</p>

                    {/* Hero image */}
                    <div className="rounded-2xl overflow-hidden mb-8 w-full">
                        <img
                            src={heroImage}
                            alt={title}
                            className="w-full object-cover max-h-[420px]"
                        />
                    </div>

                    {/* First paragraph */}
                    <p className="text-gray-700 text-[15px] leading-relaxed mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed porta dui. Donec eros
                        urna, dictum sed condimentum quis, viverra sed libero. Fusce elementum eu nulla nec
                        blandit. Pellentesque gravida posuere lacus quis porta. Ut fermentum augue id nunc
                        fringilla, a ultrices lacus pulvinar. Integer ut lectus dui. Duis sed sem velit. Ut vel
                        dictum purus, sit amet tempor ligula. Sed eget nulla a augue feugiat feugiat. Vivamus
                        vehicula ornare mauris, in imperdiet nulla lacus sed. Praesent lectus odio, finibus id
                        vulputate sed, scelerisque ultrices elit. In nisi eros, blandit eu urna id, porta tempus
                        erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Duis non dolor ut diam lacinia sollicitudin. Etiam molestie sem diam, vitae
                        malesuada nisi ullamcorper quis. Fusce rutrum ultrices tellus nec dapibus.
                    </p>

                    {/* Text + side image */}
                    <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
                        <p className="text-gray-700 text-[15px] leading-relaxed flex-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed porta dui. Donec
                            eros urna, dictum sed condimentum quis, viverra sed libero. Fusce elementum eu nulla
                            nec blandit. Pellentesque gravida posuere lacus quis porta. Ut fermentum augue id
                            nunc fringilla, a ultrices lacus pulvinar. Integer ut lectus dui. Duis sed sem velit.
                            Ut vel dictum purus, sit amet tempor ligula. Sed eget nulla a augue feugiat feugiat.
                            Vivamus vehicula ornare mauris, in imperdiet nulla lacus sed. Praesent lectus odio,
                            finibus id vulputate sed, scelerisque.
                        </p>
                        <div className="rounded-2xl overflow-hidden flex-shrink-0 w-full md:w-[220px]">
                            <img src={img2} alt="Article visual" className="w-full h-[160px] object-cover" />
                        </div>
                    </div>

                    {/* Subtitle */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">Subtitle</h2>

                    {/* Third paragraph */}
                    <p className="text-gray-700 text-[15px] leading-relaxed mb-12">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed porta dui. Donec eros
                        urna, dictum sed condimentum quis, viverra sed libero. Fusce elementum eu nulla nec
                        blandit. Pellentesque gravida posuere lacus quis porta. Ut fermentum augue id nunc
                        fringilla, a ultrices lacus pulvinar. Integer ut lectus dui. Duis sed sem velit. Ut vel
                        dictum purus, sit amet tempor ligula. Sed eget nulla a augue feugiat feugiat. Vivamus
                        vehicula ornare mauris, in imperdiet nulla lacus sed. Praesent lectus odio, finibus id
                        vulputate sed, scelerisque ultrices elit. In nisi eros, blandit eu urna id, porta tempus
                        erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Duis non dolor ut diam lacinia sollicitudin.
                    </p>

                    {/* FAQ */}
                    <section className="mb-12">
                        <h2
                            className="text-2xl md:text-3xl font-bold text-center mb-8"
                            style={{
                                background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                color: "transparent",
                            }}
                        >
                            Frequently Asked Questions
                        </h2>
                        <div className="flex flex-col gap-3">
                            {faqs.map((faq) => (
                                <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </section>

                    {/* Recommended articles */}
                    <section>
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={() => navigate("/blog")}
                                className="border border-blue-500 text-blue-600 font-semibold px-6 py-2 rounded-lg text-sm hover:bg-blue-600 hover:text-white transition-all duration-200"
                                style={{ textTransform: "none" }}
                            >
                                Recommended articles
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {recommendedPosts.map((rec) => (
                                <BlogCard
                                    key={rec.id}
                                    image={rec.image}
                                    category={rec.category}
                                    title={rec.title}
                                    date={rec.date}
                                    onRead={() => navigate("/blog/post", { state: { post: rec } })}
                                />
                            ))}
                        </div>
                    </section>
                </article>
            </main>

            {/* <Footer /> */}
        </>
    );
}
