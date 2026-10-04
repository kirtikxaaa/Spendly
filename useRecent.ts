"use client";
import { useCallback, useEffect, useState } from "react";
export type Recent={at:number;label:string};
const K="spendly-recent";
export function useRecent(){
 const [items,setItems]=useState<Recent[]>([]);
 useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem(K)||"[]"));}catch{}},[]);
 const add=useCallback((label:string)=>{setItems(p=>{const n=[{at:Date.now(),label},...p].slice(0,5);try{localStorage.setItem(K,JSON.stringify(n));}catch{}return n;});},[]);
 const clear=useCallback(()=>{setItems([]);try{localStorage.removeItem(K);}catch{}},[]);
 return {items,add,clear};
}
export function ago(t:number){const m=Math.floor((Date.now()-t)/60000);return m<1?"just now":m<60?`${m} min ago`:m<1440?`${Math.floor(m/60)}h ago`:"yesterday+";}
