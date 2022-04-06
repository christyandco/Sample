describe('Environment File', () => {
  it('Load variables from .env file', () => {
    expect(process.env.NEXT_PUBLIC_PARENT_APP).toBe('industry-app');
  });
});

export default {};
