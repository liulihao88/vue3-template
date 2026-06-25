module.exports = {
  extends: [
    'eslint:recommended',
    // 如果是 React 项目
    'plugin:react/recommended',
    // 必须放最后，关闭所有与 Prettier 冲突的 ESLint 格式规则
    'prettier',
  ],
  rules: {
    // 只写业务逻辑规则，不写格式规则
    'no-console': 'warn',
    'no-unused-vars': 'error',
  },
}
