import { addToCart } from '../features/cartSlice';
import { showHideNotification } from '../features/notificationSlice';
import { useDispatch } from 'react-redux';

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
    dispatch(showHideNotification(true));
  };

  return (
    <>
      <button
        onClick={addToCartHandler}
        className={
          product.countInStock === 0
            ? 'btn w-100 out-of-stock-color'
            : 'btn-blue-dark btn w-100 '
        }
        disabled={product.countInStock === 0}
      >
        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </>
  );
};

export default AddToCartButton;
