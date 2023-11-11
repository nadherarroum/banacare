import { Alert } from 'react-bootstrap';

const Message = ({ variant = '', message }) => {
  return (
    <div className="text-center my-5">
      <Alert variant={variant} className="text-start w-50">
        {message}
      </Alert>
    </div>
  );
};

export default Message;
