import { bracketPlaceholder } from "@/types";

export function base64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeType });
}

export function base64ToFile(base64String: string, fileName: string, mimeType: string) {
  const byteString = atob(base64String.split(",")[1]);

  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new File([byteArray], fileName, { type: mimeType });
};

export const extractBracketCoordinates = async (
  pdfjs: any,
  file: File,
  callback: (coordinates: bracketPlaceholder[]) => void
) => {
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = async () => {
    const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
    const loadingTask = pdfjs.getDocument({ data: typedArray });
    const pdfDocument = await loadingTask.promise;

    let allBracketCoordinates: bracketPlaceholder[] = [];

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
      const page = await pdfDocument.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const viewport = page.getViewport({ scale: 1 });
      const pageHeight = viewport.height;
      const scaleFactor = viewport.scale;
      const pageWidth = viewport.width;
      let accumulatedText = '';
      let itemCoordinates: { str: string; x: number; y: number; endX: number }[] = [];

      textContent.items.forEach((item: any) => {
        const str = item.str;
        const x = item.transform[4] * scaleFactor;
        const y = pageHeight - item.transform[5] * scaleFactor;

        const endX = x + (item.width || 0) * scaleFactor;

        itemCoordinates.push({
          str,
          x,
          y,
          endX,
        });
        accumulatedText += str;
      });

      const placeholderRegex = /{{\s*\$[\w]+\s*}}/g;
      let match: RegExpExecArray | null;

      while ((match = placeholderRegex.exec(accumulatedText)) !== null) {
        const placeholderText = match[0];
        const placeholderStartIndex = match.index;

        // Find the correct text item that contains the opening brackets
        let currentLength = 0;
        let bracketX = 0;
        let bracketY = 0;

        for (let i = 0; i < itemCoordinates.length; i++) {
          const item = itemCoordinates[i];
          const nextLength = currentLength + item.str.length;

          // Check if this item contains the start of the placeholder
          if (currentLength <= placeholderStartIndex && placeholderStartIndex < nextLength) {
            // Calculate the position of the first bracket within this text item
            const offsetInItem = placeholderStartIndex - currentLength;
            const approximateCharWidth = (item.endX - item.x) / item.str.length;
            bracketX = item.x + approximateCharWidth * offsetInItem - 2;
            bracketY = item.y;
            break;
          }

          currentLength = nextLength;
        }

        if (bracketX !== 0) {
          allBracketCoordinates.push({
            placeholder: placeholderText,
            x: bracketX,
            y: bracketY,
            page: pageNumber,
            page_width: pageWidth,
            page_height: pageHeight,
          });
        }
      }
    }

    callback(allBracketCoordinates);
  };

  fileReader.readAsArrayBuffer(file);
};

