import { ComponentConfig } from '@measured/puck';

export type ListProps = {
  listItems: Array<{ text: string }>;
  ordered: boolean;
};

export const ListComponent: ComponentConfig<ListProps> = {
  label: 'List',
  defaultProps: {
    listItems: [{ text: 'List Item' }],
    ordered: true
  },
  fields: {
    listItems: {
      type: 'array',
      label: 'List Items',
      arrayFields: {
        text: { type: 'text', label: 'List Item' }
      }
    },
    ordered: {
      type: 'select',
      options: [
        {
          label: 'Ordered List',
          value: true
        },
        {
          label: 'Unordered List',
          value: false
        }
      ]
    }
  },
  render: ({ listItems, ordered }) => {
    const ListTag = ordered ? 'ol' : 'ul';

    return (
      <ListTag style={{ listStyleType: ordered ? 'decimal' : 'disc', paddingLeft: '20px' }}>
        {listItems.map((item, index) => (
          <li key={`${item.text?.replaceAll(' ', '-')}-${index}`}>{item.text}</li>
        ))}
      </ListTag>
    );
  }
};
