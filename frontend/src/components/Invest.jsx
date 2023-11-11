import { FaCircle } from "react-icons/fa";
import skincare from "../images/skincare.png";

const Invest = () => {
	return (
		<section className="container section-y-padding">
			<div className="row align-items-center">
				<div className="col-md-7">
					<div className="d-flex justify-content-between pb-5">
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
						<FaCircle className="dot" />
					</div>
					<h2 className="">
						“Invest in your skin. It is going to represent you for a very long
						time. “
					</h2>
				</div>
				<div className="col-md-5 text-end">
					<img
						src={skincare}
						className="img-fluid mx-auto"
						alt="skincare"
						width="320"
						height="302"
						preserveAspectRatio="xMidYMid slice"
						focusable="false"
					/>
					{/* <svg
						className="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
						width="200"
						height="200"
						role="img"
					>
						<rect width="100%" height="100%" fill="#eee" />
					</svg> */}
				</div>
			</div>
		</section>
	);
};

export default Invest;
