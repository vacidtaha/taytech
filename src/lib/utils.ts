import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind sınıflarını birleştirmek için yardımcı fonksiyon
 * clsx ile conditional classes, twMerge ile çakışan sınıfları yönetir
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



