import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes safely, resolving conflicts.
 * Same pattern as shadcn/ui. Use everywhere in components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
