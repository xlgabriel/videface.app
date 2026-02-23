import Header from "../../Header";
import Seo from "../../Seo";
import Questions from "../../Questions";
import Contact from "../../Contact";
import Hero from "../sections/hero/Hero";
import Solutions from "../sections/solutions/Solutions";
import { kioskOG } from "../../../assets";
import { kioskFaqItems } from "../../../constants/faqs";
import ImageSmartBG from "../../../assets/hero/imageSmartBG.webp";
import ImageSmartUSER from "../../../assets/hero/imageSmartUSER.webp";
import VideFaceKeydrop from "../../../assets/webp/VideFace-Keydrop.webp";
import VideFaceKiosk from "../../../assets/webp/VideFace-Kiosk.webp";
import AllInOne from "../../../assets/webp/All-in-one-edit.webp";
import AgentInteraction from "../../../assets/webp/Agent-Interaction.webp";
import AutomatedKeyManagement from "../../../assets/webp/Automated-Key-Management.webp";
import FasterPickUps from "../../../assets/webp/Faster-Pick-Ups.webp";
import TouchscreenInterface from "../../../assets/webp/Touchscreen-Interface.webp";
import Services from "../sections/services/Services";
import Industries from "../sections/industries/Industries";

export default function VidefaceSmartLocker() {
    const solutionItems = [
        {
            title: "KeyDrop",
            image: VideFaceKeydrop,
            alt: "VideFace KeyDrop kiosk",
            imageClassName: "solution-card__img--keydrop",
        },
        {
            title: "Self-Service Kiosk",
            image: VideFaceKiosk,
            alt: "VideFace Self-Service Kiosk",
            imageClassName: "solution-card__img--kiosk",
            imgOffsetX: 25, // Example of custom offset for this image
        },
        {
            title: "All in One",
            image: AllInOne,
            alt: "VideFace all-in-one kiosk",
            imageClassName: "solution-card__img--allinone",
        },
    ];

    const serviceItems = [
        {
            title: "Touchscreen Interface",
            image: TouchscreenInterface,
            alt: "Touchscreen interface",
            description: "Intuitive and easy-to-use control.",
        },
        {
            title: "Agent Interaction",
            image: AgentInteraction,
            alt: "Agent interaction",
            description: "Live remote assistance anytime.",
        },
        {
            title: "Automated Key Management",
            image: AutomatedKeyManagement,
            alt: "Automated key management",
            description: "Secure and automated key control.",
        },
        {
            title: "Faster, Smarter Pick-Ups",
            image: FasterPickUps,
            alt: "Faster pickups",
            description: "Reduce wait times instantly.",
        },
    ];

    return (
        <>
            <Seo title="VideFace Smart Locker | Secure Key Management & Automated Locker System"
                description="Improve operations with a rental locker that automates key dispensing, boosts key tracking, and enhances security through a smart, digital locker system."
                canonical="https://videface.com/kiosk"
                image={kioskOG} />

            <Header />
            <Hero
                id="smart-hero"
                title="Smart Locker"
                subtitlePrefix="That Transforms"
                subtitleHighlight="Key Management and Rentals"
                bgImage={ImageSmartBG}
                bgAlt="Smart Locker background"
                userImage={ImageSmartUSER}
                userAlt="Smart Locker user"
                bgImageClassName="block w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] hero-bg-enter object-cover"
                userImageClassName="hero-user-enter w-[220px] h-[220px] md:w-[280px] md:h-[280px] lg:w-[450px] lg:h-[450px] object-cover rounded-[28px]"
            />

            <Services
                title={(
                    <>
                        Key Benefits of VideFace <br />
                        <span className="font-bold">Smart Locker</span>
                    </>
                )}
                items={serviceItems}
            />

            <Industries
                headingTop={"A Smart Locker Solution that adapts to"}
                headingHighlight={"Any Industry"}
                className="mt-28 mb-28"
            />

            <Solutions
                items={solutionItems}
                title={(
                    <>
                        Combine Your <span className="font-bold">Smart Locker</span> with More <br />Virtual Assistance <span className="font-bold">Solutions</span>
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