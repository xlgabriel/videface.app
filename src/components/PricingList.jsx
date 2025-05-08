import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {pricing.map((item) => (
                <div
                    key={item.id}
                    className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&:nth-child(2)>h4]:text-color-5
                    [&:nth-child(3)>h4]:text-color-3 [&>h4]:last:text-color-1"
                >
                    <h4 className="h4 mb-4">{item.title}</h4>

                    <p className="text-sm text-n-1 mb-6">{item.description}</p>

                    {/* //* ------------------  Comentado el precio por ahora  ----------------*/}

                    {/* <div className="flex items-center h-[1.5rem] mb-8">
                        {item.price1 && (
                            <>
                                <div className="text-[1.8rem] leading-none font-bold">
                                    {item.price1}
                                </div>
                            </>
                        )}
                    </div> */}

                    {/* <div className="flex items-center h-[1.5rem] mb-8">
                        {item.price2 && (
                            <>
                                <div className="text-[1.8rem] leading-none font-bold">
                                    {item.price2}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex items-center h-[1.5rem] mb-2">
                        {item.price3 && (
                            <>
                                <div className="text-[1.8rem] leading-none font-bold">
                                    {item.price3}
                                </div>
                            </>
                        )}
                    </div> */}

                    {/* //*-----------------  Fin del comentario ------------------------*/}

                    <Button
                        className="w-full mb-6 mt-8"
                        href={item.price ? "/pricing" : "#contact"}
                        white={!!item.price}
                    >
                        {item.price ? "Get started" : "Contact us"}
                    </Button>

                    <ul>
                        {item.features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start py-5 border-t border-n-6"
                            >
                                <img
                                    src={check}
                                    width={24}
                                    height={24}
                                    alt="Check"
                                />
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
