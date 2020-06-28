import { ERROR, SET_LOCATION, TOGGLE_UNIT } from '../../utils/constants';

export const setIsError = value => {
  return {
    type: ERROR,
    payload: value,
  };
};

export const setLocation = location => {
  return {
    type: SET_LOCATION,
    payload: location,
  };
};

export const toggleUnit = () => {
  return {
    type: TOGGLE_UNIT,
  };
};
