import Header from "../../Header";
import KioskHero from "./sections/KioskHero";
import KioskServices from "./sections/KioskServices";
import KioskSolutions from "./sections/KioskSolutions";
import Questions from "../../Questions";
import Contact from "../../Contact";
import Seo from "../../Seo";
import { kioskOG } from "../../../assets";

export default function VidefaceKiosk() {
    return (
        <>
            <Seo title="VideFace Kiosk | Advanced Self-Service Kiosk Solution"
                description="Upgrade your business with a smart self-service kiosk that reduces costs, improves efficiency, and enhances customer experience through virtual assistance."
                canonical="https://videface.com/kiosk"
                image={kioskOG} />
            <Header />
            <KioskHero />
            <KioskServices />
            <KioskSolutions />
            <Questions />
            <div id="contact">
                <Contact />
            </div>
        </>
    );
}