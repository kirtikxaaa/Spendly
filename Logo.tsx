"use client";
import { motion } from "framer-motion";
export function LogoMark({size=64,bob=false}:{size?:number;bob?:boolean}){
 return <motion.svg role="img" aria-label="Spendly logo" width={size} height={size} viewBox="0 0 64 64" animate={bob?{y:[0,-6,0],rotate:[-4,4,-4]}:undefined} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}><g><circle cx="36" cy="20" r="13" fill="#FFE68A" stroke="#30243A" stroke-width="3"/><text x="36" y="26.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="17" fill="#30243A">₹</text><rect x="6" y="26" width="52" height="33" rx="10" fill="#FF8FB8" stroke="#30243A" stroke-width="3"/><rect x="38" y="35" width="23" height="14" rx="7" fill="#C8B6FF" stroke="#30243A" stroke-width="3"/><circle cx="47" cy="42" r="2.5" fill="#30243A"/><path d="M11 3l2.2 6.3L19.5 11.5 13.2 13.7 11 20 8.8 13.7 2.5 11.5 8.8 9.3z" fill="#FF5C93" stroke="#30243A" stroke-width="1.5" stroke-linejoin="round"/></g></motion.svg>;
}
export default function Logo({size=48,bob=false}:{size?:number;bob?:boolean}){
 return <span className="inline-flex items-center gap-2"><LogoMark size={size} bob={bob}/><span className="font-display font-extrabold leading-none" style={{fontSize:size*.6}}>Spendly✨</span></span>;
}
