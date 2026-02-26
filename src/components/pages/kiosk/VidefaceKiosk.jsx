import Header from "../../Header";
import Questions from "../../Questions";
import { kioskFaqItems } from "../../../constants/faqs";
import Contact from "../../Contact";
import Seo from "../../Seo";
import Hero from "../sections/hero/Hero";
import Solutions from "../sections/solutions/Solutions";
import Services from "../sections/services/Services";
import Metrics from "../sections/metrics/Metrics";
import Industries from "../sections/industries/Industries";
import { kioskOG } from "../../../assets";
import ImageKioskBG from "../../../assets/hero/kioskbg.webp";
import ImageKioskUSER from "../../../assets/hero/kioskuser.webp";
import VideFaceKeydrop from "../../../assets/webp/VideFace-Keydrop.webp";
import VideFaceSmartLocker from "../../../assets/webp/VideFace-Smart-Locker.webp";
import AllInOne from "../../../assets/webp/All-in-one-edit.webp";
import ReallTimeTranslation from "../../../assets/webp/Reall-time-translation.webp";
import DocumentCameraScanner from "../../../assets/webp/Document-camera-scanner.webp";
import AllInteractionsRecorded from "../../../assets/webp/All-interactions-recorded.webp";
import CallEmotionDetection from "../../../assets/webp/Call-Emotion-Dectection.webp";

export default function VidefaceKiosk() {
    const serviceItems = [
        {
            title: "Call emotion\ndetector",
            image: CallEmotionDetection,
            alt: "Call emotion detector",
            description: "Real-time sentiment analysis.",
        },
        {
            title: "Real time translation\nto any language",
            image: ReallTimeTranslation,
            alt: "Real time translation support",
            description: "Instant multilingual communication.",
        },
        {
            title: "Document\ncamera/scanner",
            image: DocumentCameraScanner,
            alt: "Document camera and scanner",
            description: "Fast and secure ID scanning.",
        },
        {
            title: "All interactions\nrecorded",
            image: AllInteractionsRecorded,
            alt: "All interactions recorded",
            description: "Complete interaction traceability.",
        },
    ];

    const solutionItems = [
        {
            title: "KeyDrop",
            image: VideFaceKeydrop,
            alt: "VideFace KeyDrop kiosk",
            imageClassName: "solution-card__img--keydrop",
        },
        {
            title: "Smart Locker",
            image: VideFaceSmartLocker,
            alt: "VideFace Smart Locker key management",
            imageClassName: "solution-card__img--locker",
        },
        {
            title: "All in One",
            image: AllInOne,
            alt: "VideFace all-in-one kiosk",
            imageClassName: "solution-card__img--allinone",
        },
    ];

    return (
        <>
            <Seo title="VideFace Kiosk | Advanced Self-Service Kiosk Solution"
                description="Upgrade your business with a smart self-service kiosk that reduces costs, improves efficiency, and enhances customer experience through virtual assistance."
                canonical="https://videface.com/kiosk"
                image={kioskOG} />
            <Header />
            <Hero
                id="kiosk-hero"
                title="Smart Self-Service Kiosk"
                subtitlePrefix="Built to Transform"
                subtitleHighlight="Customer Operations"
                bgImage={ImageKioskBG}
                bgAlt="Kiosk background"
                userImage={ImageKioskUSER}
                userAlt="Kiosk user"
            />
            <Services
                title={(
                    <>
                        What Makes the VideFace <br />
                        <span className="font-bold">Self-Service Kiosk</span> Stand Out
                    </>
                )}
                items={serviceItems}
            />
            <Metrics />
            <Industries
                headingTop={"A Smart Kiosk Solution that adapts to"}
                headingHighlight={"Any Industry"}
                className="mt-28 mb-28"
            />

            <Solutions
                items={solutionItems}
                title={(
                    <>
                        Combine Your <span className="font-bold">Kiosk</span> with More Virtual <br />
                        Assistance <span className="font-bold">Solutions</span>
                    </>
                )}
            />
            <Questions items={kioskFaqItems} headingTop="You have questions?" headingEmphasis="We have answers" id="kiosk-questions" />
            <div id="contact">
                <Contact />
            </div>
        </>
    );
}