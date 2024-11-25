'use client';

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Show from "./elements/Show";

export default function CopyIcon({ text }: { text: string }) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      tabIndex={0}
      role="button"
      onClick={handleCopy}
      className="relative cursor-pointer text-gray-500 hover:text-gray-600 transition duration-300"
    >
      <Show
        when={isCopied}
        fallback={(
          <Copy className="w-5 h-5" />
        )}
      >
        <Check className="w-5 h-5 text-green-500" />
      </Show>
    </div>
  );
}
