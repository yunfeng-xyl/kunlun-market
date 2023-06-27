module.exports = {
  root: true,
  env: { node: true },
  globals: {
    defineEmits: "readonly",
    defineProps: "readonly",
  },
  extends: ["common", "plugin:vue/vue3-recommended", "@vue/prettier"],
  overrides: [
    {
      files: ["*.config.{ts,js}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  rules: {
    // 在<template>中强制一致缩进
    "vue/html-indent": ["error", 2],
    "vue/html-self-closing": "off",
    // 执行自闭合的风格
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: 3,
        multiline: 1,
      },
    ],
    // 要求单行元素的内容前后有一个换行符
    "vue/singleline-html-element-content-newline": "off",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"], //需要忽略的组件名
      },
    ],
  },
};