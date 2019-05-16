// @call type we are going to use
import { GET_ALL_ARTICLE } from './type';

const articles = [{
  id: Math.random(),
  title: 'this is article1',
  author: 'gracian'
},
{
  id: Math.random(),
  title: 'this is article2',
  author: 'gracian'
}];
// @get all article actions
const getAllArticle = () => (dispatch) => {
  dispatch({
    type: GET_ALL_ARTICLE,
    payload: articles
  });
};

export {
  getAllArticle as default
};
