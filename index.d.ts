declare module 'pdfjs-dist/webpack.mjs' {
  export * from 'pdfjs-dist';
}

declare module 'libreoffice-convert' {
  export function convertAsync(input: Buffer, format: string, options?: any): Promise<Buffer>;
}
