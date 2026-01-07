import React from "react";
import MessageCarousel from "./MessageCarousel";

const sampleItems = [
    {
        name: "Carlos Urrutia",
        role: "Gerente General",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim non arcu non lobortis. Proin tristique eros in mollis viverra. Aenean mollis ligula nisi. Donec vulputate.",
    },
    {
        name: "María González",
        role: "Operaciones",
        text:
            "VideFace nos permitió automatizar la recepción y entrega de llaves, reduciendo tiempos y mejorando la experiencia del cliente.",
    },
    {
        name: "Jorge Pérez",
        role: "Atención al Cliente",
        text:
            "Las videollamadas con traducción en vivo hicieron posible atender turistas sin barreras de idioma. Súper recomendable.",
    },
];

export default function Testimonials({ items = sampleItems }) {
    return (
        <section className="py-24" id="testimonials">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
                    {/* Title */}
                    <div className="z-2 max-w-[560px]">
                        <h3 className="text-[2rem] leading-tight md:text-6xl font-medium text-gray-900">
                            What our
                        </h3>
                        <div className="mt-2">
                            <span className="text-[2rem] leading-tight md:text-6xl font-bold" style={{
                                background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                                display: 'inline-block',
                            }}>
                                #VideFaceLovers
                            </span>
                            <h3 className="text-[2rem] leading-tight md:text-6xl font-medium text-gray-900">say</h3>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="flex justify-center lg:justify-end">
                        <MessageCarousel items={items} />
                    </div>

                </div>
            </div>
        </section>
    );
}
