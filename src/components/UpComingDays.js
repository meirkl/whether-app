import React from 'react';
import styled from 'styled-components';
import breaks from '../styles/breaks';
import { appBlueSecondary } from '../styles/colors';
import DayBox from './DayBox';

const Wrapper = styled.section`
  margin: auto;
  @media ${breaks.break1} {
    margin-top: 2.55rem;
  }

  @media ${breaks.break2} {
    width: 80%;
    margin-top: 5rem;
  }

  @media ${breaks.break3} {
    margin: auto;
    width: 60%;
    margin-top: 6rem;
  }
`;

const UpComingDaysBox = styled.div`
  background-color: ${appBlueSecondary};
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
`;

const UpComingDays = ({ data }) => {
  return (
    <Wrapper>
      <UpComingDaysBox>
        {data.map((x, i) => (
          <DayBox key={`day-${i}`} data={x} isDay={true} />
        ))}
      </UpComingDaysBox>
    </Wrapper>
  );
};

export default UpComingDays;
