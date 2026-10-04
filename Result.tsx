"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { Btn, Confetti, Sticker } from "./ui";
import { shareCard } from "@/lib/shareCard";

export default function Result({label,emoji,title,color,roast,shareText,onAgain,good,bad,children}:{label:string;emoji:string;title:string;color:string;roast:string;shareText:string;onAgain:()=>void;good?:boolean;bad?:boolean;children:ReactNode}){
 const [msg,setMsg]=useState("");
 return <motion.div initial={{scale:.85,opacity:0,rotate:-2}} animate={bad?{scale:1,opacity:1,rotate:0,x:[0,-12,12,-8,8,0]}:{scale:1,opacity:1,rotate:0}} transition={{type:"spring",stiffness:200,damping:15}}
 className="sticker relative mx-auto max-w-md p-6 text-center" style={{background:color}}>
 {good&&<Confetti/>}
 {(good||bad)&&<span className="absolute -right-2 -top-4"><Sticker color={good?"#B8F2D0":"#FFE68A"} rot={8}>{good?"BE SO FR":"UH OH"}</Sticker></span>}
 <p className="font-display text-lg font-extrabold opacity-80">{label}</p>
 <motion.div className="text-6xl" animate={{rotate:[0,-10,10,0]}} transition={{delay:.6,duration:.6}}>{emoji}</motion.div>
 <h2 className="my-2 font-display text-3xl font-extrabold leading-tight">{title}</h2>
 <div className="my-4">{children}</div>
 <p className="rounded-2xl border-2 border-dashed border-plum bg-cream/70 p-3 font-bold">“{roast}”</p>
 <div className="mt-5 flex flex-col gap-3">
  <Btn onClick={onAgain} color="#FFF9ED">RUN IT AGAIN</Btn>
  <Btn onClick={async()=>setMsg(await shareCard({label,title,roast,color,text:shareText}))} color="#30243A"><span className="text-cream">SHARE THIS</span></Btn>
 </div>
 <p role="status" className="mt-2 min-h-6 text-sm font-bold">{msg}</p>
 <p className="text-xs opacity-60">Spendly✨ · no bank connected</p>
 </motion.div>;
}
