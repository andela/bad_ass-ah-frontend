/* eslint-disable no-plusplus */
const isEmpty = input => (
  input === undefined || input === null || (typeof input === 'object' && Object.keys(input).length === 0)
      || (typeof input === 'string' && input.trim().length === 0));
// @article validation
// eslint-disable-next-line consistent-return
const articleValidation = (data) => {
  const errors = {};
  if (isEmpty(data.title)) {
    errors.title = 'Title is required .';
  }
  if (isEmpty(data.body)) {
    errors.body = 'Content can not be empty ';
  }
  // @return all errors
  if (Object.keys(errors).length !== 0) return errors;
};
const getTotalNumber = (input) => {
  let totalLike = 0;
  let totalDisLike = 0;
  if (typeof input !== 'undefined') {
    // eslint-disable-next-line array-callback-return
    input.map((data) => {
      totalLike += Number(data.like);
      totalDisLike += Number(data.dislike);
    });
  }
  return {
    totalDisLike,
    totalLike
  };
};
export {
  articleValidation as default,
  getTotalNumber
};
