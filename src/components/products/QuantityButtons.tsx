import React, { MouseEventHandler, useState } from "react";

interface QuantityButtonsProps {
    quantity: number;
    onDecrement: MouseEventHandler<Element>;
    onIncrement: MouseEventHandler<Element>;
}

const QuantityButtons = ({
    quantity,
    onDecrement,
    onIncrement,
}: QuantityButtonsProps): JSX.Element => {
    return (
        <div className=" ">
            <button className="btn btn-outline-dark" onClick={onDecrement}>
                -
            </button>
            <span className="btn btn-outline-secondary">{quantity}</span>
            <button className="btn btn-outline-dark" onClick={onIncrement}>
                +
            </button>
        </div>
    );
};

export default QuantityButtons;