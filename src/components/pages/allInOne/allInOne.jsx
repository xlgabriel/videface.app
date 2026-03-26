import Header from "../../Header";
import Seo from "../../Seo";
import Questions from "../../Questions";
import Contact from "../../Contact";
import Hero from "../sections/hero/Hero";
import Solutions from "../sections/solutions/Solutions";
import { kioskOG } from "../../../assets";
import { keydropFaqItems } from "../../../constants/faqs";
import AllBG from "../../../assets/hero/AllBG.webp";
import AllUser from "../../../assets/hero/AllUser.webp";
import AllInOne2 from "../../../assets/webp/All-in-one-2.webp";
import AllInOne3 from "../../../assets/webp/All-in-one-3.webp";
import AllInOneImg from "../../../assets/webp/All-in-one-edit.webp";
import FullyDigital from "../../../assets/webp/fully-digital.webp";
import IntegratedKey from "../../../assets/webp/Integrated-Key.webp";
import LiveRemoteAgentsAll from "../../../assets/webp/live-remote-agents-all.webp";
import SecureRecorded from "../../../assets/webp/Secure-recorded.webp";
import Services from "../sections/services/Services";
import Industries from "../sections/industries/Industries";
import IndustryStats from "./components/IndustryStats";
import AllInOneHighlight from "./components/AllInOneHighlight";

export default function AllInOne() {
    const solutionItems = [
        {
            title: "",
            image: AllInOne2,
            alt: "VideFace all-in-one kiosk 2",
            imageClassName: "solution-card__img--locker",
        },
        {
            title: "",
            image: AllInOne3,
            alt: "VideFace all-in-one kiosk 3",
            imageClassName: "solution-card__img--kiosk",
        },
        {
            title: "",
            image: AllInOneImg,
            alt: "VideFace all-in-one kiosk",
            imageClassName: "solution-card__img--allinone",
        },
    ];

    const serviceItems = [
        {
            title: "Digital Confirmation",
            image: FullyDigital,
            alt: "Digital and traceable process",
            description: "Scan documents",
        },
        {
            title: "Operational Efficiency",
            image: IntegratedKey,
            alt: "Integrated key and access control",
            description: "Remote assistance reduces operational costs while maintaining human interactions",
        },
        {
            title: "Remote Assistance",
            image: LiveRemoteAgentsAll,
            alt: "24/7 remote agents",
            description: "A live agent provides personalized support",
        },
        {
            title: "Secure Access & Returns",
            image: SecureRecorded,
            alt: "Secure and recorded interactions",
            description: "Secure delivery and collect keys",
        },
    ];

    return (
        <>
            <Seo
                title="All-in-One Kiosk | VideFace"
                description="Unified solution for kiosks, lockers and virtual assistance."
                canonical="https://videface.com/all-in-one"
                image={kioskOG}
            />

            <Header />

            <Hero
                id="allinone-hero"
                title="All in One"
                subtitlePrefix="All-in-One Virtual Assitance"
                subtitleHighlight="for Smarter Opertaions"
                bgImage={AllBG}
                bgAlt="All in One background"
                userImage={AllUser}
                userAlt="All in One user"
                bgImageClassName="block w-[400px] h-[400px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] hero-bg-enter object-cover"
                userImageClassName="hero-user-enter w-[400px] h-[400px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] object-cover rounded-[28px]"
                userPositionClass="left-22 md:left-16 sm:left-30 lg:left-0"
            />

            <Services
                title={(
                    <>
                        <span className="">The Complete Virtual </span> <br />
                        <span className="font-bold">Assistance Solution</span>
                    </>
                )}
                items={serviceItems}
            />

            <Industries
                headingTop={"All In One Solution that adapts to"}
                headingHighlight={"Any Industry"}
                className="mt-28 mb-28"
            />

            <Solutions
                items={solutionItems}
                title={(
                    <>
                        Choose your <span className="font-bold">All-in-One </span> and Upgrade <br />
                        your <span className="font-bold">Remote customer Service</span> Today
                    </>
                )}
            />

            <div className="container flex flex-col items-center mt-28">
                <h2 className="text-center text-4xl md:text-6xl">
                    Transform your operations with intelligent {" "}
                    <span
                        className="pb-2 font-bold"
                        style={{
                            background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                            display: "inline-block",
                        }}
                    >
                        virtual assistance
                    </span>
                    .
                </h2>
            </div>

            <div className="mt-0">
                <IndustryStats />
            </div>

            <AllInOneHighlight />

            {/* <Questions items={keydropFaqItems} headingTop="You have questions?" headingEmphasis="We have answers" id="allinone-questions" /> */}

            <div id="contact">
                <Contact />
            </div>
        </>
    );
}
