import { ComponentConfig } from '@measured/puck';

export type PageBreakProps = {};

export const PageBreak: ComponentConfig<PageBreakProps> = {
  render: () => <p style={{ breakAfter: 'page' }}></p>
};
