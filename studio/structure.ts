// https://www.sanity.io/docs/structure-builder-cheat-sheet

import {
  CogIcon,
  EmptyIcon,
} from '@sanity/icons';
import type {
  ListBuilder, ListItem, ListItemBuilder, StructureBuilder,
} from 'sanity/structure';

import { apiVersion } from './env';

export default function getDefaultStructure(S: StructureBuilder): ListBuilder {
  const items: (ListItem | ListItemBuilder)[] = [
    S.documentTypeListItem('blogArticle').title('Blog'),
    S.documentTypeListItem('page').title('Simple Pages'),
    S.listItem()
      .title('Site Settings')
      .icon(CogIcon)
      .child(
        S.document()
          .schemaType('siteSettings')
          .documentId('siteSettings'),
      ),
  ];

  if (process.env.NODE_ENV === 'development') {
    items.push(
      // @ts-expect-error this is correct, types must need fixing
      S.divider(),
      S.listItem()
        .title('Orphan Documents')
        .icon(EmptyIcon)
        .child(
          S.documentList()
            .title('Orphan Documents')
            .apiVersion(apiVersion)
            .filter(`
              !(_type in ["blogArticle", "media.tag", "page"])
              && !(_id in ["siteSettings"])
            `),
        ),
      ...S.documentTypeListItems().filter(
        (item: ListItemBuilder) => {
          const id = item.getId();
          return id && ![
            'blogArticle',
            'page',
            'siteSettings',
            'social',
          ].includes(id);
        },
      ),
    );
  }

  return S.list()
    .title('Base')
    .items(items);
}
