import Button from "../../Button";
import CompanyLogos from "../../CompanyLogos";
import { BottomLine } from "../../design/Hero";
import ImagePrincipalBG from "../../../assets/hero/ImagePrincipalBG.webp";
import ImagePrincipalUSER from "../../../assets/hero/ImagePrincipalUSER.webp";
import ImageInterfaz from "../../../assets/hero/interfaz.png";

const Hero = () => {
    return (
        <div id="hero" className="w-full pt-12 pb-10 lg:pt-16 lg:pb-12 xl:pt-20 xl:pb-16">
            <div className="container flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="w-full lg:flex-1 lg:max-w-[34rem] flex flex-col justify-center items-start text-left">
                    <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
                        Your Entire Customer<br />Service Operation,<br />Powered by Virtual Assistance.
                    </h1>
                    <div className="w-full flex justify-center mt-8">
                        <Button
                            href="#demo"
                            color="bg-[#0A6CFF]"
                            textColor="text-white"
                            size="lg"
                            className="shadow-lg"
                        >
                            REQUEST A DEMO
                        </Button>
                    </div>
                </div>
                <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[826px] overflow-visible">
                        <img
                            src={ImagePrincipalBG}
                            alt="Background"
                            className="block w-full h-auto"
                        />
                        <img
                            src={ImagePrincipalUSER}
                            alt="User"
                            className="absolute bottom-0 right-0 z-10 pointer-events-none"
                            style={{ background: "transparent", height: "auto" }}
                        />
                        <img
                            src={ImageInterfaz}
                            alt="User"
                            className="absolute bottom-0 right-0 z-10 pointer-events-none"
                            style={{ background: "transparent", height: "auto" }}
                        />
                    </div>
                </div>
            </div>
            <div className="container text-center mt-40 mb-4">
                                <h2
                                    className="font-bold text-3xl md:text-6xl pb-2"
                                    style={{
                                        background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent',
                                        display: 'inline-block',
                                    }}
                                >
                                    Empowering Businesses
                                </h2>
                <p className="text-2xl md:text-6xl font-normal text-black mb-6">
                    with Seamless Remote Service
                </p>
                <CompanyLogos className="z-10 mt-20" />

            </div>

        </div>
    );
};

export default Hero;
