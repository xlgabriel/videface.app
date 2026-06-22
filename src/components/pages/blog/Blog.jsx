import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import BlogCard from "./BlogCard";

import img1 from "../../../assets/gallery/1.webp";
import img2 from "../../../assets/gallery/2.webp";
import img3 from "../../../assets/gallery/3.webp";
import img4 from "../../../assets/gallery/4.webp";
import img6 from "../../../assets/gallery/6.webp";
import img7 from "../../../assets/gallery/7.webp";
import img8 from "../../../assets/gallery/8.webp";
import img9 from "../../../assets/gallery/9.webp";
import img10 from "../../../assets/gallery/10.webp";

const INITIAL_COUNT = 8;

const blogPosts = [
    {
        id: 1,
        image: img1,
        category: "Car Rental Software",
        title: "Free Demo: See How Rently Can Transform Your Operation in Minutes",
        date: "March 05, 2026",
    },
    {
        id: 2,
        image: img2,
        category: "Car Rental Software",
        title: "Why Self-Check-In Kiosks Are the Future of Car Rental",
        date: "March 05, 2026",
    },
    {
        id: 3,
        image: img3,
        category: "Digital Innovation",
        title: "How Automation Is Reducing Wait Times Across the Industry",
        date: "February 28, 2026",
    },
    {
        id: 4,
        image: img4,
        category: "Digital Innovation",
        title: "Top 5 Operational Challenges Solved by Smart Lockers",
        date: "February 20, 2026",
    },
    {
        id: 5,
        image: img6,
        category: "Hotel Technology",
        title: "Seamless Guest Experience: VideFace Kiosks in Hospitality",
        date: "February 15, 2026",
    },
    {
        id: 6,
        image: img7,
        category: "Hotel Technology",
        title: "KeyDrop Integration: Managing Keys Effortlessly at Scale",
        date: "February 10, 2026",
    },
    {
        id: 7,
        image: img8,
        category: "Operational Innovation",
        title: "All-in-One Solutions: Why Consolidation Drives ROI",
        date: "January 30, 2026",
    },
    {
        id: 8,
        image: img9,
        category: "Operational Innovation",
        title: "The Rise of Contactless Operations in High-Traffic Venues",
        date: "January 22, 2026",
    },
    {
        id: 9,
        image: img10,
        category: "Car Rental Software",
        title: "Data-Driven Fleet Management: Turning Insights into Action",
        date: "January 15, 2026",
    },
];

export default function Blog() {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const visiblePosts = blogPosts.slice(0, visibleCount);
    const hasMore = visibleCount < blogPosts.length;

    return (
        <>
            <Header />

            <main className="pt-28 pb-20 px-4 max-w-[1200px] mx-auto">
                {/* Page heading */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        VideFace Blog
                    </h1>
                    <h2
                        className="text-2xl md:text-3xl font-bold leading-snug"
                        style={{
                            background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                            display: "inline-block",
                        }}
                    >
                        Insights on Automation, Digital Solutions
                        <br className="hidden md:block" /> and Operational Innovation
                    </h2>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {visiblePosts.map((post) => (
                        <BlogCard
                            key={post.id}
                            image={post.image}
                            category={post.category}
                            title={post.title}
                            date={post.date}
                            onRead={() => navigate("/blog/post", { state: { post } })}
                        />
                    ))}
                </div>

                {/* Read more button */}
                {hasMore && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setVisibleCount((c) => c + INITIAL_COUNT)}
                            className="border border-gray-400 text-gray-700 font-semibold px-8 py-3 rounded-full lowercase hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
                            style={{ textTransform: "none" }}
                        >
                            Read more
                        </button>
                    </div>
                )}
            </main>

            {/* <Footer /> */}
        </>
    );
}
