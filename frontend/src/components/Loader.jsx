import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="text-center my-5">
      <Spinner
        animation="border"
        role="status"
        style={{ width: '80px', height: '80px' }}
      ></Spinner>
    </div>
  );
};

export default Loader;
