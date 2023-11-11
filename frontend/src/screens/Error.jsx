import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <p className="ps-5 pt-4">
        Page not found. Go back to{' '}
        <Link className="color-brown fw-bold" to="/">
          Home
        </Link>
        .
      </p>
    </div>
  );
};

export default Error;
