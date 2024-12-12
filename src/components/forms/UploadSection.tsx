"use client";

import UploadedFileIcon from "@/assets/icons/ic-uploaded-file.svg";
import CryptoJS from "crypto-js";
import { AlertCircleIcon, X } from "lucide-react";
import Show from "../elements/Show";
import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip";
import { bracketPlaceholder } from "@/types";
import React, { useEffect, useState } from "react";
import { extractBracketCoordinates } from "@/utils/pdf";
import { usePDFJS } from "@/hooks/usePdfjs";
import { useUploadDoc } from "@/services/documents/mutations/useUploadDocument";
import { getErrorMessage } from "@/utils/error";
import useDisclosure from "@/hooks/useDisclosure";
import moment from "moment";
import { LS_TOKEN } from "@/constants/data";
import { decryptLS } from "@/utils/crypto";

type UploadSectionProps = {
  type: "individual" | "corporate";
  setDocumentCode: React.Dispatch<React.SetStateAction<string>>;
};

const UploadSection = (props: UploadSectionProps) => {
  const { type } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [token, setToken] = useState("");

  // File and coordinates state
  const [file, setFile] = useState<File | null>(null);
  const [coordinates, setCoordinates] = useState<bracketPlaceholder[]>([]);
  const [error, setError] = useState("");

  const uploadMutation = useUploadDoc();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenStr = localStorage.getItem(LS_TOKEN);
      if (tokenStr) {
        setToken(decryptLS(tokenStr));
      }
    }
  }, []);

  const onLoadFile = async (pdfjs: any, file: File | null, setCoordinates: React.Dispatch<React.SetStateAction<bracketPlaceholder[]>>) => {
    if (!file) return;

    const handleCoordinates = (coordinates: bracketPlaceholder[]) => {
      setCoordinates(coordinates);
    };
    await extractBracketCoordinates(pdfjs, file, handleCoordinates);
  };

  usePDFJS((pdfjs: any) => onLoadFile(pdfjs, file, setCoordinates), [file]);

  function uploadFile() {
    if (!file) {
      setError("Please select a file before submitting.");
      return;
    }
    const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY as string;
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const signature = CryptoJS.HmacSHA256(`${token}${date}`, cryptoKey).toString();
    
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("placeholders", JSON.stringify(coordinates));
    formData.append("type", type === "individual" ? "perorangan" : "perusahaan");
    formData.append("datetime", date);
    formData.append("signature", signature);

    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        if (!data.success) {
          setError(getErrorMessage(data.message));
          return;
        }
        setFile(null);
        setCoordinates([]);
        onClose(); // Close the dialog after success
      },
      onError: (error) => {
        setError(getErrorMessage(error));
      },
    });
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(isOpen) => (isOpen ? onOpen() : onClose())}>
        <DialogTrigger asChild>
          <div className="flex flex-row items-center justify-center gap-x-3">
            <div
              className={`
              cursor-pointer rounded-md 
              bg-gray-200 hover:bg-gray-300 
              px-4 py-2 
              text-sm text-gray-700 
              transition-all
              capitalize
              `}
            >
              Upload {type} File
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription className="capitalize">Upload {type} File</DialogDescription>
          </DialogHeader>
          <div
            className="flex flex-col items-center justify-center gap-y-2 rounded-md border-2 border-dashed border-gray-300 p-6
     text-gray-500"
          >
            <div className="flex flex-row items-center justify-center gap-x-3">
              <label className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700">
                Choose File
                <input
                  form="upload-form"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      setFile(event.target.files[0]);
                    }
                  }}
                />
              </label>
              <p className="text-[0.75rem] capitalize">Upload {type} File Here</p>
            </div>
            <p className="mt-1 text-xs">PDF files only (max size: 10 MB)</p>
          </div>
          <Show when={Boolean(file)}>
            <div
              className={`
              flex flex-row items-center 
              justify-between gap-x-3 
              my-2 rounded-lg border 
              border-[#2665E5] bg-white p-[0.625rem]`}
            >
              <section className="flex flex-row items-center gap-x-2">
                <UploadedFileIcon />
                <p className="text-sm text-[#2665E5]">{file?.name}</p>
              </section>
              <section>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <X
                        size={20}
                        onClick={() => setFile(null)}
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
          <Show when={!!error}>
            <p className="text-red-500 font-medium flex justify-start items-center gap-x-2">
              <AlertCircleIcon /> Error
            </p>
          </Show>
          <DialogFooter className="my-3">
            <Button onClick={uploadFile}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

UploadSection.displayName = "UploadSection";

export default UploadSection;
