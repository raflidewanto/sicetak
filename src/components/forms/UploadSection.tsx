"use client";

import UploadedFileIcon from '@/assets/icons/ic-uploaded-file.svg';
import { X } from "lucide-react";
import Show from "../elements/Show";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip";

const UploadSection = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-y-2 rounded-md border-2 border-dashed border-gray-300 p-6
     text-gray-500"
      >
        <div className="flex flex-row items-center justify-center gap-x-3">
          <label className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700">
            Choose File
            <input type="file" accept=".pdf" className="hidden" onChange={() => {}} />
          </label>
          <p className="text-[0.75rem]">Upload File Here</p>
        </div>
        <p className="mt-1 text-xs">PDF files only (max size: 10 MB)</p>
      </div>
      <Show when={Boolean(true)}>
        <div className="flex flex-row items-center justify-between gap-x-3 rounded-lg border border-[#2665E5] bg-white p-[0.625rem]">
          <section className="flex flex-row items-center gap-x-2">
            <UploadedFileIcon />
            <p className="text-sm text-[#2665E5]">Nama File</p>
          </section>
          <section>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <X
                    size={20}
                    onClick={() => {}} // set file to null
                    className="cursor-pointer text-[#2665E5] transition-all hover:text-red-500"
                  />
                </TooltipTrigger>
                <TooltipContent className="rounded-md bg-black bg-opacity-85 p-2 text-white">
                  <p>Remove document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </section>
        </div>
      </Show>
    </>
  );
};

UploadSection.displayName = 'UploadSection';

export default UploadSection;