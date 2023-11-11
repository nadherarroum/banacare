import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductsCarousel from './ProductsCarousel';

const LatestProducts = () => {
  let products = useSelector((state) => state.products.value).slice(0, 10);

  return (
    <>
      {products && (
        <section className="latest bg-gray-light">
          <div className="section-y-padding">
            <h2 className="cursive-title text-center">New Collection</h2>
            <h1 className="color-blue-dark fw-bold text-center mb-5">
              Latest Products
            </h1>
            <ProductsCarousel products={products} />

            <div className="text-center">
              <button
                type="button"
                className="btn btn-lg rounded-4 mt-5 btn-blue-dark"
              >
                <Link to="shop">More Products</Link>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LatestProducts;
