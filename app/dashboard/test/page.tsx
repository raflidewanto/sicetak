"use client";

import PageContainer from '@/components/layout/page-container';
import Surat from '@/components/template-surat/surat';
import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Test = () => {
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <PageContainer>
            <Button onClick={handlePrint}>Print pdf</Button>
            <Surat ref={componentRef} />
        </PageContainer>

    )
}

export default Test