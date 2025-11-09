import { defineField, type TextRule } from 'sanity';

export default function description(params: { [key: string]: unknown }) {
  return defineField({
    name: 'description',
    type: 'text',
    validation: (rule: TextRule) => [
      rule.required(),
    ],
    ...params,
  });
}
