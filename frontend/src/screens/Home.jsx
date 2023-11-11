import React from 'react';
import HeroHome from '../components/HeroHome';
import Services from '../components/Services';
import Categories from '../components/Categories';
import LatestProducts from '../components/LatestProducts';
import TrustedBrands from '../components/TrustedBrands';
import DirectorsWords from '../components/DirectorsWords';
import Invest from '../components/Invest';
import Download from '../components/Download';

const Home = () => {
  return (
    <div className="home">
      <HeroHome />
      <Services />
      <Categories />
      <LatestProducts />
      <TrustedBrands />
      <DirectorsWords />
      <Invest />
      <Download />
    </div>
  );
};

export default Home;
