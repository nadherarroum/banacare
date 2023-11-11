import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { imageUrl } from '../baseAPI';

const ProductCard = ({ product }) => {
  const [showSecondImage, setShowSecondImage] = useState(false);
  const { id, name, imageOne, imageTwo, price } = product;

  const handleImageOver = () => {
    setShowSecondImage((prev) => !prev);
  };

  return (
    <div className="col px-4 zoom-on-hover ">
      <div className="card shadow-sm">
        <Link to={`/products/${id}`}>
          <img
            onMouseOver={() => {
              handleImageOver();
            }}
            onMouseLeave={() => {
              handleImageOver();
            }}
            src={`${imageUrl}${showSecondImage ? imageTwo : imageOne}`}
            alt={product.name}
            style={{
              width: '100%',
              height: '240px',
              objectFit: 'cover',
            }}
          />
        </Link>

        <div className="card-body text-center">
          <p className="card-text my-1">{name}</p>
          <p className="text-muted mt-1 mb-2">{price} TND</p>
          <AddToCartButton product={{ ...product, quantity: 1 }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
