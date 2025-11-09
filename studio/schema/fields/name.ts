import { defineField, type StringRule } from 'sanity';

export default function name(params: { [key: string]: unknown }) {
  return defineField({
    name: 'name',
    type: 'string',
    validation: (rule: StringRule) => [
      rule.required(),
    ],
    ...params,
  });
}
