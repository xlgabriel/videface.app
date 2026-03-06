import ButtonGradient from "../../../assets/svg/ButtonGradient";
import Benefits from "../../Benefits";
import Collaboration from "../../Collaboration";
import Footer from "../../Footer";
import Header from "../../Header";
import Hero from "./sections/Hero";
import Experiences from "./sections/Experiences";
import IndustrySection from "./sections/IndustrySection";
import Pricing from "../../Pricing";
import Testimonials from "./sections/Testimonials";
import Contact from "../../Contact";
import Services from "./sections/Services";
import ImageGallery from "./homeComponents/ImageGallery";
import Seo from "../../Seo";
import { homeOG } from "../../../assets";

export default function Home() {
    return (
        <>
            <Seo
                title="Virtual Assistance Platform for Modern Businesses | VideFace"
                description="VideFace is a virtual assistance platform that helps businesses reduce operational costs, deliver 24/7 human support through digital and self-service solutions."
                canonical="https://videface.com/"
                image={homeOG}
            />
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
                <Hero />
                <Experiences />
                <IndustrySection />
                <Services />
                {/* <Benefits /> */}
                {/* <Collaboration /> */}
                <Pricing />
                <Testimonials />
                <div id="contact">
                    <Contact />
                </div>

            </div>

            <ButtonGradient />
        </>
    );
}
