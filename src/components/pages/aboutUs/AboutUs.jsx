import Header from "../../Header";
import Seo from "../../Seo";
import Hero from "../sections/hero/Hero";
import Contact from "../../Contact";
import Footer from "../../Footer";
import AboutUsHighlight from "./Components/AboutUsHighlight.jsx";
import GlobalMap from "./Components/Map.jsx";

import { kioskOG } from "../../../assets";
import AllBG from "../../../assets/hero/AllBG.webp";
import AllUser from "../../../assets/hero/AllUser.webp";

export default function AboutUs() {
    return (
        <>
            <Seo
                title="About Us | VideFace"
                description="Over 10 years dedicated to developing state-of-the-art software."
                canonical="https://videface.com/about-us"
                image={kioskOG}
            />

            <Header />

            <Hero
                id="about-us-hero"
                title="About Us"
                subtitlePrefix="Over 10 years dedicated to"
                subtitleHighlight="developing state-of-the-art software"
                bgImage={AllBG}
                bgAlt="About Us background"
                userImage={AllUser}
                userAlt="VideFace Team"
                bgImageClassName="block w-[400px] h-[400px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] hero-bg-enter object-cover"
                userImageClassName="hero-user-enter w-[400px] h-[400px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] object-cover rounded-[28px]"
                userPositionClass="left-22 md:left-16 sm:left-30 lg:left-0"
                buttonText="GET A DEMO"
                buttonHref="#contact"
            />
            
            <AboutUsHighlight />

            <GlobalMap />

            <div id="contact">
                <Contact />
            </div>

        </>
    );
}
