import { ComponentConfig } from '@measured/puck';

export type FieldLabelProps = {
  label: string;
  value: string;
};

// title: {
//     textAlign: 'center',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     fontFamily: 'Helvetica-Bold'
//   },
//   text: {
//     marginBottom: 10
//   },

export const FieldLabel: ComponentConfig<FieldLabelProps> = {
  label: 'Field',
  fields: {
    label: {
      type: 'text',
      label: 'Label'
    },
    value: {
      type: 'text',
      label: 'Text'
    }
  },
  defaultProps: {
    label: 'label',
    value: 'value'
  },
  render: ({ label, value }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
      }}
    >
      <p
        style={{
          width: '120px',
          textAlign: 'left'
        }}
      >
        {label}
      </p>
      <p
        style={{
          flex: 1,
          textAlign: 'left'
        }}
      >
        :{value}
      </p>
    </div>
  )
};
