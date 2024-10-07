import { ComponentConfig, DropZone } from '@measured/puck';

export type TableProps = {
  rows: number;
  columns: number;
  border: string;
  cellPadding: string;
  cellAlignment: 'left' | 'center' | 'right';
  width?: string;
  height?: string;
};

export const Table: ComponentConfig<TableProps> = {
  label: 'Table',
  fields: {
    rows: {
      type: 'number',
      label: 'Rows'
    },
    columns: {
      type: 'number',
      label: 'Columns'
    },
    border: {
      type: 'text',
      label: 'Border'
    },
    cellPadding: {
      type: 'text',
      label: 'Cell Padding'
    },
    cellAlignment: {
      type: 'radio',
      label: 'Cell Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
    },
    width: {
      type: 'text',
      label: 'Width'
    },
    height: {
      type: 'text',
      label: 'Height'
    }
  },
  defaultProps: {
    rows: 3,
    columns: 3,
    border: '1px solid black',
    cellPadding: '10px',
    cellAlignment: 'left',
    width: '100%',
    height: 'auto'
  },
  render: ({ rows, columns, border, cellPadding, cellAlignment, width, height }) => {
    const tableRows = Array.from({ length: rows }, (_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: columns }, (_, colIndex) => (
          <td
            key={colIndex}
            style={{
              border: border,
              padding: cellPadding,
              textAlign: cellAlignment,
              width: width,
              height: height
            }}
          >
            <DropZone zone={`cell-${rowIndex}-${colIndex}`} />
          </td>
        ))}
      </tr>
    ));

    return (
      <table style={{ width: width || '100%', borderCollapse: 'collapse', height: height || 'auto' }}>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
};
