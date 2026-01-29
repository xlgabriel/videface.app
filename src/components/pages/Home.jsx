import ButtonGradient from "../../assets/svg/ButtonGradient";
import Benefits from "../Benefits";
import Collaboration from "../Collaboration";
import Footer from "../Footer";
import Header from "../Header";
import Hero from "./homeComponents/Hero";
import Experiences from "./homeComponents/Experiences";
import IndustrySection from "./homeComponents/IndustrySection";
import Pricing from "./homeComponents/Pricing";
import Testimonials from "./homeComponents/Testimonials";
import Contact from "../Contact";
import Services from "./homeComponents/Services";
import Announcement from "../Announcement";
import ImageGallery from "./homeComponents/ImageGallery";
import Seo from "../Seo";

export default function Home() {
    return (
        <>
            <Seo
                title="Virtual Assistance Platform for Modern Businesses | VideFace"
                description="VideFace is a virtual assistance platform that helps businesses reduce operational costs, deliver 24/7 human support through digital and self-service solutions."
                canonical="https://videface.com/"
            />
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
                {/* <Announcement /> */}
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
