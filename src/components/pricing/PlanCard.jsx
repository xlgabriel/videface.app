import Button from "../Button";
import PropTypes from "prop-types";

export default function PlanCard({ item }) {
    return (
        <div
            key={item.id}
            className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto p-4 text-center [&>h4]:first:text-color-2 [&:nth-child(2)>h4]:text-color-3 [&:nth-child(3)>h4]:text-color-5 [&>h4]:last:text-color-1"
        >
            <h4 className="min-h-[3rem] lg:text-[1.3rem] leading-normal flex-1">
                {item.title}
            </h4>

            <p className="min-h-[5rem] sm:text-base md:text-md lg:text-md flex-1">
                {item.description}
            </p>

            <Button
                className="w-full mb-6"
                href={item.price ? "/pricing" : "#contact"}
                white={!!item.price}
            >
                {item.price ? "Get started" : "Contact us"}
            </Button>
        </div>
    );
}

PlanCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price1: PropTypes.string,
        price2: PropTypes.string,
        price3: PropTypes.string,
        price: PropTypes.bool,
    }).isRequired,
};
