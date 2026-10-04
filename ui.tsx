"use client";
import { animate, motion } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";

export function Count({to,fmt=(n:number)=>String(Math.round(n))}:{to:number;fmt?:(n:number)=>string}){
 const [v,setV]=useState(0);
 useEffect(()=>{const c=animate(0,Number.isFinite(to)?to:0,{duration:1.2,ease:"easeOut",onUpdate:setV});return()=>c.stop();},[to]);
 return <span>{fmt(v)}</span>;
}
export function Btn({children,onClick,color="#FFE68A",type="button",disabled}:{children:ReactNode;onClick?:()=>void;color?:string;type?:"button"|"submit";disabled?:boolean}){
 return <motion.button type={type} disabled={disabled} onClick={onClick} style={{background:color}} className="btn disabled:opacity-50" whileHover={{y:-2}} whileTap={{y:3,boxShadow:"0 0 0 #30243A"}} transition={{type:"spring",stiffness:500,damping:18}}>{children}</motion.button>;
}
export function Field({label,value,onChange,prefix="₹",hint,text,tip}:{tip?:string;text?:boolean;label:string;value:string;onChange:(s:string)=>void;prefix?:string;hint?:string}){
 const id=label.replace(/\W/g,"");
 return <div><div className="mb-1 flex items-center"><label htmlFor={id} className="font-display text-lg font-extrabold">{label}</label>{tip&&<Tip text={tip}/>}</div>
 <div className="relative">{prefix&&<span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">{prefix}</span>}
 <input id={id} className="inp" style={{paddingLeft:prefix?"2.2rem":undefined}} inputMode={text?"text":"decimal"} placeholder={text?"cute shoes":"0"} value={value} onChange={e=>onChange(text?e.target.value:e.target.value.replace(/[^0-9.]/g,""))}/></div>
 {hint&&<p className="mt-1 text-sm opacity-70">{hint}</p>}</div>;
}
export function Sticker({children,color="#FFE68A",rot=-4}:{children:ReactNode;color?:string;rot?:number}){
 return <span className="inline-block rounded-full border-2 border-plum px-3 py-1 font-display text-sm font-extrabold" style={{background:color,transform:`rotate(${rot}deg)`}}>{children}</span>;
}
export function Confetti(){
 const bits=["🎉","✨","💖","🪙","⭐"];
 return <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">{Array.from({length:22}).map((_,i)=>
 <motion.span key={i} className="absolute text-2xl" style={{left:`${(i*47)%100}%`,top:-30}} animate={{y:"110vh",rotate:360}} transition={{duration:2.2+(i%5)*.3,delay:(i%7)*.1,ease:"easeIn"}}>{bits[i%5]}</motion.span>)}</div>;
}
export function Meter({pct,color}:{pct:number;color:string}){
 const r=70,c=2*Math.PI*r;
 return <div className="relative mx-auto h-48 w-48"><svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" role="img" aria-label={`${pct}%`}>
 <circle cx="80" cy="80" r={r} fill="none" stroke="#30243A22" strokeWidth="16"/>
 <motion.circle cx="80" cy="80" r={r} fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" strokeDasharray={c} initial={{strokeDashoffset:c}} animate={{strokeDashoffset:c*(1-pct/100)}} transition={{duration:1.2,ease:"easeOut"}}/></svg>
 <div className="absolute inset-0 grid place-items-center font-display text-5xl font-extrabold"><span><Count to={pct}/>%</span></div></div>;
}
export function Bar({label,pct,color}:{label:string;pct:number;color:string}){
 return <div><div className="mb-1 flex justify-between font-bold"><span>{label}</span><span>{pct}%</span></div>
 <div className="h-5 overflow-hidden rounded-full border-2 border-plum bg-white"><motion.div className="h-full" style={{background:color}} initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:.9,ease:"easeOut"}}/></div></div>;
}
export async function share(text:string):Promise<string>{
 try{ if(navigator.share){await navigator.share({title:"Spendly✨",text});return "shared 💌";}
  await navigator.clipboard.writeText(text);return "copied! send it to the group chat 📋";}
 catch{return "couldn't share, screenshot it instead 📸";}
}

export function Tip({text}:{text:string}){
 const [o,setO]=useState(false);
 return <span className="relative ml-1 inline-block" onMouseEnter={()=>setO(true)} onMouseLeave={()=>setO(false)}>
  <button type="button" aria-label="What's this?" aria-expanded={o} onClick={()=>setO(v=>!v)} onBlur={()=>setO(false)} className="grid h-8 w-8 place-items-center rounded-full border-2 border-plum bg-butter text-sm font-extrabold">?</button>
  {o&&<span role="tooltip" className="absolute left-0 top-10 z-10 w-56 rounded-xl border-2 border-plum bg-white p-2 text-sm font-medium">{text}</span>}</span>;
}
