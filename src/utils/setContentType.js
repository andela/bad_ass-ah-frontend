/* eslint-disable import/prefer-default-export */
export const setContentType = (type) => {
  const headers = {
    headers: {
      'Content-Type': type
    }
  };

  return headers;
};
