import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
    return (
        <div className="flex gap-[1rem] max-lg:flex-wrap justify-center">
            {pricing.map((item) => (
                <div
                    key={item.id}
                    className="w-[20rem] max-lg:w-full h-full px-8 bg-n-8 border border-n-6 rounded-[2rem] py-8" // Cambié lg:w-auto y los paddings
                >
                    <h4 className="h5 mb-4 text-color-1">{item.title}</h4>

                    <p className="body-3 min-h-[4rem] text-n-1">{item.description}</p>

                    <div className="flex items-center h-[1.5rem] mb-8">
                        {item.price1 && (
                            <>
                                <div className="text-[1.4rem] leading-none font-bold">{item.price1}</div>
                            </>
                        )}
                    </div>
                    <div className="flex items-center h-[1.5rem] mb-8">
                        {item.price2 && (
                            <>
                                <div className="text-[1.4rem] leading-none font-bold">{item.price2}</div>
                            </>
                        )}
                    </div>
                    <div className="flex items-center h-[1.5rem] mb-2">
                        {item.price3 && (
                            <>
                                <div className="text-[1.4rem] leading-none font-bold">{item.price3}</div>
                            </>
                        )}
                    </div>

                    <Button
                        className="w-full mb-6 mt-8"
                        href={item.price ? "/pricing" : "#contact"}
                        white={!!item.price}
                    >
                        {item.price ? "Get started" : "Contact us"}
                    </Button>

                    <ul>
                        {item.features.map((feature, index) => (
                            <li key={index} className="flex items-start py-5 border-t border-n-6">
                                <img src={check} width={24} height={24} alt="Check" />
                                <p className="body-2 ml-4">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PricingList;
