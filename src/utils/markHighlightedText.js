export const markHighlightedText = (body, highlights) => {
  let articleBodyWithHighlightedTexts = body;
  highlights.forEach((highlight) => {
    articleBodyWithHighlightedTexts = articleBodyWithHighlightedTexts.replace(
      highlight.text,
      `<span class="highlighted">${highlight.text}</span>`
    );
  });

  return articleBodyWithHighlightedTexts;
};
