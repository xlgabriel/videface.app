const BlogCard = ({ image, category, title, date, onRead }) => {
    return (
        <div className="relative group cursor-pointer" style={{ paddingBottom: "5rem" }}>
            {/* Image with rounded corners */}
            <div className="rounded-2xl overflow-hidden h-[220px] md:h-[260px]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Floating white info card — overlaps image bottom, has side margins */}
            <div
                className="absolute bottom-0 left-4 right-4 bg-white rounded-2xl px-4 pt-3 pb-4 flex flex-col gap-1"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            >
                <p className="text-[10px] font-bold tracking-widest uppercase text-blue-500">
                    {category}
                </p>
                <h3 className="text-gray-900 font-bold text-sm md:text-[15px] leading-snug">
                    {title}
                </h3>
                <p className="text-gray-400 text-[11px] uppercase tracking-wide">
                    {date}
                </p>
                <div className="mt-2">
                    <button
                        onClick={onRead}
                        className="text-xs font-semibold border border-blue-500 text-blue-600 px-4 py-1.5 rounded-lg lowercase hover:bg-blue-600 hover:text-white transition-all duration-200"
                        style={{ textTransform: "none" }}
                    >
                        Read
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
