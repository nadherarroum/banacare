import ProductCard from '../components/ProductCard';
// SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

const ProductsCarousel = ({ products }) => {
  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1250: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            style={{
              marginRight: '0px',
              marginLeft: '0px',
              paddingTop: '2px',
              paddingBottom: '2px',
            }}
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;
