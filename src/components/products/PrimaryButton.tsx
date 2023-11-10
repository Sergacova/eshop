import React, { PropsWithChildren } from "react";

const PrimaryButton = (props: PropsWithChildren<any>): JSX.Element => {
    return (
        <button
            className="btn btn-outline-primary"
            {...props}
        >
            {props.children}
        </button>
    );
};

export default PrimaryButton;