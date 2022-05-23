module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  overrides: [
    {
      files: ['src/**/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
        "vue/no-multiple-template-root": "off" 
      },
    },
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/no-multiple-template-root": "off" 
  }
}
