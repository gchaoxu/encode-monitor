module.exports = {
  extends: ['eslint-config-encode/typescript', 'prettier'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'no-cond-assign': 'off',
  },
};
