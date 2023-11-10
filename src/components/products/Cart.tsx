import React, { FormEvent, FormEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart, deleteFromCart, setDiscount, CardProductState } from "../../features/cartSlice";
import PrimaryButton from "./PrimaryButton";
import QuantityButtons from "./QuantityButtons";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { formatCurrency } from "../../context/utilies/formatCurrency";

const Cart = () => {
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const handleDeleteProduct = (product: CardProductState) => {
        dispatch(deleteFromCart(product));
    };

    const handleIncrement = (product: CardProductState) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const handleDecrement = (product: CardProductState) => {
        dispatch(deleteFromCart({ ...product, quantity: 1 }));
    };

    const handleSubmitDiscountForm = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            code: { value: string };
        };
        dispatch(setDiscount(target.code.value));
    };

    return (
        <div>
            <div className="container py-5 h-100">
                {cart.totalQuantity > 0 ? (
                    <div className="d-flex bg-secondary justify-content-between align-items-center mb-5 fw-bold mb-0 text-black p-5">
                        <div className="flex-[2]">Product Details</div>
                        <div className="flex-[2]">Price</div>
                        <div className="flex-[2]">Quantity</div>
                        <div className="flex-[2]">Total Price</div>
                    </div>
                ) : (
                    <div className="d-flex bg-warning justify-content-between align-items-center mb-5 fw-bold mb-0 text-black p-5">
                        The Cart is Empty
                    </div>
                )}
                {cart.products &&
                    cart.products.map((product) => (
                        <div
                            className="flex flex-col d-flex justify-content-between align-items-center mb-5 fw-bold mb-0 text-black p-5"
                            key={product.id}
                        >
                            <div className="flex-2 flex items-center gap-4">
                                <img
                                    src={product.thumbnail}
                                    alt=""
                                    className="col-md-2 col-lg-2 col-xl-2"
                                />
                                <h3 className="col-md-3 col-lg-3 col-xl-3 text-black mb-0">{product.title}</h3>
                            </div>
                            <div className="flex-[2] flex items-center gap-4">
                                <span className="mb-0">${product.price.toFixed(2)}</span>
                                {cart.hasDiscount && (
                                    <span className="fw-bold mb-0 me-5 pe-3">
                                        -{product.discountPercentage}%
                                    </span>
                                )}
                            </div>
                            <div className="flex-2 flex items-center gap-4">
                                <QuantityButtons
                                    quantity={product.quantity}
                                    onDecrement={() => handleDecrement(product)}
                                    onIncrement={() => handleIncrement(product)}
                                />
                            </div>
                            <div className="flex-2 flex items-center gap-4">
                                <span className={cart.hasDiscount ? "line-through" : ""}>
                                    ${(product.price * product.quantity).toFixed(2)}
                                </span>
                                {cart.hasDiscount && (
                                    <span className="text-red-500">
                                        $
                                        {(
                                            (product.price *
                                                product.quantity *
                                                (100 - product.discountPercentage)) /
                                            100
                                        ).toFixed(2)}
                                    </span>
                                )}
                                <button onClick={() => handleDeleteProduct(product)}>
                                    <i className="fas fa-times"></i>
                                    <DeleteOutlinedIcon />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div >
            {
                cart.totalQuantity > 0 && (

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h4>Have a Promotion Code?</h4>
                                <form className="flex" onSubmit={handleSubmitDiscountForm}>
                                    <input
                                        type="text"
                                        name="code"
                                        placeholder="Enter Code and hit Submit"
                                        className="border border-gray-300 placeholder:text-gray-500 px-4 py-2 w-full"
                                    />
                                    <PrimaryButton>Submit</PrimaryButton>
                                </form>
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex-1 flex flex-col gap-4">
                                <h3 className="text-lg font-bold">Order Summary</h3>
                                <div className="h-px w-1/3 bg-gray-300"></div>
                                <div className="flex justify-between">
                                    <span>Sub-total</span>
                                    {!cart.hasDiscount ? (
                                        <span>${cart.totalPrice.toFixed(2)}</span>
                                    ) : (
                                        <span className="text-red-500">
                                            ${cart.totalDiscountPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>$50.00</span>
                                </div>
                                <div className="h-px w-full bg-gray-300"></div>
                                <div className="flex justify-between font-bold">
                                    <span>Total Cost</span>
                                    {!cart.hasDiscount ? (
                                        <span>${(cart.totalPrice + 50).toFixed(2)}</span>
                                    ) : (
                                        <span className="text-red-500">
                                            ${(cart.totalDiscountPrice + 50).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <PrimaryButton>Continue to Checkout</PrimaryButton>
                            </div>
                        </div>
                    </div>
                
                  </div>


    )
};


export default Cart;