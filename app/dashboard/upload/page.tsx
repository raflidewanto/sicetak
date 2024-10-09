'use client';

import { usePDFJS } from '@/hooks/use-pdfjs';
import { useState } from 'react';

const PDFWordDetector = () => {
  const [detectedPatterns, setDetectedPatterns] = useState<any[]>([]);

  usePDFJS(async (pdfjs) => {
    const url = '/uploads/test-parsepdf.pdf'; // Replace with your file URL

    const loadingTask = pdfjs.getDocument(url);
    const pdfDocument = await loadingTask.promise;

    const patterns = ['{{ .fullname }}', '{{ .id }}'];

    // Loop through each page
    const allMatches: any[] = [];

    for (let pageIndex = 1; pageIndex <= pdfDocument.numPages; pageIndex++) {
      const page = await pdfDocument.getPage(pageIndex);

      // Get the text content with position data
      const textContent = await page.getTextContent();

      textContent.items.forEach((item: any) => {
        patterns.forEach((pattern) => {
          if (item.str.includes(pattern)) {
            const transform = item.transform;
            const x = transform[4];
            const y = transform[5];

            allMatches.push({
              pattern,
              text: item.str,
              position: { x, y },
              pageIndex
            });
          }
        });
      });
    }

    setDetectedPatterns(allMatches); // Store detected patterns with coordinates
  });

  return (
    <div>
      <h1>PDF Word Detector</h1>
      <div>
        {detectedPatterns.length > 0 ? (
          <div>
            <h2>Detected Patterns</h2>
            <ul>
              {detectedPatterns.map((item, index) => (
                <li key={index}>
                  Page {item.pageIndex}: Pattern "{item.pattern}" found at ({item.position.x}, {item.position.y})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No patterns detected.</p>
        )}
      </div>
    </div>
  );
};

export default PDFWordDetector;
