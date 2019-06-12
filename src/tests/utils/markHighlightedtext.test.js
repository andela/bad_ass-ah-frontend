import { markHighlightedText } from '../../utils/markHighlightedText';

describe('markHighlightedText function', () => {
  it('should return edited text', () => {
    const body = 'I am a badass software engineer';
    const highlights = [
      {
        id: 1,
        text: 'Good'
      },
      {
        id: 2,
        text: 'Jesus'
      }
    ];
    const articleBodyWithHighlightedTexts = markHighlightedText(body, highlights);
    expect(articleBodyWithHighlightedTexts.length).toBe(body.length);
  });
});
