import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
 return {name:"Spendly✨",short_name:"Spendly",description:"Your wallet's brutally honest bestie.",start_url:"/",display:"standalone",background_color:"#FFF9ED",theme_color:"#FFF9ED",
 icons:[{src:"/icon-192.png",sizes:"192x192",type:"image/png"},{src:"/icon-512.png",sizes:"512x512",type:"image/png",purpose:"any"},{src:"/icon-512.png",sizes:"512x512",type:"image/png",purpose:"maskable"}]};
}
