import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddToCartButton from '../components/AddToCartButton';
import ProductCard from '../components/ProductCard';
import { imageUrl } from '../baseAPI';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  fetchAsyncProductDetails,
  removeProductDetails,
} from '../features/productDetailsSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const ProductDetails = () => {
  // all products
  const products = useSelector((state) => state.products.value);
  const productsStatus = useSelector((state) => state.products.status);

  // single product
  const productDetails = useSelector((state) => state.productDetails.value);
  const productDetailsStatus = useSelector(
    (state) => state.productDetails.status
  );

  const [quantity, setQuantity] = useState(1);

  // fetch single product
  const dispatch = useDispatch();
  const { productId } = useParams(); // productId is a string since it is from the url

  useEffect(() => {
    dispatch(fetchAsyncProductDetails(productId));
    return () => {
      dispatch(removeProductDetails());
    };
  }, [dispatch, productId]);

  // when an image is clicked, it becomes the main image
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const categories = useSelector((state) => state.categories.value);
  const categoriesStatus = useSelector((state) => state.categories.status);

  const lightboxOptions = {
    settings: {
      disableKeyboardControls: true,
      disableWheelControls: true,
    },
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: true,
      showFullscreenButton: false,
      showThumbnailsButton: false,
      showNextButton: false,
      showPrevButton: false,
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

  const handleQuantityChange = (type) => {
    switch (type) {
      case 'add':
        if (quantity < productDetails.countInStock) {
          setQuantity((prevQuantity) => prevQuantity + 1);
        }

        break;
      case 'subtract':
        if (quantity > 0) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }

        break;

      default:
        break;
    }
  };

  return (
    <>
      {productDetailsStatus === 'loading' ? (
        <Loader />
      ) : productDetailsStatus === 'failed' ? (
        <p className="ps-5 pt-4">
          Product not found. Go back to{' '}
          <Link className="color-brown fw-bold" to="/shop">
            Shop
          </Link>
          .
        </p>
      ) : (
        <div className="container my-5">
          <div className="row container text-center">
            <div className="col-12 col-sm-12 col-lg-5 text-center ">
              <div className="bg-gray-light text-center product-col pb-2">
                <SimpleReactLightbox>
                  <SRLWrapper options={lightboxOptions}>
                    <img
                      src={`${imageUrl}${
                        [
                          productDetails.imageOne,
                          productDetails.imageTwo,
                          productDetails.imageThree,
                          productDetails.imageFour,
                        ][selectedImage]
                      }`}
                      alt={productDetails.name}
                      className="img-fluid product-image"
                      style={{
                        width: '100%',
                        objectFit: 'contain',
                        cursor: 'pointer',
                      }}
                    />
                  </SRLWrapper>
                </SimpleReactLightbox>
              </div>

              <div className="small-img-group  text-center py-2 row">
                {[
                  productDetails.imageOne,
                  productDetails.imageTwo,
                  productDetails.imageThree,
                  productDetails.imageFour,
                ].map((item, index) => (
                  <div className="small-img-col col-3 p-1" key={index}>
                    <img
                      src={`${imageUrl}${item}`}
                      alt={productDetails.name}
                      className={`img-fluid small-image border border-2 ${
                        selectedImage === index ? 'image-active' : null
                      }`}
                      width="100%"
                      onClick={() => handleImageClick(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-10 col-sm-12 col-lg-7 text-start pe-5">
              <p className="fs-3 fw-bold color-blue-dark">
                TND{productDetails.price * quantity}
              </p>
              {/* <p className="">17%</p> */}
              <h1>{productDetails.name}</h1>
              <p>{productDetails.short_description}</p>
              <p className="mt-4">Quantity</p>
              <div className="row">
                <div className="d-flex align-items-center col-lg-2 p-0 mb-4">
                  <Button
                    disabled={productDetails.countInStock === 0}
                    variant="light"
                    onClick={() => handleQuantityChange('add')}
                  >
                    +
                  </Button>
                  <span className="mx-3">{quantity}</span>
                  <Button
                    disabled={productDetails.countInStock === 0}
                    variant="light"
                    onClick={() => handleQuantityChange('subtract')}
                  >
                    -
                  </Button>
                </div>
                <div className="col-lg-5">
                  <AddToCartButton
                    product={{ ...productDetails, quantity: quantity }}
                  />
                </div>
              </div>

              <hr className="mt-3" />
              <p>
                <strong>SKU: </strong>
                <span>{productDetails.id}</span>
              </p>
              <p>
                <strong>Category: </strong>
                {categoriesStatus === 'loading' ? (
                  <Loader />
                ) : categoriesStatus === 'failed' ? (
                  <Message message="Request failed. Please check your internet connection." />
                ) : (
                  <span>
                    {categories.filter(
                      (category) => category.id === productDetails.category
                    )[0]
                      ? categories.filter(
                          (category) => category.id === productDetails.category
                        )[0].name
                      : null}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div>
            <hr className="mt-5 mb-4" />
            <h2 className="mb-4">Description</h2>
            <p>{productDetails.long_description}</p>
            <hr className="mt-5 mb-4" />
            <h2>Related Products</h2>
            <div className="row center-section row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-5 mx-auto">
              {productsStatus === 'loading' ? (
                <Loader />
              ) : productsStatus === 'failed' ? (
                <Message message="Request failed. Please check your internet connection." />
              ) : (
                products
                  .filter(
                    (x) =>
                      x.category === productDetails.category &&
                      x.id !== productDetails.id
                  )
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;