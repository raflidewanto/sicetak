import { nanoid } from 'nanoid';
import type { Config, Data } from '@measured/puck';
import '@measured/puck/puck.css';
import { VerticalSpaceProps, VerticalSpace } from './puck-components/vertical-space';
import { HeadingProps, Heading } from './puck-components/heading';
import { ParagraphProps, Paragraph } from './puck-components/paragraph';
import { ContainerProps, Container } from './puck-components/container';
import { ColumnsProps, Columns } from './puck-components/columns';
import { FlexProps, Flex } from './puck-components/flex';
import { ImageBlock, ImageProps } from './puck-components/image';
import { AspectRatioBlock, AspectRatioProps } from './puck-components/aspect-ratio';
import { LinkComponent, LinkProps } from './puck-components/link';
import { SectionHeadingProps, SectionHeading } from './puck-components/section-heading';
import { PageBreak, PageBreakProps } from './puck-components/page-break';
import { Table, TableProps } from './puck-components/table';
import { FieldLabel, FieldLabelProps } from './puck-components/field-label';
import { ListProps, ListComponent } from './puck-components/list';
import { IndentProps, Indent } from './puck-components/indent';

type Props = {
  VerticalSpace: VerticalSpaceProps;
  SectionHeading: SectionHeadingProps;
  HeadingBlock: HeadingProps;
  Paragraph: ParagraphProps;
  Container: ContainerProps;
  Columns: ColumnsProps;
  Flex: FlexProps;
  Image: ImageProps;
  AspectRatio: AspectRatioProps;
  Link: LinkProps;
  Pagebreak: PageBreakProps;
  Table: TableProps;
  FieldLabel: FieldLabelProps;
  List: ListProps;
  Indent: IndentProps;
};

export const config: Config<Props> = {
  categories: {
    layout: {
      components: ['Container', 'VerticalSpace', 'Columns', 'Flex', 'Pagebreak']
    },
    typography: {
      components: ['HeadingBlock', 'Paragraph', 'SectionHeading']
    },
    other: {
      components: ['Link', 'Table', 'Image', 'AspectRatio', 'FieldLabel', 'List', 'Indent']
    }
  },
  components: {
    FieldLabel: FieldLabel,
    Table: Table,
    Link: LinkComponent,
    AspectRatio: AspectRatioBlock,
    Image: ImageBlock,
    Columns,
    Container,
    Flex,
    VerticalSpace,
    HeadingBlock: Heading,
    Paragraph,
    SectionHeading,
    Pagebreak: PageBreak,
    List: ListComponent,
    Indent: Indent
  }
};
export const initialData: Data = {
  content: [
    {
      type: 'SectionHeading',
      props: {
        id: `SectionHeading-${nanoid(10)}`,
        title: 'Hello!',
        description:
          'you can start editing your website content here by dragging and dropping the blocks you want to add to the page and edit the content of the blocks by clicking on them.'
      }
    }
  ],
  root: {}
};
