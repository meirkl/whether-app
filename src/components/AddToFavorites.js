import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from '../media/heart.svg';
import { pink, white } from '../styles/colors';
import { toggleSavedFavoriteCity } from '../utils/functions';

const Favorite = styled.div`
  color: ${white};
  text-align: center;
  span {
    cursor: pointer;
  }
  svg {
    fill: ${pink};
    width: ${props => (props.favorite ? '45px' : '28px')};
    transform: ${props =>
      props.favorite ? 'translateY(-6px)' : 'translateY(0)'};
  }
`;

const AddToFavorites = memo(() => {
  const location = useSelector(({ location }) => location);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (
      favorites &&
      favorites.some(x => JSON.stringify(x) === JSON.stringify(location))
    ) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [location]);

  const toggleFavorite = () => {
    toggleSavedFavoriteCity(location);
    setFavorite(!favorite);
  };

  return (
    <Favorite favorite={favorite}>
      {!favorite ? (
        <span onClick={toggleFavorite}>
          <HeartIcon></HeartIcon>
          &nbsp;Add to favorites
        </span>
      ) : (
        <HeartIcon onClick={toggleFavorite} />
      )}
    </Favorite>
  );
});

export default AddToFavorites;
