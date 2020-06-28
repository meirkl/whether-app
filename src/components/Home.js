import React from 'react';
import AddToFavorites from './AddToFavorites';
import Layout from './Layout';
import Search from './Search';
import WeatherData from './WeatherData';

const Home = () => {
  return (
    <Layout>
      <Search />
      <WeatherData />
      <AddToFavorites />
    </Layout>
  );
};

export default Home;
