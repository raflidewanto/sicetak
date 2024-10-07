'use client';

import PDFRenderer from '@/components/template-surat/pdf-renderer';
import SuratKuasaFidusia from '@/components/template-surat/template-isi/surat-kuasa-fidusia';

const dummyData = {
  name: 'Jane',
  address: 'Jakarta',
  nik: '196540064',
  agreement_no: '16116462',
  date: Date.now(),
  brand: 'mitshubishi',
  engine_no: '213679217',
  chassis_no: '236712967',
  plate_no: '2738012784',
  bpkb_no: '87450721329',
  color: 'merah',
  year: '2008',
  bpkb_owner: 'John',
  condition: 'used'
};

const Page = () => {
  return (
    <PDFRenderer>
      <SuratKuasaFidusia {...dummyData} />
    </PDFRenderer>
  );
};

export default Page;
