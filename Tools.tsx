"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { affordCalc, brokeCalc, CATS, expenseCalc, Expense, needCalc } from "@/lib/calc";
import { money, num } from "@/lib/format";
import { Bar, Btn, Count, Field, Meter, Sticker } from "./ui";
import Result from "./Result";

type P={onSave:(s:string)=>void};
const Err=({m}:{m:string})=>m?<p role="alert" className="font-bold text-red">{m} 😭</p>:null;

export function Broke({onSave}:P){
 const [m,setM]=useState(""),[d,setD]=useState(""),[e,setE]=useState(""),[err,setErr]=useState("");
 const [r,setR]=useState<ReturnType<typeof brokeCalc>|null>(null);
 const go=(ev:React.FormEvent)=>{ev.preventDefault();if(!m||!d||num(d)<1)return setErr("Fill in money and at least 1 day");
  const x=brokeCalc(num(m),num(d),num(e));setErr("");setR(x);onSave(x.level.name);};
 if(r)return <Result label="YOUR FINANCIAL STATUS" emoji={r.level.emoji} title={r.level.name} color={r.level.color} good={r.score<=20} bad={r.score>75}
  roast={r.level.line} onAgain={()=>setR(null)} shareText={`I'm ${r.score}% broke (${r.level.name}) on Spendly✨ — ${money(r.daily,2)}/day. ${r.persona}`}>
  <Meter pct={r.score} color="#30243A"/><p className="mt-2 font-display text-3xl font-extrabold"><Count to={r.daily} fmt={n=>money(n,2)}/>/day</p>
  <p className="mt-1">After essentials: <b>{money(r.left)}</b></p><div className="mt-2"><Sticker color="#FFF9ED">{r.persona}</Sticker></div></Result>;
 return <form onSubmit={go} className="sticker mx-auto max-w-md space-y-4 bg-white p-6">
  <Field label="Money you have right now" value={m} onChange={setM}/><Field label="Days until money arrives" value={d} onChange={setD} prefix=""/>
  <Field label="Essentials still coming" value={e} onChange={setE} tip="Stuff you HAVE to pay: rent, bus pass, mess fees. Not boba."/><Err m={err}/><Btn type="submit" color="#FF8FB8">HOW COOKED AM I?</Btn></form>;
}

