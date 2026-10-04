export const CURRENCY={code:"INR",locale:"en-IN",symbol:"₹"};
export function num(s: string): number { const n=parseFloat(s.replace(/,/g,"")); return Number.isFinite(n)?Math.min(Math.max(n,0),1e9):0; }
export function money(n: number, d=0): string { const v=Number.isFinite(n)?n:0; return CURRENCY.symbol+v.toLocaleString(CURRENCY.locale,{minimumFractionDigits:d,maximumFractionDigits:d}); }
