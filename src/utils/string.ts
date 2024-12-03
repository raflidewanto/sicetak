export function formatRupiah(amount: number) {
  if (amount === -1) return 'N/A';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', trailingZeroDisplay: "auto" }).format(amount);
}

export function formatDate(date: string | number) {
  return new Date(date).toLocaleDateString('id-ID');
}

export const isWhiteSpaceString = (str: string) => !str.replace(/\s/g, '').length;