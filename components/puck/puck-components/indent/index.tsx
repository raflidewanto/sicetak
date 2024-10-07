import { ComponentConfig, DropZone } from '@measured/puck';

export type IndentProps = {};

export const Indent: ComponentConfig<IndentProps> = {
  render: () => (
    <div style={{ marginLeft: 20 }}>
      <DropZone zone="indent" />
    </div>
  )
};
