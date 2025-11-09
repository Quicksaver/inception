import { propertyGroups } from 'stylelint-config-clean-order';

const propertiesOrder = propertyGroups.map(properties => ({
  emptyLineBefore: 'never',
  noEmptyLineBetween: true,
  properties,
}));

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order/error',
    'stylelint-config-prettier-scss',
  ],

  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-color-format',
    'stylelint-use-nesting',
    'stylelint-csstree-validator',
    'stylelint-scss',
  ],

  root: true,

  rules: {
    'at-rule-no-vendor-prefix': true,
    'color-function-notation': [
      'modern',
      {
        ignore: [ 'with-var-inside' ],
      },
    ],
    'color-named': 'never',
    'csstools/use-nesting': 'always',
    'csstree/validator': {
      properties: {
        '@include': '|',
        'background-clip': '| text',
        'max-width': '| <length-percentage> | min( <length-percentage> , <length-percentage> ) | max( <length-percentage> , <length-percentage> )',
        'min-width': '| <length-percentage> | min( <length-percentage> , <length-percentage> ) | max( <length-percentage> , <length-percentage> )',
      },
      syntaxExtensions: [ 'sass' ],
    },
    'declaration-block-no-duplicate-properties': true,
    'font-weight-notation': 'numeric',
    'max-nesting-depth': 6,
    'order/order': [
      [
        'dollar-variables',
        {
          name: 'extend',
          type: 'at-rule',
        },
        {
          hasBlock: false,
          name: 'include',
          type: 'at-rule',
        },
        'custom-properties',
        'declarations',
        {
          hasBlock: true,
          name: 'include',
          type: 'at-rule',
        },
        'rules',
        'at-rules',
      ],
    ],
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'error',
        unspecified: 'bottomAlphabetical',
      },
    ],
    'plugin/declaration-block-no-ignored-properties': true,
    'scss/at-import-partial-extension-disallowed-list': [ 'scss' ],
    'scss/at-mixin-named-arguments': null,
    'scss/declaration-nested-properties': 'never',
    'scss/media-feature-value-dollar-variable': 'always',
    'scss/selector-no-redundant-nesting-selector': true,
    'selector-class-pattern': '^[a-z]((__)?[a-z0-9-_])+(--[a-z0-9-_]+)?$',
    'selector-max-compound-selectors': 6,
    'selector-max-specificity': '3,3,3',
    'selector-max-universal': 1,
  },
};
