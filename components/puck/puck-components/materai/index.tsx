import { ComponentConfig } from '@measured/puck';

export type MateraiProps = {};

export const Materai: ComponentConfig<MateraiProps> = {
  label: 'Materai',
  render: () => (
    <div
      style={{
        borderWidth: '2px',
        borderColor: '#D1D5DB',
        width: '40px',
        aspectRatio: 1 / 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p style={{ fontSize: '8px' }}>Materai</p>
      <p style={{ fontSize: '8px' }}>10.000</p>
    </div>
  )
};
