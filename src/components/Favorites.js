import React, { useCallback, useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setIsError, setLocation } from '../redux/actions';
import { ReactComponent as CloseCircleIcon } from '../media/close-circle-outline.svg';
import breaks from '../styles/breaks';
import { appBluePrimary, red, white } from '../styles/colors';
import { ACCUWEATHER_URL, API_KEY } from '../../utils/constants';
import { toggleSavedFavoriteCity } from '../utils/functions';
import Spinner from './Spinner';
import WeatherIcon from './WeatherIcon';
import Layout from './Layout';

const Grid = styled.section`
  margin: 50px auto;
  width: 90%;
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-gap: 50px;
  @media ${breaks.break1} {
    grid-gap: 25px;
  }
`;

const Item = styled.div`
  position: relative;
  background-color: ${appBluePrimary};
  border-radius: 0.5rem;
  text-align: center;
  color: ${white};
  height: 300px;
  @media ${breaks.break1} {
    height: 200px;
  }
`;

const RemoveButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  svg {
    width: 28px;
    fill: ${white};
    transition: width 0.2s;
    :hover {
      fill: ${red};
      width: 33px;
    }
  }
`;

const Content = styled.div`
  padding: 50px;
  @media ${breaks.break1} {
    padding: 20px;
  }
`;

const City = styled.div`
  font-size: 1.8rem;
`;

const Temperature = styled.div`
  font-size: 1.8rem;
`;

const Favorites = memo(({ history }) => {
  const dispatch = useDispatch();
  const metric = useSelector(({ unit }) => unit);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      try {
        return await Promise.all(
          favorites.map(async x => {
            const response = await fetch(
              `${ACCUWEATHER_URL}/currentconditions/v1/${x.Key}?apikey=${API_KEY}`
            );
            const [
              { WeatherText, Temperature, WeatherIcon },
            ] = await response.json();
            return {
              WeatherText,
              Temperature,
              WeatherIcon,
              ...x,
            };
          })
        );
      } catch (err) {
        console.error(err);
        dispatch(setIsError(true));
      }
    }
    return [];
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const temp = await fetchData();
      temp.sort((a, b) => (a.LocalizedName > b.LocalizedName ? 1 : -1));
      setFavorites(temp);
      setLoading(false);
    })();
  }, [fetchData]);

  const removeFavorite = (e, favorite) => {
    e.stopPropagation();
    const { Key, LocalizedName } = favorite;
    toggleSavedFavoriteCity({ Key, LocalizedName });
    const temp = favorites;
    const i = favorites.findIndex(
      x => JSON.stringify(x) === JSON.stringify(favorite)
    );
    temp.splice(i, 1);
    setFavorites([...temp]);
  };

  const selectFavorite = value => {
    const { Key, LocalizedName } = value;
    dispatch(setLocation({ Key, LocalizedName }));
    history.push('/');
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <Grid>
          {favorites.map(x => (
            <Item key={x.Key} onClick={() => selectFavorite(x)}>
              <RemoveButton onClick={e => removeFavorite(e, x)}>
                <CloseCircleIcon />
              </RemoveButton>
              <Content>
                <City>{x.LocalizedName}</City>
                <span>{x.WeatherText}</span>
                <Temperature>
                  {Math.floor(
                    metric
                      ? x.Temperature.Metric.Value
                      : x.Temperature.Imperial.Value
                  )}
                  &deg;
                </Temperature>
                <WeatherIcon iconNumber={x.WeatherIcon} />
              </Content>
            </Item>
          ))}
        </Grid>
      )}
    </Layout>
  );
});

export default Favorites;
