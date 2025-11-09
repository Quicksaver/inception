import * as changeCaseValue from 'change-case';
import * as changeCaseKeys from 'change-case/keys';

import { Json } from 'types/json';

// These are borrowed from https://github.com/blakeembrey/change-case/blob/main/packages/change-case/src/index.ts
const SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
const SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
const DEFAULT_STRIP_REGEXP = /[^\p{L}\d|+]+/giu; // change from original is here

const NULL_CHAR = '\0';
const SPLIT_REPLACE_VALUE = `$1${NULL_CHAR}$2`;

// For object keys, we want to keep certain characters like `|` that the original splits
const split = (value: string) => value
  .trim()
  .replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE)
  .replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE)
  .replace(DEFAULT_STRIP_REGEXP, NULL_CHAR)
  .replace(new RegExp(`^${NULL_CHAR}+`), '')
  .replace(new RegExp(`${NULL_CHAR}+$`), '')
  .split(new RegExp(NULL_CHAR, 'g'))
  .filter(str => str);

function changeCase(which: string, value: string): string;
function changeCase(which: string, value: Json): Json;
function changeCase(which: string, value: Json | string): Json | string {
  const options = {
    locale: false as const,
    mergeAmbiguousCharacters: true,
  };

  if (typeof value !== 'string') {
    return changeCaseKeys[`${which}Case` as keyof typeof changeCaseKeys](value, Infinity, {
      ...options,
      split,
    }) as Json;
  }

  return changeCaseValue[`${which}Case` as keyof typeof changeCaseKeys](value, options);
}

export function camelCase(value: string): string;
export function camelCase(value: Json): Json;
export function camelCase(value: Json | string): Json | string {
  return changeCase('camel', value);
}

export function kebabCase(value: string): string;
export function kebabCase(value: Json): Json;
export function kebabCase(value: Json | string): Json | string {
  return changeCase('kebab', value);
}

export function noCase(value: string): string;
export function noCase(value: Json): Json;
export function noCase(value: Json | string): Json | string {
  return changeCase('no', value);
}

export function pascalCase(value: string): string;
export function pascalCase(value: Json): Json;
export function pascalCase(value: Json | string): Json | string {
  return changeCase('pascal', value);
}

export function sentenceCase(value: string): string;
export function sentenceCase(value: Json): Json;
export function sentenceCase(value: Json | string): Json | string {
  return changeCase('sentence', value);
}

export function snakeCase(value: string): string;
export function snakeCase(value: Json): Json;
export function snakeCase(value: Json | string): Json | string {
  return changeCase('snake', value);
}
