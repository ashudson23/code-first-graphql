module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'eslint-plugin-graphql',
  ],
  rules: {
    'class-methods-use-this': ['warn'],
  },
};
