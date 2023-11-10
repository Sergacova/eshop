
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="text-center text-lg-start text-muted mt-3">
            <div className="container py-4 text-center">
                <div className="">
                    <Link to="/" className="text-center text-muted">Privacy policy</Link>
                    <div className="vert-line"></div>
                    <Link to="/" className="text-center text-muted">Term of service</Link>
                </div>
                <span className="text-center text-muted">
                    &copy: 2023 shop. All Rights Reserved.
                </span>


            </div>

        </footer >
    );
}

export default Footer;