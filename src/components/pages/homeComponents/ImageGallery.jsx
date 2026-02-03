import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function getOrderedGalleryImages() {
    const modules = import.meta.glob("../../../assets/gallery/*.{png,jpg,jpeg,webp,avif}", {
        eager: true,
        import: "default",
    });

    const entries = Object.entries(modules);

    const extractNum = (path) => {
        const file = path.split("/").pop() || "";
        const m = file.match(/(\d+)/);
        return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
    };

    return entries
        .sort((a, b) => extractNum(a[0]) - extractNum(b[0]))
        .map(([, url]) => url);
}

export default function ImageGallery({ className = "" }) {
    const images = useMemo(() => getOrderedGalleryImages(), []);
    const [activeIndex, setActiveIndex] = useState(0);
    // Metadata for gallery images keyed by filename (basename)
    const imgMetadata = useMemo(() => ({
        "1.webp": {
            alt: "VideFace Key Drop System",
            title: "VideFace key drop system located outside a customer service office",
        },
        "2.webp": {
            alt: "VideFace Customer Service Offices",
            title: "VideFace offices featuring virtual customer service assistance booths",
        },
        "3.webp": {
            alt: "NextCar Office Using VideFace",
            title: "NextCar car rental office equipped with VideFace virtual service booths",
        },
        "4.webp": {
            alt: "Office with Virtual Assistance Booths",
            title: "Office with three virtual assistance booths for customer service operations",
        },
        "5.webp": {
            alt: "Digitally Transformed Office",
            title: "Digitally transformed office with virtual assistance and automation elements",
        },
        "6.webp": {
            alt: "Car Rental Customer Service Office",
            title: "Car rental office with virtual customer service booths for vehicle rentals",
        },
        "7.webp": {
            alt: "Customer Service Assistance Booth",
            title: "Customer service booth with a woman using virtual assistance technology",
        },
        "8.webp": {
            alt: "VideFace Office with Virtual Assistance",
            title: "VideFace office with chairs and virtual customer assistance setup",
        },
        "9.webp": {
            alt: "Carwiz Car Rental Office",
            title: "Carwiz car rental office using VideFace virtual customer service booths",
        },
        "10.webp": {
            alt: "VideFace Team Collaboration",
            title: "VideFace team working together in a social and collaborative environment",
        },
    }), []);

    const getBasename = (src) => (src || "").split("/").pop().split("?")[0];
    const [selectedIndex, setSelectedIndex] = useState(null);
    const sectionRef = useRef(null);
    const [phase, setPhase] = useState("hidden");
    const [imgMeta, setImgMeta] = useState({});
    const swipeStartXRef = useRef(null);

    // Intersection observer for scroll-triggered animation
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                setPhase(entry.isIntersecting ? "shown" : "hidden");
            },
            { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Keep active index in range if images change
    useEffect(() => {
        if (images.length === 0) return;
        if (activeIndex >= images.length) setActiveIndex(0);
    }, [images, activeIndex]);

    // Close modal on Escape
    useEffect(() => {
        if (selectedIndex === null) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") setSelectedIndex(null);
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedIndex]);

    // Auto-play: advance every 3 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const getPuzzleStyle = (i) => {
        const dir = i % 4;
        const dx = dir === 0 ? -40 : dir === 1 ? 40 : dir === 2 ? -25 : 25;
        const dy = dir < 2 ? 30 : -30;
        const rot = dir % 2 === 0 ? -4 : 4;
        const delay = 60 + i * 45;
        return {
            "--pz-x": `${dx}px`,
            "--pz-y": `${dy}px`,
            "--pz-r": `${rot}deg`,
            "--pz-d": `${delay}ms`,
        };
    };

    const activeSrc = images[activeIndex] || images[0];

    useEffect(() => {
        if (!activeSrc) return;
        if (imgMeta[activeSrc]) return;

        const img = new window.Image();
        img.onload = () => {
            setImgMeta((prev) => ({
                ...prev,
                [activeSrc]: { w: img.naturalWidth, h: img.naturalHeight },
            }));
        };
        img.src = activeSrc;
    }, [activeSrc, imgMeta]);

    const goPrev = () => {
        if (!images.length) return;
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
    };

    const goNext = () => {
        if (!images.length) return;
        setActiveIndex((i) => (i + 1) % images.length);
    };

    const onThumbsPointerDown = (e) => {
        swipeStartXRef.current = e.clientX;
    };

    const onThumbsPointerUp = (e) => {
        const startX = swipeStartXRef.current;
        swipeStartXRef.current = null;
        if (startX === null) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) < 35) return;
        if (dx < 0) goNext();
        else goPrev();
    };

    const isVertical =
        !!imgMeta[activeSrc]?.w &&
        !!imgMeta[activeSrc]?.h &&
        imgMeta[activeSrc].h / imgMeta[activeSrc].w > 1.15;
    // For vertical photos, we lower the framing to show more of the object and people.
    const mainObjectPosition = isVertical ? "center 55%" : "center";

    const maxThumbs = 5;
    const visibleThumbs = Math.min(images.length, maxThumbs);
    const half = Math.floor(visibleThumbs / 2);
    const thumbsStart =
        images.length <= visibleThumbs
            ? 0
            : Math.min(
                  Math.max(activeIndex - half, 0),
                  images.length - visibleThumbs
              );
    const thumbSlice = images.slice(thumbsStart, thumbsStart + visibleThumbs);

    return (
        <section
            ref={sectionRef}
            id="gallery"
            className={`${className} py-10 sm:py-12`}
        >
            <div className="container max-w-5xl mx-auto px-4">
                <div className={`featured-wrap ${phase === "shown" ? "featured-shown" : "featured-hidden"}`}>
                    <div className="featured-main" style={getPuzzleStyle(activeIndex)}>
                        <button
                            type="button"
                            className="nav-arrow nav-arrow-left"
                            onClick={goPrev}
                            aria-label="Imagen anterior"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                                <path
                                    d="M15 18l-6-6 6-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.img
                                key={activeSrc}
                                className="featured-main-img"
                                src={activeSrc}
                                alt={(() => {
                                    const m = imgMetadata[getBasename(activeSrc)];
                                    return m?.alt || `Featured image ${activeIndex + 1} of VideFace`;
                                })()}
                                title={(() => {
                                    const m = imgMetadata[getBasename(activeSrc)];
                                    return m?.title ?? m?.alt ?? "Image showcasing VideFace virtual assistance services";
                                })()}
                                style={{ objectPosition: mainObjectPosition }}
                                initial={{ opacity: 0, scale: 0.985 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.99 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                onClick={() => setSelectedIndex(activeIndex)}
                                draggable={false}
                                drag={images.length > 1 ? "x" : false}
                                dragConstraints={{ left: -80, right: 80 }}
                                dragElastic={0.25}
                                dragSnapToOrigin
                                onDragEnd={(_, info) => {
                                    const dx = info.offset.x;
                                    const vx = info.velocity.x;
                                    if (dx < -55 || vx < -700) goNext();
                                    if (dx > 55 || vx > 700) goPrev();
                                }}
                            />
                        </AnimatePresence>
                        <button
                            type="button"
                            className="nav-arrow nav-arrow-right"
                            onClick={goNext}
                            aria-label="Imagen siguiente"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                                <path
                                    d="M9 6l6 6-6 6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <motion.div
                        className="featured-thumbs"
                        role="group"
                        aria-label="Miniaturas"
                        drag="x"
                        dragMomentum={false}
                        dragElastic={0}
                        onDrag={(event, info) => {
                            const el = event.currentTarget;
                            el.scrollLeft -= info.delta.x;
                        }}
                    >
                        {thumbSlice.map((src, i) => {
                            const index = thumbsStart + i;
                            return (
                            <button
                                key={src}
                                type="button"
                                className={`thumb ${index === activeIndex ? "thumb-active" : ""}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Seleccionar imagen ${index + 1}`}
                            >
                                <img
                                    src={src}
                                    className="thumb-img"
                                    alt={(() => {
                                        const m = imgMetadata[getBasename(src)];
                                        return m?.alt || `Thumbnail image ${index + 1}`;
                                    })()}
                                    title={(() => {
                                        const m = imgMetadata[getBasename(src)];
                                        return m?.title ?? m?.alt ?? "Image showcasing VideFace virtual assistance services";
                                    })()}
                                    loading="lazy"
                                    draggable={false}
                                />
                            </button>
                            );
                        })}
                    </motion.div>

                    <div className="featured-dots" aria-label="Navegación por puntos">
                        {images.map((src, index) => (
                            <button
                                key={src}
                                type="button"
                                className={`dot ${index === activeIndex ? "dot-active" : ""}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setSelectedIndex(null)}
                    >
                        <motion.div
                            className="lightbox-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.img
                            src={images[selectedIndex]}
                            alt={(() => {
                                const m = imgMetadata[getBasename(images[selectedIndex])];
                                return m?.alt || `Image ${selectedIndex + 1} from the VideFace gallery`;
                            })()}
                            title={(() => {
                                const m = imgMetadata[getBasename(images[selectedIndex])];
                                return m?.title ?? m?.alt ?? "Image showcasing VideFace virtual assistance services";
                            })()}
                            className="lightbox-img"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                            draggable={false}
                        />
                        <button
                            type="button"
                            className="lightbox-close"
                            onClick={() => setSelectedIndex(null)}
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .featured-wrap {
                    display: grid;
                    gap: 24px;
                }

                /* Main image (fill + crop) */
                .featured-main {
                    position: relative;
                    overflow: hidden;
                    border-radius: 12px;
                    box-shadow:
                        12px 12px 2px rgba(37, 99, 235, 0.16),
                        10px 10px 18px rgba(37, 99, 235, 0.16),
                        0 0 0 1px rgba(37, 99, 235, 0.22);
                }

                .nav-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 2;
                    width: 40px;
                    height: 40px;
                    border-radius: 999px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    color: #2563eb;
                    background: rgba(255, 255, 255, 0.92);
                    box-shadow:
                        0 14px 24px rgba(37, 99, 235, 0.18),
                        0 0 0 1px rgba(37, 99, 235, 0.18);
                    transition: transform 180ms ease, background 180ms ease, opacity 180ms ease;
                    opacity: 0.95;
                }

                .nav-arrow:hover {
                    background: #dbeafe;
                    transform: translateY(-50%) scale(1.06);
                }

                .nav-arrow-left {
                    left: 10px;
                }

                .nav-arrow-right {
                    right: 10px;
                }

                .featured-main-img {
                    width: 100%;
                    height: clamp(280px, 52vh, 480px);
                    max-width: 100%;
                    object-fit: cover;
                    object-position: center;
                    display: block;
                    cursor: pointer;
                    transform: scale(1.06);
                    transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: transform;
                }

                .featured-main:hover .featured-main-img {
                    transform: scale(1.1);
                }

                /* Thumbnails row */
                .featured-thumbs {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 10px;
                }

                @media (min-width: 768px) {
                    .featured-thumbs {
                        grid-template-columns: repeat(5, minmax(0, 1fr));
                        gap: 16px;
                    }
                }

                .thumb {
                    position: relative;
                    border-radius: 10px;
                    overflow: hidden;
                    border: none;
                    padding : 0;
                    background: transparent;
                    cursor: pointer;
                    height: 72px;
                    box-shadow:
                        8px 8px 0px rgba(37, 99, 235, 0.18),
                        0 0 0 1px rgba(37, 99, 235, 0.18);
                    transition: transform 220ms ease, box-shadow 220ms ease;
                }

                @media (min-width: 768px) {
                    .thumb {
                        height: 80px;
                    }
                }

                .thumb:hover {
                    transform: translateY(-1px);
                    box-shadow:
                        8px 8px 0px rgba(37, 99, 235, 0.22),
                        0 0 0 1px rgba(37, 99, 235, 0.26),
                        0 8px 16px rgba(37, 99, 235, 0.14);
                }

                .thumb-active {
                    box-shadow:
                        10px 10px 2px rgba(37, 99, 235, 0.26),
                        0 0 0 2px rgba(37, 99, 235, 0.55),
                        0 10px 18px rgba(37, 99, 235, 0.18);
                }

                .thumb-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center 40%;
                    display: block;
                    transform: scale(1.12);
                    transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
                }

                .thumb:hover .thumb-img {
                    transform: scale(1.18);
                }

                .featured-dots {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 12px;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 999px;
                    border: none;
                    cursor: pointer;
                    background: rgba(37, 99, 235, 0.18);
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.14);
                    transition: transform 180ms ease, background 180ms ease;
                }

                .dot:hover {
                    transform: scale(1.15);
                }

                .dot-active {
                    background: rgba(37, 99, 235, 0.9);
                }

                /* Entrance animation (resets when leaving viewport) */
                .featured-hidden {
                    opacity: 0;
                    transform: scale(0.7);
                    filter: blur(4px);
                    transition:
                        transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 400ms cubic-bezier(0.22, 1, 0.36, 1),
                        filter 400ms cubic-bezier(0.22, 1, 0.36, 1);
                }

                .featured-shown {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                    filter: blur(0);
                    transition:
                        transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 400ms cubic-bezier(0.22, 1, 0.36, 1),
                        filter 400ms cubic-bezier(0.22, 1, 0.36, 1);
                }

                /* Lightbox */
                .lightbox-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .lightbox-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                .lightbox-img {
                    position: relative;
                    z-index: 10;
                    max-width: 90vw;
                    max-height: 85vh;
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(37, 99, 235, 0.5);
                }

                .lightbox-close {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    z-index: 20;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.95);
                    border: none;
                    font-size: 20px;
                    font-weight: 600;
                    color: #222;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s, background 0.2s;
                }

                .lightbox-close:hover {
                    background: #fff;
                    transform: scale(1.1);
                }

                @media (prefers-reduced-motion: reduce) {
                    .featured-hidden,
                    .featured-shown {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                        filter: none !important;
                    }
                    .thumb,
                    .thumb-img,
                    .featured-main-img {
                        transition: none !important;
                    }
                }
            `}</style>
        </section>
    );
}
