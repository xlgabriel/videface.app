import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

export default function Card({ product }) {
    return (
        <div
            key={product.id}
            className="card w-full h-full px-5 py-10 bg-n-8 border border-n-6 rounded-xl flex flex-col justify-center items-center min-h-[35rem] max-h-[50rem] md:max-h-[35rem] lg:max-h-[45rem] xl:max-h-[35rem]"
        >
            <div className="flex justify-center items-center" style={{ minHeight: "40%" }}>
                <img
                    src={product.photo}
                    alt="product"
                    className="rounded-lg max-w-full max-h-full"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
            </div>
            <div className="flex flex-col text-center items-center mt-4" style={{ minHeight: "35%" }}>
                <h2 className="text-color-2 font-bold text-lg mb-2 mt-4">{product.title}</h2>
                <p>{product.description}</p>
                {product.price && (
                    <div style={{ minHeight: "5%" }}>
                        <p className="text-color-2 font-bold mt-4">{product.price}</p>
                    </div>
                )}
            </div>

            <div style={{ minHeight: "25%" }} className="w-full">
                <Button className="w-full mt-14 z-10 rounded-lg " onClick={() => window.open(product.url)}>
                    BUY
                </Button>
            </div>
        </div>
    );
}

Card.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string,
    }).isRequired,
};
