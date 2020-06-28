import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { setIsError, setLocation } from './redux/actions';
import ErrorModal from './components/ErrorModal';
import Spinner from './components/Spinner';
import Routes from './routes';
import { appBlueLight, appBluePrimary } from './styles/colors';
import { ACCUWEATHER_URL, API_KEY } from './utils/constants';
import { getCurrentPosition } from './utils/functions';
// import useFetch from './hooks/useFetch';

const GlobalStyle = createGlobalStyle`
body {
  min-height:100vh;
  background-attachment: scroll;
  background: ${appBluePrimary};
  background: linear-gradient(180deg, ${appBluePrimary} 0%, ${appBlueLight} 100%);
}
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { coords } = await getCurrentPosition();
        const { latitude, longitude } = coords;
        try {
          const response = await fetch(
            `${ACCUWEATHER_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude}%2C%20${longitude}`
          );
          const { Key, LocalizedName } = await response.json();
          dispatch(setLocation({ Key, LocalizedName }));
        } catch (err) {
          dispatch(setIsError(true));
          console.error(err);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Routes />
          <ErrorModal />
        </>
      )}
    </>
  );
};

export default App;
