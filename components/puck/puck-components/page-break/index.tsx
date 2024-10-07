import { ComponentConfig } from '@measured/puck';

export type PageBreakProps = {};

export const PageBreak: ComponentConfig<PageBreakProps> = {
  label: 'Page Break',
  render: () => <p style={{ breakAfter: 'page' }}></p>
};
