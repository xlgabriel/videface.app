import ButtonGradient from "../../assets/svg/ButtonGradient";
import Benefits from "../Benefits";
import Collaboration from "../Collaboration";
import Footer from "../Footer";
import Header from "../Header";
import Hero from "../Hero";
import Pricing from "../Pricing";
import Contact from "../Contact";
import Services from "../Services";
import PricingPlans from "../pricing/PricingPlans";

export default function Test() {
    return (
        <>
            <div className="pt-[4.75rem] lg:pt-[5.25rem]">
                <Header />
                <Hero />
                <Benefits />
                <Collaboration />
                <Services />
                <PricingPlans />
                <div id="contact">
                    <Contact />
                </div>
                <Footer />
            </div>

            <ButtonGradient />
        </>
    );
}
