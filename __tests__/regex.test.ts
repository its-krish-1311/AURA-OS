describe('Artifact Regex Parsing', () => {
  const renderRegex = /```(?:javascript|jsx|tsx|ts|js)?\s*(?:render)?\s*\n([\s\S]*?)```/i;

  it('extracts standard javascript render blocks', () => {
    const aiContent = `Here is your app:\n\`\`\`javascript render\nconst a = 1;\n\`\`\``;
    const match = aiContent.match(renderRegex);
    expect(match?.[1]?.trim()).toBe('const a = 1;');
  });

  it('extracts jsx blocks', () => {
    const aiContent = `\`\`\`jsx\nconst b = 2;\n\`\`\``;
    const match = aiContent.match(renderRegex);
    expect(match?.[1]?.trim()).toBe('const b = 2;');
  });

  it('extracts bare code blocks', () => {
    const aiContent = `\`\`\`\nconst c = 3;\n\`\`\``;
    const match = aiContent.match(renderRegex);
    expect(match?.[1]?.trim()).toBe('const c = 3;');
  });
});
