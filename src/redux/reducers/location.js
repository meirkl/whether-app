import { SET_LOCATION } from '../../utils/constants';

const initialState = { Key: '215854', LocalizedName: 'Tel Aviv' };

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOCATION:
      return payload;
    default:
      return state;
  }
};

export default locationReducer;
