import Section from "./Section";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";

const Pricing = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });

    return (
        <Section className="overflow-hidden" id="pricing">
            <div className="container relative z-2">
                <Heading tag="Get started" title={`Pricing plans for ${month} ${currentDate.getFullYear()}`} />

                <div className="relative">
                    <PricingList />
                    <LeftLine />
                    <RightLine />
                </div>

                <div className="flex justify-center mt-10 pb-10">
                    <a className="text-s font-code font-bold tracking-wider uppercase border-b">
                        More features and plans will be available soon! This is just the beginning.
                    </a>
                </div>
            </div>
        </Section>
    );
};

export default Pricing;
