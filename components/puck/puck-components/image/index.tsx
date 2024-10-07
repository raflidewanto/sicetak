import { ComponentConfig } from '@measured/puck';

export type ImageProps = {
  src: string;
  alt?: string;
};

export const ImageBlock: ComponentConfig<ImageProps> = {
  label: 'Image',
  fields: {
    src: { type: 'text', label: 'Image URL' },
    alt: { type: 'text', label: 'Alt' }
  },
  render: ({ src, alt }) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        defaultValue={'https://placehold.co/600x400/EEE/31343C'}
        alt={alt}
        loading="lazy"
        fetchPriority="high"
        className="h-full w-full object-cover"
      />
    );
  }
};
