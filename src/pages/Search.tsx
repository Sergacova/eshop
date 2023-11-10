import React, { EventHandler, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setProducts } from "../features/productsSlice";

const Search = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setState(event.target.value);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(`https://dummyjson.com/products/search?q=${state}`)
            .then((res) => res.json())
            .then((res) => dispatch(setProducts(res)));
    };

    return (
        <form
            className="flex align-center w-full border my-2"
            onSubmit={handleSubmit}
        >
            <input
                className="outline-none w-full md:w-64 p-2"
                type="text"
                value={state}
                onChange={handleChange}
                onFocus={() => navigate("/products")}
            />
            <button className="p-2 transition-transform hover:scale-110">
                <SearchIcon style={{ width: "20px", height: "20px" }} />
            </button>
        </form>
    );
};

export default Search;