import React, { memo } from 'react';
import styled from 'styled-components';
import { white } from '../styles/colors';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnit } from '../redux/actions';

const UnitButton = styled.div`
  color: ${white};
  margin-left: 20px;
  position: relative;
  cursor: pointer;

  input {
    display: none;
  }

  span {
    height: 2.5rem;
    width: 2.5rem;
    border: 1px solid ${white};
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 1.4rem;
  }

  span::after {
    content: '\\00b0 F';
    display: block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    position: absolute;
    left: 25%;
    transform: translateX(-25%);
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    transition: opacity 0.2s;
  }

  input:checked + span::after {
    content: '\\00b0 C';
  }
`;

const UnitSwitch = memo(() => {
  const dispatch = useDispatch();
  const metric = useSelector(({ unit }) => unit);
  return (
    <UnitButton>
      <label>
        <input
          type="checkbox"
          checked={metric}
          onChange={() => dispatch(toggleUnit())}
        />
        <span />
      </label>
    </UnitButton>
  );
});

export default UnitSwitch;
