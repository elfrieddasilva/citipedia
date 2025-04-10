import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const LOCAL_STORAGE_KEY = "citipedia-form-store";
export function resetForm() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}