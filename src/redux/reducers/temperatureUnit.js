import { TOGGLE_UNIT } from '../../utils/constants';

const initialState = true;

const temperatureUnitReducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_UNIT:
      return !state;
    default:
      return state;
  }
};

export default temperatureUnitReducer;
