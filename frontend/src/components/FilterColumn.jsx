import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

const FilterColumn = ({
  categoryFilter,
  setCategoryFilter,
  priceSet,
  setPriceSet,
  setApplyPriceFilter,
}) => {
  const categories = useSelector((state) => state.categories.value);
  const products = useSelector((state) => state.products.value);

  const handleAddFilter = (e) => {
    const newCategory = e.target.id;
    const categorySelected = categoryFilter.find((x) => x === newCategory);

    if (!categorySelected) {
      const newFilters = [...categoryFilter, newCategory];
      setCategoryFilter(newFilters);
    } else {
      const newFilter = categoryFilter.filter((x) => x !== newCategory);
      setCategoryFilter(newFilter);
    }
  };

  const handlePriceChange = (e) => {
    const newValue = e.target.value.length > 0 ? parseInt(e.target.value) : '';
    setPriceSet((prevPriceSet) => {
      return {
        ...prevPriceSet,
        [e.target.id]: newValue,
      };
    });
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    if (priceSet.min.length < 1 && priceSet.max < 1) {
      setApplyPriceFilter(false);
    } else {
      setApplyPriceFilter(true);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4 color-gray-dark">Filter</h3>
      <div className="categories ">
        <div className="d-flex mb-3 align-items-center justify-content-between">
          <h4 className="mb-0">Categories</h4>
          <span
            className="badge bg-secondary"
            onClick={() => setCategoryFilter([])}
            style={{ cursor: 'pointer' }}
          >
            Clear
          </span>
        </div>

        {categories.map((category) => (
          <Form key={category.name}>
            <div className="mb-3">
              <Form.Check
                type="checkbox"
                className="d-inline-block"
                id={category.id}
                value={category.id}
                label={category.name}
                onClick={(e) => handleAddFilter(e)}
                checked={
                  categoryFilter.find(
                    (x) => parseInt(x) === parseInt(category.id)
                  )
                    ? true
                    : false
                }
                onChange={(e) => console.log(e.target.value)}
              />
              <span className="ms-2 color-gray-dark">
                <small>
                  (
                  {
                    products.filter(
                      (product) => product.category === category.id
                    ).length
                  }
                  )
                </small>
              </span>
            </div>
          </Form>
        ))}
      </div>

      <hr className="my-5" style={{ color: '#8f8989' }} />

      {/* PRICE FILTER --------------------- */}
      <div className="price">
        <div className="d-flex mb-3 align-items-center justify-content-between">
          <h4 className="mb-0">Price</h4>
          <span
            className="badge bg-secondary"
            onClick={() => {
              setPriceSet({ min: '', max: '' });
              setApplyPriceFilter(false);
            }}
            style={{ cursor: 'pointer' }}
          >
            Clear
          </span>
        </div>
        <form onSubmit={handlePriceFilter}>
          <div className="row g-2">
            {/* First and Last Name ---- */}
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                id="min"
                placeholder="TND Min"
                value={priceSet.min}
                onChange={(e) => {
                  handlePriceChange(e);
                }}
              />
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                id="max"
                placeholder="TND Max"
                value={priceSet.max}
                onChange={(e) => {
                  handlePriceChange(e);
                }}
              />
            </div>

            <div className=" text-start">
              <button type="submit" className="btn bg-pink-light mt-1">
                Apply
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterColumn;