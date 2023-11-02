import React from "react";


interface CardProps {
  title: string;
  thumbnail: string;
  price: number;
 
}

const ProductCart = ({
  title,
  thumbnail,
  price,
}: CardProps): JSX.Element => {
  return (
    <div className="card mt-3 mb-3 pb-3 myShadow">
      <div className="position-relative">
        <img
          src={thumbnail}
          alt=""
          className="card-img d-flex justify-content-center align-items-center overflow-hidden"
        />
     <span className="absolute top-4 px-4 py-2 bg-sky-200 text-sky-800 font-bold">
          ${price.toFixed(2)}
        </span>
      </div>
      <div className="card-title">
        <h2 className="float-md-right ">{title}</h2>
        <div className="card-body">
        
        </div>
      </div>
    </div>
  );
};

export default ProductCart;