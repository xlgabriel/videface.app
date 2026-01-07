import React, { useEffect, useState } from "react";
import Heading from "../../Heading";
import { service1, service1mobile, service2, service3, check, gradient } from "../../../assets";
import { brainwaveServices, brainwaveServicesIcons } from "../../../constants";
import {
    PhotoChatMessage,
    Gradient,
    VideoChatMessage,
} from "../../design/Services";
import Button from "../../Button";

import Generating from "../../Generating";

const Services = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section id="how-to-use">
            <div className="container mt-28">
                <div className="relative">

                    <div className="relative z-1 grid gap-5 lg:grid-cols-2">
                        <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden shadow-blue-500 shadow-lg">
                            <div className="absolute inset-0">
                                <img
                                    src={service2}
                                    className="h-full w-full object-cover"
                                    width={630}
                                    height={750}
                                    alt="robot"
                                />
                            </div>

                            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                                <h4 className="h4 text-6xl mb-4">Just touch the screen.</h4>
                                <p className="body-2 mb-[3rem] text-n-3">
                                    No matter the age, everyone can use our tools. It's that simple. We work to give the most comfortable experience to our users.
                                </p>
                            </div>

                            <PhotoChatMessage />
                        </div>

                        <div className="p-4 z-1 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem] shadow-blue-500 shadow-lg">
                            <div className="py-12 px-4 xl:px-8">
                                <h4 className="h4 text-6xl mb-4">Just answer the call.</h4>
                                <p className="body-2 mb-[2rem] text-n-3">
                                    You are one click away from assisting your clients. It's that simple.
                                </p>

                                <ul className="flex items-center justify-between">
                                    {brainwaveServicesIcons.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`rounded-2xl flex items-center justify-center ${index === 2
                                                ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                                                : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                                                }`}
                                        >
                                            <div
                                                className={
                                                    index === 2
                                                        ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                                                        : ""
                                                }
                                            >
                                                <img src={item} width={28} height={28} alt={item} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative h-[20rem] bg-color-2 rounded-xl overflow-hidden md:h-[25rem]">
                                <img
                                    src={service3}
                                    className="w-full h-full object-cover"
                                    width={520}
                                    height={400}
                                    alt="Scary robot"
                                />

                                <VideoChatMessage />
                            </div>
                        </div>
                    </div>

                    <Gradient />
                </div>
            </div>
            <div className="flex justify-center mt-20">
                <Button
                    href="#demo"
                    color="bg-[#0A6CFF]"
                    textColor="text-white"
                    size="lg"
                    className="shadow-lg"
                >
                    GET A DEMO
                </Button>
            </div>
        </section>
    );
};

export default Services;
