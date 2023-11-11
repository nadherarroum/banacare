import logo from '../images/bana-care-logo.svg';
import mask from '../images/mask.png';
import products from '../images/about.png';
import app from '../images/app-interfaces.png';

import google from '../images/google.png';
import ios from '../images/ios.svg';

const apps = [google, ios];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="subpage-hero about">
        <div className="container py-5">
          <div>
            <h1>ABOUT US</h1>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className=" section-y-padding">
        <div className="container text-center">
          <img
            src={logo}
            className="img-fluid px-2"
            alt="Bana Care Logo"
            width="150"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          />
          <div className="mt-3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              facilisis ante eu augue molestie sagittis. Pellentesque congue,
              arcu ac blandit facilisis, magna risus bibendum felis, non laoreet
              dolor tellus id ante. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ut vivers auctor, quis efficitur arcu dictum.
              Curabitur
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section>
        <div className="row">
          <div className="col mission-box">
            <div className="container p-5">
              <h2 className="color-brown mb-3">Our Mission</h2>
              <p className="color-gray-font">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas facilisis ante eu augue molestie sagittis. Pellentesque
                congue, arcu ac blandit facilisis, magna risus bibendum felis,
                non laoreet dolor tellus id ante. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Ut vivers auctor, quis efficitur
                arcu dictum. Curabitur{' '}
              </p>
            </div>
          </div>
          <div className="col vision-box">
            <div className="container p-5">
              <h2 className="color-dark-blue mb-3">Our Vision</h2>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas facilisis ante eu augue molestie sagittis. Pellentesque
                congue, arcu ac blandit facilisis, magna risus bibendum felis,
                non laoreet dolor tellus id ante. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Ut vivers auctor, quis efficitur
                arcu dictum. Curabitur{' '}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First feature section */}
      <section className="section-y-padding">
        <div className="row align-items-center px-5">
          <div className="col-5">
            <h2 className="mb-3">Glow up your skin</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              facilisis ante eu augue molestie sagittis. Pellentesque congue,
              arcu ac blandit facilisis,
            </p>
          </div>
          <div className="col-7 d-flex justify-content-center">
            <img
              src={mask}
              className="img-fluid "
              alt="Mask Skin Care"
              // width="150"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
          </div>
        </div>
      </section>

      {/* Second feature section */}
      <section className="section-y-padding">
        <div className="row align-items-center px-5">
          <div className="col-7">
            <img
              src={products}
              className="img-fluid "
              alt="Bana Care Products"
              // width="150"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
          </div>

          <div className="col-5">
            <h2 className="mb-3">All Natural</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              facilisis ante eu augue molestie sagittis. Pellentesque congue,
              arcu ac blandit facilisis,
            </p>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="section-y-padding bg-gray-light section-quote">
        <div className="row align-items-center px-5">
          <div className="col-6">
            <p className="justify-text fs-5 lh-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              sagittis eget sapien in congue. Nullam vitae posuere diam, vel
              suscipit lorem. Maecenas magna augue, pulvinar vel ligula nec,
              gravida tempor
            </p>
          </div>

          <div className="col-6 d-flex justify-content-center">
            <div className="about-director rounded-circle"></div>
          </div>
        </div>
      </section>

      {/* App section */}
      <section className="section-y-padding">
        <div className="row align-items-center px-5">
          <div className="col-7 d-flex justify-content-center">
            <img
              src={app}
              className="img-fluid px-2"
              alt="Mobile App Bana Care"
              // width="150"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
          </div>

          <div className="col-5">
            <h2 className="color-blue-dark fw-bold mb-1 text-center">
              Download Bana Care Mobile App
            </h2>
            <div className="d-flex justify-content-center pt-3">
              {apps.map((apps) => (
                <img
                  key={apps}
                  src={apps}
                  className="img-fluid px-2"
                  alt={apps}
                  width="200"
                  // height="240"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
