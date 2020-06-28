import React, { useEffect, useState, memo } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setIsError } from '../redux/actions';
import { ACCUWEATHER_URL, API_KEY } from '../utils/constants';
import CurrentWeather from './CurrentWeather';
import UpComingDays from './UpComingDays';

const WeatherData = memo(() => {
  const dispatch = useDispatch();
  const location = useSelector(({ location }) => location);
  const metric = useSelector(({ unit }) => unit);
  const [todaysWeather, setTodaysWeather] = useState({});
  const [upComing5DaysWeather, setUpComing5DaysWeather] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${ACCUWEATHER_URL}/currentconditions/v1/${location.Key}?apikey=${API_KEY}`
        );
        const [data] = await response.json();
        setTodaysWeather(data);
      } catch (err) {
        console.error(err);
        dispatch(setIsError(true));
      }
    })();
  }, [location, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${ACCUWEATHER_URL}/forecasts/v1/daily/5day/${location.Key}?apikey=${API_KEY}&metric=${metric}`
        );
        const { DailyForecasts } = await response.json();
        setUpComing5DaysWeather(DailyForecasts);
      } catch (err) {
        console.error(err);
        dispatch(setIsError(true));
      }
    })();
  }, [metric, location, dispatch]);

  const { WeatherText: text, Temperature: temperature } = todaysWeather;
  const currentWeatherProps = { text, temperature };
  return (
    <Container fluid>
      <CurrentWeather city={location.LocalizedName} {...currentWeatherProps} />
      <UpComingDays data={upComing5DaysWeather} />
    </Container>
  );
});

export default WeatherData;
