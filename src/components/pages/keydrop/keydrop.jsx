import Header from "../../Header";
import Seo from "../../Seo";
import Questions from "../../Questions";
import Contact from "../../Contact";
import Hero from "../sections/hero/Hero";
import Solutions from "../sections/solutions/Solutions";
import { kioskOG } from "../../../assets";
import { kioskFaqItems, keydropFaqItems } from "../../../constants/faqs";
import ImageSmartBG from "../../../assets/hero/imageSmartBG.webp";
import ImageSmartUSER from "../../../assets/hero/imageSmartUSER.webp";
import VideFaceSmartLocker from "../../../assets/webp/VideFace-Smart-Locker.webp";
import VideFaceKiosk from "../../../assets/webp/VideFace-Kiosk.webp";
import AllInOne from "../../../assets/webp/All-in-one-edit.webp";
import SecureKeyBox from "../../../assets/webp/Secure-Key-Box.webp";
import VirtualAgentSupport from "../../../assets/webp/Virtual-Agent-Support.webp";
import AutomatedGateControl from "../../../assets/webp/Automated-gate-control.webp";
import ReduceStaffingCosts from "../../../assets/webp/Reduce-Staffing-Costs.webp";
import Services from "../sections/services/Services";
import Industries from "../sections/industries/Industries";

export default function Keydrop() {
    const solutionItems = [
        {
            title: "Smart Locker",
            image: VideFaceSmartLocker,
            alt: "VideFace Smart Locker key management",
            imageClassName: "solution-card__img--locker",
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
            title: "Secure Key Box",
            image: SecureKeyBox,
            alt: "Secure key box",
            description: "Tamper-proof key storage.",
        },
        {
            title: "Virtual Agent Support",
            image: VirtualAgentSupport,
            alt: "Virtual agent support",
            description: "Seamless entry and exit without delays",
        },
        {
            title: "Automated Gate Control",
            image: AutomatedGateControl,
            alt: "Automated gate control",
            description: "Fewer onsite staff; more efficient operations",
        },
        {
            title: "Reduce Staffing Costs",
            image: ReduceStaffingCosts,
            alt: "Reduce staffing costs",
            description: "24/7 live assistance — no need for on-site staff",
        },
    ];

    return (
        <>
            <Seo title="Secure Key Drop System | VideFace"
                description="Automate your key drop process with secure key management technology, and protects your rental operation."
                canonical="https://videface.com/kiosk"
                image={kioskOG} />

            <Header />
            <Hero
                id="keydrop-hero"
                title="Key Drop"
                subtitlePrefix="Designed to reduce risk, prevent disputes, and"
                subtitleHighlight="Streamline rental operations"
                bgImage={ImageSmartBG}
                bgAlt="KeyDrop background"
                userImage={ImageSmartUSER}
                userAlt="KeyDrop user"
                bgImageClassName="block w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] hero-bg-enter object-cover"
                userImageClassName="hero-user-enter w-[220px] h-[220px] md:w-[280px] md:h-[280px] lg:w-[450px] lg:h-[450px] object-cover rounded-[28px]"
            />

            <Services
                title={(
                    <>
                        <span className="font-bold">Smart KeyDrop </span>System for <br />
                        <span className="font-bold">Smart Locker</span>
                    </>
                )}
                items={serviceItems}
            />

            <Industries
                headingTop={"A KeyDrop Solution that adapts to"}
                headingHighlight={"Any Industry"}
                className="mt-28 mb-28"
            />

            <Solutions
                items={solutionItems}
                title={(
                    <>
                        Combine Your <span className="font-bold">Smart KeyDrop</span> with More <br />
                        Virtual Assistance <span className="font-bold">Solutions</span>
                    </>
                )}
            />

            <Questions items={keydropFaqItems} headingTop="You have questions?" headingEmphasis="We have answers" id="kiosk-questions" />
            
            
            <div id="contact">
                <Contact />
            </div>
        </>
    );
}
