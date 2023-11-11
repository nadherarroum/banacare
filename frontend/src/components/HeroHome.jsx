import hero from '../images/hero.png';
import { Link } from 'react-router-dom';

const HeroHome = () => {
  return (
    <section className="home-hero">
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-4">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={hero}
              className="d-block mx-lg-auto img-fluid"
              alt="hero"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold lh-sm mb-3 color-blue-dark">
              Love Your Skin Naturally
            </h1>
            <p className="lead fs-5 mb-4">
              Made using clean,non-toxic ingredients, our products are designed
              for everyone
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-lg px-4 me-md-2 rounded-4 text-uppercase btn-blue-dark"
              >
                <Link to="shop">Shop Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
