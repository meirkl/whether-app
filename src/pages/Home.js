import React from 'react';
import AddToFavorites from '../components/AddToFavorites';
import Layout from '../components/Layout';
import Search from '../components/Search';
import WeatherData from '../components/WeatherData';

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
