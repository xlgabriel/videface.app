import arrowImage from '../../../../assets/webp/arrow.webp';

export default function MapPin({ top, left, city, country, onHover }) {
    return (
        <div 
            className="absolute group cursor-pointer transition-all duration-300 z-10 hover:z-50"
            style={{ top, left, transform: 'translate(-50%, -100%)' }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            {/* Contenedor Flotante (Tooltip) - Sale del centro de la flecha hacia la derecha. (Z-Index menor que la imagen) */}
            <div className="absolute left-[37px] bottom-[35px] opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 z-0 overflow-hidden rounded-r-[8px] h-[60px]"
                style={{ clipPath: 'inset(-20px -20px -20px 0px)' }}>
                <div className="-translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out delay-75 bg-[#0b3b8c] text-white pl-[10px] pr-4 py-1 h-[60px] rounded-[8px] shadow-xl min-w-[130px] flex flex-col items-start justify-center border-l-[30px] border-transparent"
                     style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.3)' }}>
                    {/* Textos City y Country */}
                    <div className="font-bold text-[18px] whitespace-nowrap leading-tight mb-0.5">{city}</div>
                    <div className="text-gray-200 text-[14px] whitespace-nowrap font-light leading-tight">{country}</div>
                </div>
            </div>
            
            {/* El icono del Pin (ahora usa la imagen arrow.webp y tiene Z-Index MAYOR) */}
            <div className="relative drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out group-hover:scale-[3.2] origin-bottom z-20 w-[30px] h-[40px]">
                <img src={arrowImage} alt="pin" className="w-full h-full object-contain pointer-events-none" />
            </div>

        </div>
    );
}