export function Afford({onSave}:P){
 const [m,setM]=useState(""),[p,setP]=useState(""),[d,setD]=useState(""),[e,setE]=useState(""),[err,setErr]=useState("");
 const [r,setR]=useState<ReturnType<typeof affordCalc>|null>(null);
 const go=(ev:React.FormEvent)=>{ev.preventDefault();if(!m||!p||!d||num(d)<1)return setErr("Money, price and days please");
  const x=affordCalc(num(m),num(p),num(d),num(e));setErr("");setR(x);onSave(x.verdict.t.replace(" 😭","").replace(" 👀",""));};
 if(r)return <Result label="THE VERDICT" emoji={r.verdict.e} title={r.verdict.t} color={r.verdict.c} good={r.verdict.good} bad={r.verdict.bad} roast={r.verdict.roast} onAgain={()=>setR(null)}
  shareText={`Spendly✨ says: ${r.verdict.t} Left over: ${money(r.left)} (${money(r.daily)}/day)`}>
  {r.short>0?<p className="font-display text-2xl font-extrabold">You're short by {money(r.short)}</p>:<>
  <p className="font-bold">Buying this leaves you with</p><p className="font-display text-4xl font-extrabold"><Count to={r.left} fmt={n=>money(n)}/></p>
  <p className="font-bold">That's about {money(r.daily)}/day until payday.</p></>}</Result>;
 return <form onSubmit={go} className="sticker mx-auto max-w-md space-y-4 bg-white p-6">
  <Field label="Money you have" value={m} onChange={setM}/><Field label="Price of the thing" value={p} onChange={setP}/>
  <Field label="Days until payday" value={d} onChange={setD} prefix="" tip="How many days until money lands again (pocket money, salary, stipend)."/><Field label="Essentials (optional)" value={e} onChange={setE}/><Err m={err}/>
  <Btn type="submit" color="#FFE68A">JUDGE ME</Btn></form>;
}

const QS=["Did you know this existed a week ago?","Do you already own something that does basically the same thing?","If this disappeared from the internet tomorrow, would you actually care?","Would you still buy it at full price?","Be honest… are you buying this because you're bored?"];
export function Need({onSave}:P){
 const [item,setItem]=useState(""),[started,setStarted]=useState(false),[a,setA]=useState<boolean[]>([]);
 const reset=()=>{setItem("");setStarted(false);setA([]);};
 const answer=(v:boolean)=>{const n=[...a,v];setA(n);if(n.length===5)onSave(`${needCalc(n).action}: ${item||"the thing"}`);};
 if(a.length===5){const r=needCalc(a),name=item||"this";
  return <Result label="THE ANALYSIS" emoji="🤨" title={r.action} color={r.action==="BUY IT"?"#B8F2D0":r.action==="WAIT 7 DAYS"?"#C8B6FF":"#FF8FB8"} bad={r.action==="CLOSE THE TAB"} good={r.action==="BUY IT"}
   roast={r.need<50?`You do not need ${name}. You WANT it. And honestly? Respect.`:`Okay, ${name} is actually justified. Delulu not detected.`} onAgain={reset} shareText={`Spendly✨ on "${name}": NEED ${r.need}% / WANT ${r.want}% / IMPULSE ${r.impulse}% → ${r.action}`}>
   <div className="space-y-3 text-left"><Bar label="NEED" pct={r.need} color="#B8F2D0"/><Bar label="WANT" pct={r.want} color="#FF8FB8"/><Bar label="IMPULSE" pct={r.impulse} color="#FF6B6B"/></div></Result>;}
 if(!started)return <form onSubmit={ev=>{ev.preventDefault();if(item.trim())setStarted(true);}} className="sticker mx-auto max-w-md space-y-4 bg-white p-6">
  <Field label="What are you about to buy?" value={item} onChange={setItem} prefix="" text/><Btn type="submit" color="#C8B6FF">START THE QUIZ</Btn></form>;
 return <div className="sticker mx-auto max-w-md overflow-hidden bg-white p-6"><div className="mb-4 h-3 overflow-hidden rounded-full border-2 border-plum"><motion.div className="h-full bg-hot" animate={{width:`${(a.length/5)*100}%`}} transition={{type:"spring"}}/></div>
  <AnimatePresence mode="wait"><motion.div key={a.length} initial={{x:80,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-80,opacity:0}} transition={{type:"spring",stiffness:300,damping:25}}>
   <p className="mb-1 text-sm font-bold">{a.length+1}/5 · {item}</p><h2 className="mb-5 font-display text-2xl font-extrabold">{QS[a.length]}</h2>
   <div className="grid grid-cols-2 gap-3"><Btn onClick={()=>answer(true)} color="#B8F2D0">YES</Btn><Btn onClick={()=>answer(false)} color="#FF8FB8">NO</Btn></div></motion.div></AnimatePresence></div>;
}

export function Where({onSave}:P){
 const [list,setList]=useState<Expense[]>([]),[cat,setCat]=useState("food"),[amt,setAmt]=useState(""),[err,setErr]=useState("");
 const r=expenseCalc(list);
 const add=(ev:React.FormEvent)=>{ev.preventDefault();const n=num(amt);if(n<=0)return setErr("Enter an amount above 0");setErr("");
  const next=[...list,{id:crypto.randomUUID(),cat,amt:n}];setList(next);setAmt("");onSave(`TOTAL DAMAGE ${money(expenseCalc(next).total)}`);};
 return <div className="mx-auto max-w-md space-y-5">
  <form onSubmit={add} className="sticker space-y-3 bg-white p-6"><label htmlFor="cat" className="font-display text-lg font-extrabold">Category</label>
   <select id="cat" className="inp" value={cat} onChange={e=>setCat(e.target.value)}>{CATS.map(c=><option key={c.id} value={c.id}>{c.e} {c.n}</option>)}</select>
   <Field label="Amount" value={amt} onChange={setAmt}/><Err m={err}/><Btn type="submit" color="#B8F2D0">ADD TO THE DAMAGE</Btn></form>
  <div className="sticker bg-butter p-6 text-center" style={{borderRadius:"8px 8px 24px 24px"}}>
   <p className="font-display text-lg font-extrabold">TOTAL DAMAGE</p><p className="font-display text-5xl font-extrabold"><Count to={r.total} fmt={n=>money(n)}/></p>
   {r.top?<><div className="mt-3 space-y-2 text-left">{r.by.map(c=><Bar key={c.id} label={`${c.e} ${c.n} ${money(c.sum)}`} pct={Math.round(c.sum/r.total*100)} color="#FF8FB8"/>)}</div>
   <p className="mt-3 font-bold">Biggest culprit: {r.top.e} {r.top.n}{r.sus&&<> · Most suspicious: {r.sus.e}</>}{r.unn&&<> · Most unnecessary: {r.unn.e}</>}</p>
   <p className="mt-2 rounded-2xl border-2 border-dashed border-plum bg-cream/70 p-3 font-bold">“{r.roast}”</p></>:<p className="mt-3 font-bold">🧾 No receipts yet. Suspiciously clean. Add one.</p>}</div>
  <ul className="space-y-2"><AnimatePresence>{list.map(x=>{const c=CATS.find(k=>k.id===x.cat)!;return <motion.li key={x.id} layout initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}} exit={{x:200,opacity:0,rotate:8}} className="sticker flex items-center justify-between bg-white px-4 py-2" style={{borderRadius:16}}>
   <span className="font-bold">{c.e} {c.n} · {money(x.amt)}</span><button aria-label={`Delete ${c.n} ${money(x.amt)}`} className="grid h-11 w-11 place-items-center" onClick={()=>setList(l=>l.filter(y=>y.id!==x.id))}><Trash2 size={20}/></button></motion.li>;})}</AnimatePresence></ul>
  {list.length>0&&<Btn onClick={()=>setList([])} color="#FFF9ED">RESET</Btn>}</div>;
}
