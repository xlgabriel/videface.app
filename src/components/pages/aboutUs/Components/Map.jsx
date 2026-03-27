import { useState } from 'react';
import MapPin from './MapPin';
import mapImage from '../../../../assets/webp/Map.webp';

// Configuración fácil para editar luego (posicionamiento en porcentaje)
const locationPins = [
    { id: 1, top: '45%', left: '16%', city: 'Ciudad', country: 'País' }, // Ej: California/US West
    { id: 2, top: '48%', left: '22%', city: 'Ciudad', country: 'País' }, // Ej: Texas/US Central
    { id: 3, top: '46%', left: '26%', city: 'Ciudad', country: 'País' }, // Ej: New York/US East
    { id: 4, top: '56%', left: '25%', city: 'Ciudad', country: 'País' }, // Ej: Florida/Caribbean
    { id: 5, top: '65%', left: '30%', city: 'Ciudad', country: 'País' }, // Ej: Colombia/LatAm Top
    { id: 6, top: '76%', left: '32%', city: 'Ciudad', country: 'País' }, // Ej: Brasil/Argentina
    { id: 7, top: '35%', left: '48%', city: 'Ciudad', country: 'País' }, // Ej: UK
    { id: 8, top: '41%', left: '52%', city: 'Frankfurt', country: 'Germany' }, // Elemento ejemplo
    { id: 9, top: '45%', left: '49%', city: 'Ciudad', country: 'País' }, // Ej: España/Francia
    { id: 10, top: '48%', left: '55%', city: 'Ciudad', country: 'País' }, // Ej: Medio Oriente
];

export default function GlobalMap() {
    // Estado para controlar la pausa de la animación
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="relative py-0 w-full overflow-hidden flex flex-col items-center justify-center">
            
            {/* Animación especial fluida y continua controlada por CSS */}
            <style>
                {`
                @keyframes rotacionContinuaMapa {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .mapa-animado-rotacion {
                    display: flex;
                    width: max-content; /* Se ajusta automáticamente al contenido real */
                    animation: rotacionContinuaMapa 45s linear infinite;
                    will-change: transform;
                }
                .mapa-animado-rotacion.pausado {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div className="container relative z-10 mx-auto px-5 mb-16 text-center">
                <h2 className="text-[#0A6CFF] text-3xl md:text-5xl lg:text-[52px] font-bold tracking-tight uppercase mt-12 mb-10">
                    WE ARE GLOBAL
                </h2>
            </div>
            
            {/* Contenedor del Carrusel - Mapa en rotación sin espacios excesivos */}
            <div className="relative w-full overflow-hidden flex justify-start">
                <div className={`mapa-animado-rotacion ${isHovered ? 'pausado' : ''}`}>
                    
                    {/* 1era Versión Visual del Mapa (Izquierda) */}
                    <div className="relative w-[2200px] flex-shrink-0 px-0">
                        <div className="relative w-full mt-12 mb-12">
                            <img src={mapImage} alt="World Map" className="w-full h-auto pointer-events-none drop-shadow-sm opacity-90 object-contain" />
                            {locationPins.map(pin => (
                                <MapPin 
                                    key={`map1-${pin.id}`} 
                                    {...pin} 
                                    onHover={setIsHovered}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 2da Versión para empalmar sutilmente el infinito (Derecha) */}
                    <div className="relative w-[2200px] flex-shrink-0 px-0">
                        <div className="relative w-full mt-12 mb-12">
                            <img src={mapImage} alt="World Map" className="w-full h-auto pointer-events-none drop-shadow-sm opacity-90 object-contain" />
                            {locationPins.map(pin => (
                                <MapPin 
                                    key={`map2-${pin.id}`} 
                                    {...pin} 
                                    onHover={setIsHovered}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            
        </section>
    );
}
