import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProductCart from "../../features/productCart";
import { setProducts } from "../../features/productsSlice";
import LinearProgress from "./LinearProgress";
import Pagination from "../../pages/Pagination";

const Products = (): JSX.Element => {
  const { products, total } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const skip = (currentPage - 1) * 24;

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=30&skip=${skip}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setProducts(res));
        setLoaded(true);
      });
  }, [currentPage, dispatch, skip]);
  return (
    <div className="card-img d-flex justify-content-center align-items-center overflow-hidden">

      <div className="card mt-3 mb-3 pb-3 myShadow">


        {products === undefined || products.length === 0 ? (
          <div className="d-flex align-items-center">
            {!loaded ? (
              <LinearProgress />
            ) : (
              <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">

              {products.map(({ id, title, thumbnail, price }) => (
                <Link to={`/products/${id}`} key={id}>
                  <ProductCart
                    title={title}
                    thumbnail={thumbnail}
                    price={price}
                  />
                </Link>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalCount={total}
              pageSize={24}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;