'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import PageContainer from '@/components/layout/page-container'
import React from 'react'

type LetterType = 'financing' | 'recommendation' | 'complaint' | 'resignation'

type LetterPages = {
  [K in LetterType]: string[]
}

const letterTypes: LetterPages = {
  financing: ["Application", "Approval", "Rejection"],
  recommendation: ["Academic", "Professional", "Personal"],
  complaint: ["Product", "Service", "Employee"],
  resignation: ["Standard", "Two Weeks Notice", "Immediate"]
}

const GenerateSuratPage = () => {
  const [letterType, setLetterType] = useState<LetterType | ''>('')
  const [page, setPage] = useState<string>('')

  const handleGenerate = () => {
    if (letterType && page) {
      alert(`Generating ${page} page for ${letterType} letter`)
      // In a real application, you would typically navigate to a new page
      // or trigger the letter generation process here
    } else {
      alert("Please select both letter type and page")
    }
  }

  return (
    <PageContainer>
      <div className="space-y-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Letter Generator</h1>
      <p className="text-gray-600">Select the type of letter and page you want to generate</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="letter-type">Letter Type</Label>
          <Select onValueChange={(value: LetterType) => setLetterType(value)}>
            <SelectTrigger id="letter-type">
              <SelectValue placeholder="Select letter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financing">Financing</SelectItem>
              <SelectItem value="recommendation">Recommendation</SelectItem>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="resignation">Resignation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {letterType && (
          <div className="space-y-2">
            <Label htmlFor="page">Page</Label>
            <Select onValueChange={setPage}>
              <SelectTrigger id="page">
                <SelectValue placeholder="Select page" />
              </SelectTrigger>
              <SelectContent>
                {letterTypes[letterType].map((pageOption) => (
                  <SelectItem key={pageOption} value={pageOption.toLowerCase()}>
                    {pageOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button 
        onClick={handleGenerate} 
        className="w-full" 
        disabled={!letterType || !page}
      >
        Generate Letter
      </Button>
    </div>
    </PageContainer>
  )
}

export default GenerateSuratPage