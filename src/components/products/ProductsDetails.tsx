import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import LinearProgress from "./LinearProgress";
import PrimaryButton from "./PrimaryButton";
import QuantityButtons from "./QuantityButtons";
import { addToCart } from "../../features/cartSlice";
import { addProduct } from "../../features/productsSlice";

const ProductDetails = () => {
  const { id } = useParams();

  const product = useAppSelector((state) =>
    state.products.products.find((element) => element.id === Number(id))
  );
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((state: number) => state + 1);
  const handleDecrement = () =>
    setQuantity((state: number) => (state > 1 ? state - 1 : state));

  const handleAddToCart = () => {
    if (product === undefined) return;
    dispatch(addToCart({ ...product, quantity: quantity }));
  };

  useEffect(() => {
    if (product === undefined) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(addProduct(res));
          setActiveImage(res.images[0]);
        });
    } else {
      console.log(product);
      setActiveImage(product.images[0]);
    }
  }, [dispatch]);

  return (
    <div>
      {product === undefined ? (
        <div className="row">
          <LinearProgress />
        </div>
      ) : (
        <div className="card m-5 p-3 myShadow">
          <div className="showImg">
            <img src={activeImage} alt="" className="img-fluid img-thumbnail" />
            <div className="slide-img d-flex align-items-center justify-content-center w-100 mt-3">
              {product.images &&
                product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="h-25"
                    onClick={() => setActiveImage(image)}
                  />
                ))}
            </div>
          </div>
          <div className="flex-1 p-2">
            <div className="mb-2">
              <h2 className="card-title text-danger mt-3">{product.title}</h2>
              <div className="my-4">
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-4">
                  ${product.price.toFixed(2)}
                </span>
                <span className="card-title mt-3 fs-20">
                  -{product.discountPercentage}%
                </span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <div className="my-2">
              <p className="card-title mt-3 fs-20">{product.description}</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <QuantityButtons
                quantity={quantity}
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
              />
              <PrimaryButton onClick={handleAddToCart}>
                Add to cart
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default ProductDetails;