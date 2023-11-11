import logo from "../images/logo.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="footer bg-blue-dark pt-5 pb-2">
			<div className="container text-center">
				<img src={logo} alt="logo" width="110" />
				<p className="text-uppercase color-pink-light">
					Bana Care <br />
					The Magic Of Selfcare
				</p>

				<p className="fs-5">FOLLOW US</p>
				<p className="d-flex justify-content-center align-items-center">
					<span className="socials-border border-circle d-flex justify-content-center align-items-center me-1">
						<FaFacebookF />
					</span>

					<span className="socials-border border-circle d-flex justify-content-center align-items-center ms-1">
						<FaInstagram />
					</span>
				</p>
				<p className="fw-light copyright">
					© 2022 Bana care. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
