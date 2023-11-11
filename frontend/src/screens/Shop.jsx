import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilterColumn from '../components/FilterColumn';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = useSelector((state) => state.products.value);
  const productStatus = useSelector((state) => state.products.status);
  const [sortValue, setSortValue] = useState('dateNewest');
  const { urlSearchKey } = useParams();
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceSet, setPriceSet] = useState({ min: '', max: '' });
  const [applyPriceFilter, setApplyPriceFilter] = useState(false);

  // Sorted and filtered Products  ------------------------------------------
  const filterAndSortedProducts = products
    .filter((product) =>
      product.name
        .toLowerCase()
        .includes(urlSearchKey ? urlSearchKey.toLowerCase() : '')
    )

    .filter((product) =>
      categoryFilter.length < 1 ||
      categoryFilter.find(
        (categoryId) => parseInt(categoryId) === product.category
      )
        ? product
        : null
    )
    .filter((currentElement) =>
      applyPriceFilter
        ? (parseInt(currentElement.price) >= priceSet.min ||
            priceSet.min === '') &&
          (parseInt(currentElement.price) <= priceSet.max ||
            priceSet.max === '')
        : currentElement
    )
    .sort((productA, productB) => {
      switch (sortValue) {
        case 'nameA':
          return productA.name
            .toLowerCase()
            .localeCompare(productB.name.toLowerCase());

        case 'nameZ':
          return productB.name
            .toLowerCase()
            .localeCompare(productA.name.toLowerCase());

        case 'dateNewest':
          return (
            new Date(productB.dateCreated) - new Date(productA.dateCreated)
          );

        case 'dateOldest':
          return (
            new Date(productA.dateCreated) - new Date(productB.dateCreated)
          );

        case 'priceHighest':
          return productB.price - productA.price;

        case 'priceLowest':
          return productA.price - productB.price;

        default:
          return 0;
      }
    })
    .map((product) => <ProductCard product={product} key={product.id} />);

  return (
    <>
      {productStatus === 'loading' ? (
        <Loader />
      ) : productStatus === 'failed' ? (
        <Message message="Request failed. Please check your internet connection." />
      ) : (
        <div className="row text-center mb-5">
          <h1 className="my-5">Shop</h1>

          <div className="col-lg-3 text-start">
            <FilterColumn
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priceSet={priceSet}
              setPriceSet={setPriceSet}
              setApplyPriceFilter={setApplyPriceFilter}
            />
          </div>
          <div className="col-lg-9 container">
            <div className="products">
              {products && (
                <main>
                  <div className="d-flex justify-content-between align-items-center mt-4 mt-lg-0">
                    <p className="fs-6 mb-0 ms-4 ">
                      {filterAndSortedProducts.length}{' '}
                      {filterAndSortedProducts.length === 1
                        ? 'Result'
                        : 'Results'}
                    </p>

                    <div className="row align-items-center">
                      <div className="col">
                        <span className="">Sort by: </span>
                      </div>
                      <div className="col-auto">
                        <select
                          className="form-select"
                          value={sortValue}
                          onChange={(e) => setSortValue(e.target.value)}
                        >
                          <option value="nameA">Name: A to Z</option>
                          <option value="nameZ">Name: Z to A</option>
                          <option value="dateNewest">Date: Newest</option>
                          <option value="dateOldest">Date: Oldest</option>
                          <option value="priceHighest">
                            Price: Highest to Lowest
                          </option>
                          <option value="priceLowest">
                            Price: Lowest to Highest
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pb-5">
                    {filterAndSortedProducts.length > 0 ? (
                      <div className="row center-section row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5 mx-auto">
                        {filterAndSortedProducts}
                      </div>
                    ) : (
                      <p className="text-start mt-5">No products found...</p>
                    )}
                  </div>
                </main>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;