import "./globals.css";
import PWA from "@/components/PWA";
import type { Metadata, Viewport } from "next";
export const metadata: Metadata={title:"Spendly✨ — your wallet's brutally honest bestie",description:"Are you broke or just dramatic? No bank connection. Just vibes.",appleWebApp:{capable:true,title:"Spendly",statusBarStyle:"default"},icons:{icon:[{url:"/logo.svg",type:"image/svg+xml"},{url:"/icon-192.png",sizes:"192x192"}],apple:"/icon-192.png"}};
export const viewport: Viewport={width:"device-width",initialScale:1,themeColor:"#FFF9ED"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<PWA/></body></html>;}
