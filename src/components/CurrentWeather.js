import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { ReactComponent as ThermometerIcon } from '../media/thermometer.svg';
import breaks from '../styles/breaks';
import { thermometerYellow, white } from '../styles/colors';

const Wrapper = styled.section`
  color: ${white};
  @media ${breaks.break1} {
    margin-top: 2.5rem;
  }
  @media ${breaks.break2} {
    margin-top: 5rem;
  }
  @media ${breaks.break3} {
    margin-top: 6rem;
  }

  svg {
    fill: ${thermometerYellow};
    @media ${breaks.break1} {
      width: 5rem;
    }
    @media ${breaks.break2} {
      width: 7rem;
    }
    @media ${breaks.break3} {
      width: 7rem;
    }
  }
`;

const CityAndDegree = styled.div`
  display: flex;
  justify-content: center;
`;

const TextSize = css`
  @media ${breaks.break1} {
    font-size: 2.5rem;
  }
  @media ${breaks.break2} {
    font-size: 3.5rem;
  }
  @media ${breaks.break3} {
    font-size: 3.5rem;
  }
`;

const City = styled.div`
  text-align: center;
  ${TextSize}
`;

const Temperature = styled.div`
  ${TextSize}
`;

const WeatherText = styled.div`
  @media ${breaks.break1} {
    font-size: 1.2rem;
  }
  @media ${breaks.break2} {
    font-size: 1.6rem;
  }
  @media ${breaks.break3} {
    font-size: 1.6rem;
  }
`;

const CurrentWeather = memo(({ city, text, temperature }) => {
  const metric = useSelector(({ unit }) => unit);
  return temperature ? (
    <Wrapper>
      <City>{city}</City>
      <CityAndDegree>
        <div>
          <ThermometerIcon />
        </div>
        <div>
          <WeatherText>{text}</WeatherText>
          <Temperature>
            {Math.floor(
              metric ? temperature.Metric.Value : temperature.Imperial.Value
            )}
            &deg;
          </Temperature>
        </div>
      </CityAndDegree>
    </Wrapper>
  ) : null;
});

export default CurrentWeather;
