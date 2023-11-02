import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProduct} from "../../features/productsSlice";

const ProductDetails = () => {
  const { id } = useParams();

  const product = useAppSelector((state) =>
    state.products.products.find((element) => element.id === Number(id))
  );
 
  const dispatch = useAppDispatch();

  const [activeImage, setActiveImage] = useState<string>("");


 


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
  }, [dispatch, id, product]);

  return (
    <div>
      {product === undefined ? (
        <div className="card mt-3 mb-3 pb-3 myShadow">
 
        </div>
      ) : (
        <div className="container d-flex-column">
           <div className="small-font-size">
            <img src={activeImage} alt="" className="card mt-3 mb-3 pb-3 myShadow overlay" />
            <div className=" ">
              {product.images &&
                product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="small-font-size overlay"
                    onClick={() => setActiveImage(image)}
                  />
                ))}
            </div>
          </div>
          <div className="card-body">
            <div className="card-title">
              <h2 className="my-2">{product.title}</h2>
              <div className="my-4">
           
              </div>
              <div className="card-body">
                <span className="card-text m-3 text-danger fs-20">
                  ${product.price.toFixed(2)}
                </span>
                <span className="card-text m-3 text -dark fs-20">
                  -{product.discountPercentage}%
                </span>
              </div>
            </div>
            <div className="card-body"></div>
            <div className="my-2">
              <p className="text -dark">{product.description}</p>
            </div>
            <div className="card-title">
        
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;