import { FOLLOW_A_USER, UNFOLLOW_A_USER } from '../../actions/types';
// @ the initial state
const initiState = {
  followOneUser: null,
  unfollowOneUser: null,

};

export default function (state = initiState, action) {
  const { type, payload } = action;
  switch (type) {
    case FOLLOW_A_USER:
      return {
        ...state,
        followOneUser: payload,
        unfollowOneUser: null
      };
    case UNFOLLOW_A_USER:
      return {
        ...state,
        unfollowOneUser: payload,
        followOneUser: null
      };
    default:
      return state;
  }
}
