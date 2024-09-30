import PrinterIcon from '@/components/icons/printer';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import React from 'react';

interface Props extends React.ComponentPropsWithRef<'table'> {
  tableCaption: string;
  tableHeader1: string;
  tableHeader2: string;
  tableHeader3: string;
  productName: string;
  actionLabel1: string;
  actionLabel2: string;
}

const FinancingAgreementTable = (props: Props) => {
  const { actionLabel1, actionLabel2, productName, tableCaption, tableHeader1, tableHeader2, tableHeader3 } = props;
  return (
    <Table {...props}>
      <TableCaption>{tableCaption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>{tableHeader1}</TableHead>
          <TableHead>{tableHeader2}</TableHead>
          <TableHead>{tableHeader3}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{productName}</TableCell>
          <TableCell>
            <Button variant={'outline'}>
              <PrinterIcon className="mr-2" />
              {actionLabel1}
            </Button>
          </TableCell>
          <TableCell>
            <Button variant={'outline'}>
              <PrinterIcon className="mr-2" />
              {actionLabel2}
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default FinancingAgreementTable;
