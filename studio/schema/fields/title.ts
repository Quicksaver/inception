import { defineField, type StringRule } from 'sanity';

export default function title(params?: { [key: string]: unknown }) {
  return defineField({
    name: 'title',
    type: 'string',
    validation: (rule: StringRule) => [
      rule.required(),
    ],
    ...params,
  });
}
