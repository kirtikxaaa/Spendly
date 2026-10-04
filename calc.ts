export const clamp=(n:number,a=0,b=100)=>Math.min(b,Math.max(a,Number.isFinite(n)?n:0));
const days1=(d:number)=>Math.max(1,Math.floor(d)||1);

export const LEVELS=[
 {max:20,name:"COMFY",emoji:"🧸",line:"You have entered your soft-launch era.",color:"#B8F2D0"},
 {max:40,name:"DOING FINE",emoji:"😌",line:"Respectfully, you're doing okay. Don't ruin it.",color:"#FFE68A"},
 {max:60,name:"GETTING NERVOUS",emoji:"😬",line:"It's giving 'checks balance twice'.",color:"#C8B6FF"},
 {max:75,name:"KINDA BROKE",emoji:"🫠",line:"Your wallet would like a word.",color:"#FF8FB8"},
 {max:90,name:"FINANCIALLY COOKED",emoji:"💀",line:"You have entered your low-spend era.",color:"#FF6B6B"},
 {max:100,name:"CALLING IT A CHARACTER BUILDING EXPERIENCE",emoji:"🪦",line:"Touch grass. It's free.",color:"#FF5C93"}];

export function brokeCalc(money:number,days:number,essentials:number){
 const d=days1(days), left=money-essentials, daily=left/d;
 const score=left<=0?100:Math.round(clamp(100*(1-Math.min(daily,380)/380)));
 const level=LEVELS.find(l=>score<=l.max)??LEVELS[5];
 const persona=score<=20?"THE CASUAL SPENDER":score<=40?"THE MICRO-SPENDER":score<=60?"THE DELUSIONAL BUDGETER":score<=85?"THE SURVIVOR":"THE FINANCIAL MENACE";
 return {left:Math.max(left,0),daily:Math.max(daily,0),score,level,persona};
}

export const VERDICTS=[
 {t:"YES. BUY THE THING.",e:"🛍️",c:"#B8F2D0",good:true,bad:false,roast:"Main character behaviour. Respectfully."},
 {t:"TECHNICALLY YES… 👀",e:"👀",c:"#FFE68A",good:false,bad:false,roast:"Technically: yes. Financially: girl…"},
 {t:"WAIT A MINUTE.",e:"✋",c:"#C8B6FF",good:false,bad:false,roast:"The math is giving… mathing barely."},
 {t:"BESTIE, CLOSE THE TAB.",e:"🚪",c:"#FF8FB8",good:false,bad:true,roast:"Your wallet said no. Loudly."},
 {t:"ABSOLUTELY NOT 😭",e:"🚨",c:"#FF6B6B",good:false,bad:true,roast:"The math is not mathing. At all."}];

export function affordCalc(money:number,price:number,days:number,essentials:number){
 const d=days1(days), left=money-price-essentials, daily=left/d;
 const i=left<0?4:daily>=400?0:daily>=150?1:daily>=100?2:3;
 return {left:Math.max(left,0),daily:Math.max(daily,0),short:left<0?-left:0,verdict:VERDICTS[i]};
}

export function needCalc(a:boolean[]){ // a: [knewWeekAgo, ownSimilar, wouldCare, fullPrice, bored]
 const g=(i:number)=>!!a[i];
 const need=clamp(15+(g(0)?20:0)+(g(1)?0:30)+(g(2)?30:0));
 const want=clamp(25+(g(2)?20:0)+(g(3)?35:0)+(g(1)?10:5));
 const impulse=clamp(10+(g(0)?0:30)+(g(4)?40:0)+(g(3)?0:10)+(g(1)?10:0));
 const action=impulse>=70&&need<50?"WAIT 7 DAYS":need>=65?"BUY IT":want<40&&impulse<40?"CLOSE THE TAB":need<35&&impulse>=50?"CLOSE THE TAB":"WAIT 7 DAYS";
 return {need,want,impulse,action};
}

export const CATS=[{id:"food",e:"🍔",n:"Food"},{id:"shop",e:"🛍️",n:"Shopping"},{id:"coffee",e:"☕",n:"Coffee"},{id:"transport",e:"🚕",n:"Transport"},{id:"fun",e:"🎬",n:"Entertainment"},{id:"beauty",e:"💄",n:"Beauty"},{id:"subs",e:"📱",n:"Subscriptions"},{id:"college",e:"🎓",n:"College"},{id:"other",e:"❓",n:"Other"}];
export type Expense={id:string;cat:string;amt:number};
const ROAST:Record<string,string>={food:"Apparently you have been funding the food industry.",shop:"Your cart has more financial power than you do.",coffee:"It's not 'just a coffee' anymore.",other:"Money went somewhere. We may never know.",subs:"You are subscribed to approximately 47 things you forgot about.",transport:"Your commute is a lifestyle now.",fun:"Fun is valid. The receipts are also valid.",beauty:"Looking good, wallet looking worse.",college:"Character development, but make it tuition."};
export function expenseCalc(list:Expense[]){
 const total=list.reduce((s,x)=>s+x.amt,0);
 const by=CATS.map(c=>({...c,sum:list.filter(x=>x.cat===c.id).reduce((s,x)=>s+x.amt,0)})).filter(c=>c.sum>0).sort((a,b)=>b.sum-a.sum);
 const top=by[0];
 const sus=by.find(c=>c.id==="other")??by.find(c=>c.id==="subs")??by[by.length-1];
 const unn=by.find(c=>["coffee","fun","shop","beauty"].includes(c.id));
 return {total,by,top,sus,unn,roast:top?ROAST[top.id]:"Nothing logged. Suspiciously clean."};
}
