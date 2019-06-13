import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOADING_ON_SUBMIT,
  CLOSE_POPUP_ON_SUCCESS
} from '../actions/types';

const initialState = {
  loading: false,
  successRegisterPopUp: false
};
const reducer = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        successRegisterPopUp: true,
        data: payload
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case LOADING_ON_SUBMIT:
      return {
        ...state,
        loading: true,
      };
    case CLOSE_POPUP_ON_SUCCESS:
      return {
        ...state,
        successRegisterPopUp: false,
      };
    default:
      return state;
  }
};

export default reducer;
