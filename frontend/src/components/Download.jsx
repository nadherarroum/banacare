import google from '../images/google.png';
import ios from '../images/ios.svg';

const apps = [google, ios];

const Download = () => {
  return (
    <section className="download section-y-padding">
      <div className="container py-5 text-center">
        <h1 className="color-blue-dark fw-bold mb-5">
          Download Bana Care Mobile App
        </h1>
        <div className="d-flex justify-content-center pt-3">
          {apps.map((apps) => (
            <img
              key={apps}
              src={apps}
              className="img-fluid px-2"
              alt={apps}
              width="200"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Download;
