import { useMemo, useState } from "react";

import HotelImage from "../../../assets/hero/Hotel.jpg";
import HealthImage from "../../../assets/hero/Health.jpg";
import RentCarImage from "../../../assets/hero/RentCar.jpg";
import RestaurantImage from "../../../assets/hero/Restaurant.jpg";

const DEFAULT_ACTIVE_INDEX = 2;

export default function IndustryCarousel() {
    const items = useMemo(
        () => [
            { title: "HOTEL LOBBIES", image: HotelImage },
            { title: "HOSPITALS", image: HealthImage },
            { title: "CAR RENTALS", image: RentCarImage },
            { title: "RESTAURANTS", image: RestaurantImage },
        ],
        []
    );

    const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
    const [hoverIndex, setHoverIndex] = useState(null);

    const effectiveIndex = hoverIndex ?? activeIndex;

    return (
        <div className="w-screen">
            <div className="relative mx-auto w-full">

                <div className="flex h-[320px] w-full overflow-hidden md:h-[420px]">
                    {items.map((item, index) => {
                        const isActive = index === effectiveIndex;

                        return (
                            <div
                                key={item.title}
                                className={`relative h-full transition-[flex] duration-500 ease-out ${isActive ? "flex-[2.2]" : "flex-[1]"
                                    }`}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <button
                                    type="button"
                                    className="group relative h-full w-full text-left"
                                    onFocus={() => setHoverIndex(index)}
                                    onBlur={() => setHoverIndex(null)}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />

                                    <div
                                        className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "bg-black/10" : "bg-black/55"
                                            }`}
                                    />

                                    <div className="absolute bottom-5 left-5 z-10 flex items-end gap-3">
                                        <div className="h-6 w-[3px] bg-white" />
                                        <div className="text-base font-bold uppercase tracking-wide text-white md:text-lg">
                                            {item.title}
                                        </div>
                                    </div>

                                    <div
                                        className={`absolute inset-0 z-0 transition-all duration-500 ${isActive ? "" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
