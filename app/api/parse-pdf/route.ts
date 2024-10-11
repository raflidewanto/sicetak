import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const tempDirectory = path.join(process.cwd(), 'tmp');

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file') as File;
  const searchStrings = JSON.parse(formData.get('searchStrings') as string); // Parse the JSON string
  const replaceStrings = JSON.parse(formData.get('replaceStrings') as string); // Parse the JSON string
  const caseSensitive = formData.get('caseSensitive');
  const replacementLimit = formData.get('replacementLimit');
  const name = formData.get('name');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    await fs.mkdir(tempDirectory, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const filePath = path.join(tempDirectory, file.name);

    const uint8Array = new Uint8Array(fileBuffer);

    await fs.writeFile(filePath, uint8Array);

    const jsonPayload = {
      url: filePath,
      searchStrings: searchStrings,
      replaceStrings: replaceStrings,
      caseSensitive: caseSensitive === 'true',
      replacementLimit: parseInt(replacementLimit as string, 10),
      name: name,
      async: false
    };

    // Send JSON payload to the external API
    const response = await fetch(`${process.env.NEXT_PUBLIC_PDF_BASE_URL}/edit/text-replace`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.NEXT_PUBLIC_PDF_CO_KEY ?? ''
      },
      body: JSON.stringify(jsonPayload)
    });

    if (response.ok) {
      const result = await response.json();
      return NextResponse.json({ success: true, data: result });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to process PDF' });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
