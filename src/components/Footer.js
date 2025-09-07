import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start bottom-0 w-100">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">E-Commerce Site</h5>
                        <p>Your one-stop shop for all your needs.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="#!" className="text-dark">About</a></li>
                            <li><a href="#!" className="text-dark">Help</a></li>
                            <li><a href="#!" className="text-dark">Terms</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contact</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!" className="text-dark">Email: info@ecommerce.com</a></li>
                            <li><a href="#!" className="text-dark">Phone: +1 234 567 890</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-3 bg-dark text-white">
                © 2023 E-Commerce Site
            </div>
        </footer>
    );
};

export default Footer;
