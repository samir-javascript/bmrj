import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: 'USD',
  }).format(price);
}
export function formatDate(dateInput: Date | string): string {
  const date = new Date(dateInput);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
