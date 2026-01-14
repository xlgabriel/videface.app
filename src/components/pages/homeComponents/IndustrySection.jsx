import IndustryCarousel from "./IndustryCarousel";
import IndustryStats from "./IndustryStats";

export default function IndustrySection() {
    return (
        <section className="w-full pt-10">
            <div className="container flex flex-col items-center">
                <h2 className="text-center text-4xl font-medium md:text-6xl">
                    Flexible by{" "}
                    <span
                        className="pb-2 font-bold"
                        style={{
                            background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                            display: "inline-block",
                        }}
                    >
                        Design.
                    </span>{" "}
                    Ready for Every{" "}
                    <span
                        className="pb-2 font-bold"
                        style={{
                            background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                            display: "inline-block",
                        }}
                    >
                        Industry.
                    </span>
                </h2>

                <h3 className="mt-4 text-center text-2xl text-n-1/70">
                    Made to fit your team &amp; industry
                </h3>
            </div>

            <div className="mt-20">
                <IndustryCarousel />
            </div>

            <div className="mt-0">
                <IndustryStats />
            </div>
        </section>
    );
}
