import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges class names using `clsx` and `tailwind-merge`.
 *
 * @param {...ClassValue[]} inputs - The class values to combine and merge.
 * @returns {string} A string of merged class names.
 */
export function cN(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
