"use client";

import React, { forwardRef } from 'react'
import { cn } from "@/lib/utils";

interface SuratProps {
    className?: string
}


const Surat = forwardRef<HTMLDivElement, SuratProps>((props, ref) => {
    const { className } = props;
    return (
        <div ref={ref} className={cn(`mt-24 mx-6`, className)}>
            <section className='grid place-items-center'>
                <h1 className='font-bold text-lg text-center capitalize line-clamp-3 max-w-[28ch]'>perjanjian pembiayaan multiguna dengan cara fasilitas dana Nomor: 90909090/FD/01/21</h1>
            </section>
        </div>
    )
})

export default Surat