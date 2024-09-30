'use client';

import SearchIcon from '@/components/icons/search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CetakIsi = () => {
  async function handleClick() {
    try {
    } catch (error) {
      if (error instanceof Error) {
        console.error(error?.message);
      }
      console.error(error);
    }
  }

  return (
    <section className="container">
      <form className="flex items-center justify-start gap-x-4">
        <Input name="agreement_no" placeholder="Agreement Number" className="max-w-md" />
        <Button variant={'outline'} asChild>
          <SearchIcon />
        </Button>
      </form>
    </section>
  );
};

export default CetakIsi;
