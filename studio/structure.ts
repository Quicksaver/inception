// https://www.sanity.io/docs/structure-builder-cheat-sheet

import {
  CogIcon,
  EmptyIcon,
} from '@sanity/icons';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { defineQuery } from 'next-sanity';
import { ConfigContext } from 'sanity';
import type {
  ListBuilder, ListItem, ListItemBuilder, StructureBuilder,
} from 'sanity/structure';

import { apiVersion } from './env';

export default function getDefaultStructure(S: StructureBuilder, context: ConfigContext): ListBuilder {
  const items: (ListItem | ListItemBuilder)[] = [
    S.listItem()
      .title('About / Homepage')
      .child(
        S.document()
          .schemaType('about')
          .documentId('about'),
      ),
    // @ts-expect-error this is correct, types must need fixing
    S.divider(),
    S.listItem()
      .title('Consortium')
      .child(
        S.document()
          .schemaType('consortium')
          .documentId('consortium'),
      ),
    S.documentTypeListItem('beneficiaries').title('Beneficiaries'),
    orderableDocumentListDeskItem({
      context,
      S,
      title: '-- order --',
      type: 'beneficiaries',
    }),
    S.documentTypeListItem('associatedPartners').title('Associated Partners'),
    orderableDocumentListDeskItem({
      context,
      S,
      title: '-- order --',
      type: 'associatedPartners',
    }),
    // @ts-expect-error this is correct, types must need fixing
    S.divider(),
    S.listItem()
      .title('Training')
      .child(
        S.document()
          .schemaType('training')
          .documentId('training'),
      ),
    S.documentTypeListItem('trainingEvents').title('Events - Training'),
    orderableDocumentListDeskItem({
      context,
      S,
      title: '-- order --',
      type: 'trainingEvents',
    }),
    S.documentTypeListItem('otherEvents').title('Events - Other'),
    orderableDocumentListDeskItem({
      context,
      S,
      title: '-- order --',
      type: 'otherEvents',
    }),
    // @ts-expect-error this is correct, types must need fixing
    S.divider(),
    S.documentTypeListItem('positions').title('DC Positions'),
    orderableDocumentListDeskItem({
      context,
      S,
      title: '-- order --',
      type: 'positions',
    }),
    // @ts-expect-error this is correct, types must need fixing
    S.divider(),
    S.documentTypeListItem('scientificWorkPackages').title('Scientific Work Packages'),
    orderableDocumentListDeskItem({
      context,
      S,
      title: '-- order --',
      type: 'scientificWorkPackages',
    }),
    // @ts-expect-error this is correct, types must need fixing
    S.divider(),
    S.documentTypeListItem('blogArticle').title('News / Blog'),
    // @ts-expect-error this is correct, types must need fixing
    S.divider(),
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
            .filter(defineQuery(`
              !(_type in [
                "about",
                "associatedPartners",
                "beneficiaries",
                "blogArticle",
                "consortium",
                "media.tag",
                "otherEvents",
                "page",
                "positions",
                "scientificWorkPackages",
                "training",
                "trainingEvents"
              ])
              && !(_id in ["siteSettings"])
            `)),
        ),
      ...S.documentTypeListItems().filter(
        (item: ListItemBuilder) => {
          const id = item.getId();
          return id && ![
            'about',
            'associatedPartners',
            'beneficiaries',
            'blogArticle',
            'consortium',
            'otherEvents',
            'page',
            'positions',
            'scientificWorkPackages',
            'siteSettings',
            'social',
            'training',
            'trainingEvents',
          ].includes(id);
        },
      ),
    );
  }

  return S.list()
    .title('Base')
    .items(items);
}
