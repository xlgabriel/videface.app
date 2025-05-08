import ButtonGradient from "../../assets/svg/ButtonGradient";
import Contact from "../Contact";
import Footer from "../Footer";
import Header from "../Header";
import Pricing from "../Pricing";
import PricingContainer from "../pricing/PricingContainer";

export default function PricingPage() {
    return (
        <>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] ">
                <Header />
                <Pricing />
                <PricingContainer />
                <div id="contact">
                    <Contact />
                </div>
                <Footer />
            </div>

            <ButtonGradient />
        </>
    );
}
