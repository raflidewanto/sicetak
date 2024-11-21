import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DocumentCategoryFilter = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h1
          className="text-[1.125rem] font-bold"
          style={{
            marginBottom: '0.8rem'
          }}
        >
          Dokumen
        </h1>
        <div className="relative flex items-center gap-x-4 space-y-2 py-4">
          <p className="absolute left-0 top-0 text-xs text-muted-foreground">Kategori</p>
          <Select>
            <SelectTrigger className="w-[350px]" style={{ minWidth: '350px' }}>
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financing-agreement">Financing Agreement</SelectItem>
              <SelectItem value="agreement-transfer">Agreement Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={'outline'}
            style={{
              paddingInline: '0.5rem',
              paddingBottom: '0.375rem',
              paddingTop: '0.375rem',
              minWidth: '6.75rem',
              height: '2.5rem'
            }}
          >
            <p className="text-orange-600">Lihat</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCategoryFilter;
