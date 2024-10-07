import { ComponentConfig } from '@measured/puck';

export type ParagraphProps = {
  text: string;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  textSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  padding?: string;
};

const wordFontWeightMap = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};

const wordFontSizeMap = {
  xs: '10px',
  sm: '12px',
  base: '14px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px'
};

export const Paragraph: ComponentConfig<ParagraphProps> = {
  label: 'Paragraph',
  fields: {
    padding: {
      type: 'text',
      label: 'Padding'
    },
    text: { type: 'text' },
    textAlign: {
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
    },
    fontWeight: {
      type: 'radio',
      options: [
        { label: 'Thin', value: 'thin' },
        { label: 'Extra Light', value: 'extralight' },
        { label: 'Light', value: 'light' },
        { label: 'Normal', value: 'normal' },
        { label: 'Medium', value: 'medium' },
        { label: 'Semi Bold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extra Bold', value: 'extrabold' },
        { label: 'Black', value: 'black' }
      ]
    },
    textSize: {
      type: 'radio',
      options: [
        { label: 'X-Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Base', value: 'base' },
        { label: 'Large', value: 'lg' },
        { label: 'X-Large', value: 'xl' },
        { label: '2X-Large', value: '2xl' },
        { label: '3X-Large', value: '3xl' },
        { label: '4X-Large', value: '4xl' },
        { label: '5X-Large', value: '5xl' },
        { label: '6X-Large', value: '6xl' },
        { label: '7X-Large', value: '7xl' },
        { label: '8X-Large', value: '8xl' },
        { label: '9X-Large', value: '9xl' }
      ]
    }
  },
  defaultProps: {
    text: `lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    textAlign: 'center',
    fontWeight: 'normal',
    textSize: 'base'
  },
  render: ({ text, textAlign, fontWeight, textSize, padding }) => (
    <div
      style={{
        padding: padding ? `${padding}` : '',
        textAlign: textAlign,
        fontWeight: wordFontWeightMap[fontWeight],
        fontSize: wordFontSizeMap[textSize]
      }}
    >
      <p>{text}</p>
    </div>
  )
};
