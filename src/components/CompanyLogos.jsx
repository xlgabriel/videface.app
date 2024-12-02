import { companyLogos } from "../constants";
import { useEffect, useRef, useState } from "react";

const CompanyLogos = ({ className }) => {
    const carouselRef = useRef(null);
    const [logoWidth, setLogoWidth] = useState(270);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setLogoWidth(120);
            } else if (window.innerWidth <= 1024) {
                setLogoWidth(120);
            } else {
                setLogoWidth(270);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        const carousel = carouselRef.current;
        let intervalId;

        const startCarousel = () => {
            intervalId = setInterval(() => {
                if (carousel) {
                    carousel.scrollBy({ left: logoWidth, behavior: "smooth" });

                    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
                        carousel.scrollTo({ left: 0 });
                    }
                }
            }, 2000);
        };

        startCarousel();

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", handleResize);
        };
    }, [logoWidth]);

    return (
        <div className={`${className} overflow-hidden relative`}>
            <h5 className="tagline mb-4 text-center text-n-6 font-bold text-lg">
                Since 2020, we are working together with some affiliates of brands like Zezgo, Economy and much more!
            </h5>
            <div
                className="flex space-x-2 items-center overflow-hidden"
                ref={carouselRef}
                style={{ scrollBehavior: "smooth", display: "flex", width: "100%" }}
            >
                {[...companyLogos, ...companyLogos].map((logo, index) => (
                    <div
                        className="flex-none md:w-1/3 lg:w-1/5 w-1/2 flex justify-center items-center h-[8.5rem]"
                        key={index}
                    >
                        <img src={logo} width={156} height={32} alt={`Logo ${index}`} />
                    </div>
                ))}
            </div>
            <h5 className="tagline mb-4 mt-4 text-center text-n-1 font-bold">Your company soon.</h5>
        </div>
    );
};

export default CompanyLogos;
