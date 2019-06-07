import ArticleValidation from '../../helpers/Article';

describe('Article Validation', () => {
  it('Should validate and return object', () => {
    const data = {
      title: 'this is title',
      body: 'this is body'
    };
    expect(typeof ArticleValidation(data)).toBe('undefined');
  });
});
