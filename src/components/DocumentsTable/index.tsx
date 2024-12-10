"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";
import { DownloadCloud } from "lucide-react"; // Replace with your preferred icon library

interface DocumentFile {
  document_code: string;
  document_name: string;
  is_release: boolean;
}

interface DocumentType {
  type: string;
  name: string;
  documents_file: DocumentFile[];
}

interface Document {
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  document_type: DocumentType[];
}

interface Props {
  documents: Document[];
}

const DocumentTable: React.FC<Props> = ({ documents }) => {
  const handleDownloadTemplate = (documentCode: string) => {
    console.log("Downloading template:", documentCode);
    // Implement download logic here
  };

  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left">Nama Dokumen</TableHead>
          <TableHead className="px-4 py-2 text-center">Perorangan</TableHead>
          <TableHead className="px-4 py-2 text-center">Perusahaan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => {
          const individual = doc.document_type.find((type) => type.name === "perorangan");
          const corporate = doc.document_type.find((type) => type.name === "perusahaan");

          return (
            <TableRow key={doc.code} className="h-12 border-b">
              {/* Document Name */}
              <TableCell className="px-4 py-2">{doc.name}</TableCell>

              {/* Individual Action */}
              <TableCell className="px-4 py-2 text-center">
                {individual?.documents_file?.[0]?.document_code ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DownloadCloud
                          onClick={() => handleDownloadTemplate(individual.documents_file[0].document_code)}
                          className="cursor-pointer text-gray-700 hover:text-blue-600"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        Download Template Perorangan
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="text-gray-400">Unavailable</p>
                )}
              </TableCell>

              {/* Corporate Action */}
              <TableCell className="px-4 py-2 text-center">
                {corporate?.documents_file?.[0]?.document_code ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DownloadCloud
                          onClick={() => handleDownloadTemplate(corporate.documents_file[0].document_code)}
                          className="cursor-pointer text-gray-700 hover:text-blue-600"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        Download Template Perusahaan
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="text-gray-400">Unavailable</p>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DocumentTable;
