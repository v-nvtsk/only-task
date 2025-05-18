import type { Period } from "@/types/data";

export const findExtremeYears = (arr: Period): { min: number, max: number } => {
  const currentYear = new Date().getFullYear();
  return arr?.events.reduce((res, { year }) => ({
    min: year < res.min ? year : res.min,
    max: year > res.max ? year : res.max,
  }), { min: Infinity, max: -Infinity }) || { min: currentYear - 100, max: currentYear };
};