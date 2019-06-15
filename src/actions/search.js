import axios from 'axios';
import { SEARCH_ITEM, SEARCH_ERROR } from './types';
import { checkToken } from '../utils/checkToken';
import { PassDispatch } from '../helpers/Config';

const searching = item => async (dispatch) => {
  try {
    checkToken();
    const find = await axios.post(`/api/search/?search=${item}`);
    dispatch(PassDispatch(SEARCH_ITEM, find.data));
  } catch (error) {
    dispatch(PassDispatch(SEARCH_ERROR, error.response));
  }
};
export default searching;
