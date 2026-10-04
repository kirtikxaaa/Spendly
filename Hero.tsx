"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Logo from "./Logo";
const F=({c,x,y,d,r=12}:{c:ReactNode;x:string;y:string;d:number;r?:number})=><motion.span aria-hidden className="absolute text-3xl sm:text-4xl" style={{left:x,top:y}} animate={{y:[0,-14,0],rotate:[-r,r,-r]}} transition={{duration:d,repeat:Infinity,ease:"easeInOut"}}>{c}</motion.span>;
export default function Hero({onStart}:{onStart:()=>void}){
 return <section className="relative px-5 pb-16 pt-14 text-center">
  <F c="🪙" x="6%" y="10%" d={4}/><F c="💖" x="86%" y="6%" d={5}/><F c="🧾" x="82%" y="62%" d={6}/><F c="👛" x="5%" y="68%" d={5}/><F c="✨" x="48%" y="2%" d={3}/><F c="₹" x="92%" y="36%" d={4}/><F c="🎀" x="12%" y="38%" d={6}/>
  <div className="mb-4 flex justify-center"><Logo size={56} bob/></div>
  <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="inline-block rounded-full border-2 border-plum bg-lav px-4 py-1 font-bold" style={{transform:"rotate(-2deg)"}}>financial wellness, but make it unserious</motion.p>
  <motion.h1 initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:150,damping:12}} className="mx-auto mt-5 max-w-2xl font-display text-5xl font-extrabold leading-[.95] sm:text-7xl">ARE YOU BROKE<br/><span className="inline-block -rotate-2 bg-hot px-3 text-cream">OR JUST DRAMATIC?</span></motion.h1>
  <p className="mt-5 text-xl font-medium">Spendly✨ is your brutally honest financial bestie.</p>
  <div className="mt-6 flex justify-center"><motion.button onClick={onStart} className="btn bg-butter text-xl" whileHover={{rotate:-2,y:-2}} whileTap={{y:3,boxShadow:"0 0 0 #30243A"}}>CHECK MY WALLET →</motion.button></div>
  <p className="mt-3 text-sm font-bold opacity-70">No bank connection. No judgement. Just vibes.</p></section>;
}
