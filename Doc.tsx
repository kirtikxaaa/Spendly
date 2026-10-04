import Link from "next/link";
import { ReactNode } from "react";
import Logo from "./Logo";
export default function Doc({title,children}:{title:string;children:ReactNode}){
 return <main className="mx-auto max-w-xl px-5 py-10"><Link href="/" className="inline-flex min-h-11 items-center font-bold underline">← Back to Spendly✨</Link>
 <div className="mt-4"><Logo size={40}/></div>
 <div className="sticker mt-4 bg-white p-6"><h1 className="mb-4 font-display text-4xl font-extrabold">{title}</h1><div className="space-y-3 text-lg">{children}</div></div></main>;
}
