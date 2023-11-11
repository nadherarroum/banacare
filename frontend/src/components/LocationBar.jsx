import { FaHome } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LocationBar = ({ pathName }) => {
  const location = useLocation();
  const currentLocation =
    location.pathname.split('/')[1].charAt(0).toUpperCase() +
    location.pathname.split('/')[1].slice(1);

  return (
    <>
      {currentLocation.length > 0 && (
        <div className="bg-gray-light text-center py-2">
          <FaHome className="mb-1" /> <Link to="/">Home</Link>
          <span>
            <Link
              to={currentLocation ? `${currentLocation.toLowerCase()}` : null}
            >
              {currentLocation ? ` → ${currentLocation}` : null}
            </Link>
          </span>
        </div>
      )}
    </>
  );
};

export default LocationBar;
