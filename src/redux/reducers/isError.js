import { ERROR } from '../../utils/constants';

const initialState = false;

const isErrorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ERROR:
      return payload;
    default:
      return state;
  }
};

export default isErrorReducer;
