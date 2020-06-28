import React from 'react';
import styled from 'styled-components';
import breaks from '../styles/breaks';

const svgs = require.context('../media/weather', false, /\.svg$/);

const weatherIcons = svgs.keys().reduce((images, path) => {
  images[path] = svgs(path);
  return images;
}, {});

const Icon = styled.img`
  @media ${breaks.break1} {
    width: 3rem;
  }

  @media ${breaks.break2} {
    width: 5rem;
  }

  @media ${breaks.break3} {
    width: 6rem;
  }
`;

const WeatherIcon = ({ iconNumber }) => {
  return <Icon src={weatherIcons[`./${iconNumber}.svg`]} alt="icon" />;
};

export default WeatherIcon;
