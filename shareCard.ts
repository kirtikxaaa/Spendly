function wrap(x: CanvasRenderingContext2D, t: string, cx: number, y: number, w: number, lh: number) {
  let line = ""; const lines: string[] = [];
  for (const word of t.split(" ")) { const n = line ? line + " " + word : word; if (x.measureText(n).width > w && line) { lines.push(line); line = word; } else line = n; }
  lines.push(line); lines.forEach((l, i) => x.fillText(l, cx, y + i * lh)); return y + lines.length * lh;
}
export async function shareCard(o: { label: string; title: string; roast: string; color: string; text: string }): Promise<string> {
  try {
    const c = document.createElement("canvas"); c.width = 1080; c.height = 1920;
    const x = c.getContext("2d"); if (!x) throw new Error("no canvas");
    x.fillStyle = "#FFF9ED"; x.fillRect(0, 0, 1080, 1920);
    x.fillStyle = "#30243A"; x.fillRect(100, 310, 900, 1200);
    x.fillStyle = o.color; x.strokeStyle = "#30243A"; x.lineWidth = 10; x.beginPath(); x.roundRect(90, 300, 900, 1200, 60); x.fill(); x.stroke();
    x.fillStyle = "#30243A"; x.textAlign = "center";
    x.font = "800 52px 'Baloo 2', sans-serif"; x.fillText(o.label, 540, 420);
    x.font = "800 90px 'Baloo 2', sans-serif"; const y = wrap(x, o.title, 540, 700, 780, 104);
    x.font = "500 46px 'DM Sans', sans-serif"; wrap(x, "“" + o.roast + "”", 540, y + 120, 760, 62);
    x.font = "800 56px 'Baloo 2', sans-serif"; x.fillText("Spendly✨", 540, 1640);
    x.font = "500 34px 'DM Sans', sans-serif"; x.fillText("no bank connected. just vibes.", 540, 1700);
    const blob = await new Promise<Blob | null>(r => c.toBlob(r, "image/png"));
    if (!blob) throw new Error("no blob");
    const file = new File([blob], "spendly.png", { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], text: o.text }); return "shared 💌"; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "spendly.png"; a.click(); URL.revokeObjectURL(a.href);
    await navigator.clipboard.writeText(o.text).catch(() => {});
    return "image saved + text copied 📸";
  } catch (e) {
    if ((e as Error).name === "AbortError") return "";
    try { await navigator.clipboard.writeText(o.text); return "copied! send it to the group chat 📋"; } catch { return "couldn't share, screenshot it instead 📸"; }
  }
}
