import Header from "../../Header";
import Seo from "../../Seo";
import Questions from "../../Questions";
import Contact from "../../Contact";
import { kioskOG } from "../../../assets";
import { kioskFaqItems } from "../../../constants/faqs";

export default function VidefaceSmartLocker() {
    return (
        <>
            <Seo title="VideFace Kiosk | Advanced Self-Service Kiosk Solution"
                description="Upgrade your business with a smart self-service kiosk that reduces costs, improves efficiency, and enhances customer experience through virtual assistance."
                canonical="https://videface.com/kiosk"
                image={kioskOG} />
            <Header />
            
            <Questions items={kioskFaqItems} headingTop="You have questions?" headingEmphasis="We have answers" id="kiosk-questions" />
            <div id="contact">
                <Contact />
            </div>
        </>
    );
}