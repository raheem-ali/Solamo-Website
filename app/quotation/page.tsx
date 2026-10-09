"use client";

import { useEffect, useMemo, useState } from "react";
import { Sora } from "next/font/google";

const sora = Sora({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-sora",
});

/* ===================== STYLES ===================== */
const CSS = `
.sq *, .sq *::before, .sq *::after { margin: 0; padding: 0; box-sizing: border-box; }
.sq {
  font-family: var(--font-sora), 'Sora', sans-serif;
  background: var(--light);
  color: var(--d);
  min-height: 100vh;
  --g: #2e7d32; --gm: #4caf50; --gl: #e8f5e9; --gp: #f1f8e9;
  --o: #ff7a00; --ol: #fff3e0; --n: #0a1628; --nm: #122040;
  --y: #ffc300; --b: #0057b8; --w: #fff; --d: #1a1a1a;
  --mid: #546e7a; --light: #f5f7fa; --brd: #e0e0e0; --r: #c62828; --rl: #ffebee;
}

/* ===== HEADER ===== */
.hdr {
  background: linear-gradient(135deg, var(--n), var(--nm));
  padding: 14px 28px; display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 2px 20px rgba(0,0,0,.3);
}
.hdr img { height: 48px; object-fit: contain; }
.hdr-r h1 { font-size: 17px; font-weight: 700; color: #fff; text-align: right; }
.hdr-r p { font-size: 11px; color: rgba(255,255,255,.45); text-align: right; margin-top: 2px; }

.wrap { max-width: 95%; margin: 0 auto; padding: 24px 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
@media (max-width: 920px) { .wrap { grid-template-columns: 1fr; } }

.panel { background: #fff; border-radius: 14px; box-shadow: 0 4px 24px rgba(46,125,50,.09); overflow: hidden; margin-bottom: 18px; }
.ph { padding: 16px 22px; display: flex; align-items: center; gap: 12px; }
.ph.gr { background: linear-gradient(135deg, var(--g), #388e3c); }
.ph.nv { background: linear-gradient(135deg, var(--n), var(--nm)); }
.ph.or { background: linear-gradient(135deg, var(--o), #e65100); }
.ph-ic { width: 38px; height: 38px; background: rgba(255,255,255,.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.ph-t { font-size: 15px; font-weight: 700; color: #fff; }
.ph-s { font-size: 11px; color: rgba(255,255,255,.6); margin-top: 2px; }
.pb { padding: 18px 22px; }

/* ===== FORM ===== */
.fg { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
.fg label { font-size: 10px; font-weight: 700; color: var(--mid); text-transform: uppercase; letter-spacing: .5px; }
.fg input, .fg select, .fg textarea {
  height: 40px; border: 2px solid var(--brd); border-radius: 8px; padding: 0 11px;
  font-size: 13px; font-family: inherit; color: var(--d); background: #fff; transition: border-color .2s; width: 100%;
}
.fg textarea { height: 70px; padding: 9px 11px; resize: vertical; }
.fg input:focus, .fg select:focus, .fg textarea:focus { outline: none; border-color: var(--g); }
.fg input[readonly] { background: #f0f4f0; color: var(--g); font-weight: 700; cursor: not-allowed; border-color: var(--gl); }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }

/* ===== APPLIANCES ===== */
.app-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.app-card { border: 2px solid var(--brd); border-radius: 8px; padding: 11px; background: #fafafa; transition: all .2s; }
.app-card.on { border-color: var(--g); background: var(--gl); }
.at { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }
.ae { width: 34px; height: 34px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 17px; box-shadow: 0 2px 6px rgba(0,0,0,.07); flex-shrink: 0; }
.an { font-size: 11px; font-weight: 700; color: var(--d); }
.aw { display: flex; align-items: center; gap: 2px; font-size: 9px; color: var(--mid); }
.w-input { width: 48px; height: 20px; border: 1.5px solid var(--brd); border-radius: 4px; padding: 0 3px; font-size: 9px; font-weight: 700; font-family: inherit; color: var(--g); text-align: center; background: #fff; transition: border-color .2s; }
.w-input:focus { outline: none; border-color: var(--g); background: var(--gl); }
.ac { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.ac label { font-size: 9px; font-weight: 700; color: var(--mid); text-transform: uppercase; letter-spacing: .4px; display: block; margin-bottom: 3px; }
.ctr { display: flex; align-items: center; background: #fff; border: 1.5px solid var(--brd); border-radius: 6px; overflow: hidden; }
.cb { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; font-size: 16px; font-weight: 800; color: var(--g); transition: background .15s; }
.cb:hover { background: var(--gl); }
.cv { flex: 1; text-align: center; font-weight: 700; font-size: 12px; color: var(--d); }
.hsl { width: 100%; height: 26px; border: 1.5px solid var(--brd); border-radius: 6px; padding: 0 5px; font-size: 10px; font-family: inherit; color: var(--d); background: #fff; cursor: pointer; }
.kt { margin-top: 7px; padding: 4px 7px; background: var(--g); border-radius: 5px; font-size: 9px; font-weight: 700; color: #fff; text-align: center; display: none; }
.app-card.on .kt { display: block; }

.live { background: linear-gradient(135deg, var(--n), var(--nm)); border-radius: 9px; padding: 14px 18px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 14px; }
.ls { text-align: center; }
.ls-l { font-size: 8px; font-weight: 700; color: rgba(255,255,255,.45); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 4px; }
.ls-v { font-size: 17px; font-weight: 800; color: var(--y); line-height: 1; }
.ls-u { font-size: 8px; color: rgba(255,255,255,.35); margin-top: 2px; }

.slabel { font-size: 10px; font-weight: 700; color: var(--mid); text-transform: uppercase; letter-spacing: .5px; margin: 14px 0 10px; padding-bottom: 7px; border-bottom: 2px solid var(--gl); }
.note { background: var(--gl); border-left: 4px solid var(--g); border-radius: 0 6px 6px 0; padding: 9px 12px; font-size: 10px; color: var(--mid); margin-bottom: 12px; }

/* ===== LINE ITEMS ===== */
.li-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
.li-table thead th { background: var(--n); color: #fff; padding: 8px 10px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; text-align: left; }
.li-table tbody tr { border-bottom: 1px solid var(--brd); }
.li-table tbody tr:nth-child(even) { background: #fafafa; }
.li-table tbody td { padding: 5px 6px; vertical-align: middle; }
.li-table tbody td input { border: 1.5px solid var(--brd); border-radius: 6px; padding: 5px 8px; font-size: 11px; font-family: inherit; color: var(--d); background: #fff; transition: border-color .2s; width: 100%; height: 32px; }
.li-table tbody td input:focus { outline: none; border-color: var(--g); }
.td-desc { width: 40%; }
.td-qty { width: 12%; text-align: center; }
.td-qty input { text-align: center; }
.td-up { width: 20%; }
.td-up input { text-align: right; }
.td-tot { width: 20%; text-align: right; }
.td-tot-val { font-size: 11px; font-weight: 700; color: var(--g); padding-right: 4px; }
.td-del { width: 36px; text-align: center; }
.del-btn { width: 26px; height: 26px; border: none; background: var(--rl); color: var(--r); border-radius: 6px; cursor: pointer; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; transition: all .2s; }
.del-btn:hover { background: var(--r); color: #fff; }

.add-row-btn { display: flex; align-items: center; gap: 7px; background: var(--gl); border: 2px dashed var(--gm); color: var(--g); border-radius: 8px; padding: 9px 14px; font-size: 11px; font-weight: 700; font-family: inherit; cursor: pointer; width: 100%; justify-content: center; transition: all .2s; margin-bottom: 12px; }
.add-row-btn:hover { background: var(--g); color: #fff; border-color: var(--g); }

.tot-bar { background: var(--g); border-radius: 8px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
.tot-bar span:first-child { font-size: 13px; font-weight: 800; color: #fff; }
.tot-bar span:last-child { font-size: 20px; font-weight: 900; color: var(--y); }

.btn { height: 44px; padding: 0 20px; border-radius: 8px; font-size: 12px; font-weight: 700; font-family: inherit; cursor: pointer; border: none; transition: all .25s; display: inline-flex; align-items: center; justify-content: center; gap: 7px; }
.btn-g { background: linear-gradient(135deg, var(--g), #388e3c); color: #fff; width: 100%; }
.btn-g:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,125,50,.4); }
.btn-o { background: linear-gradient(135deg, var(--o), #e65100); color: #fff; width: 100%; }
.btn-o:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,122,0,.4); }
.brow { display: flex; gap: 9px; margin-top: 14px; }

/* ===== SCREEN PREVIEW ===== */
.prev-wrap { position: sticky; top: 18px; align-self: start; }
.prev-label { background: var(--n); color: #fff; padding: 10px 18px; border-radius: 10px 10px 0 0; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 7px; }
.psec { padding: 14px 18px; background: var(--gp); display: flex; gap: 9px; }

.pv { background: #fff; border-radius: 0 0 14px 14px; box-shadow: 0 4px 24px rgba(46,125,50,.09); overflow: hidden; font-size: 9px; }
.pv-head { background: #0a1628; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; }
.pv-head img { height: 32px; object-fit: contain; }
.pv-head-r { text-align: right; }
.pv-title { font-size: 11px; font-weight: 800; color: #fff; letter-spacing: .5px; }
.pv-ref { font-size: 8px; color: rgba(255,255,255,.5); margin-top: 2px; }
.pv-valid { font-size: 8px; color: #ffc300; font-weight: 700; margin-top: 1px; }
.pv-accent { height: 3px; background: #2e7d32; }
.pv-body { padding: 12px 16px; }
.pv-two { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 11px; }
.pv-box { border: 1.5px solid #e0e0e0; border-radius: 6px; padding: 9px 11px; }
.pv-box-l { font-size: 7px; font-weight: 700; color: #546e7a; text-transform: uppercase; letter-spacing: .4px; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 5px; }
.pv-box-n { font-size: 12px; font-weight: 800; color: #1a1a1a; margin-bottom: 4px; }
.pv-row { font-size: 8px; color: #333; margin-bottom: 2px; }
.pv-sys { background: #fff8e1; border: 1.5px solid #ffc300; border-radius: 6px; padding: 9px 14px; text-align: center; margin-bottom: 11px; }
.pv-sys-t { font-size: 11px; font-weight: 800; color: #ff7a00; margin-bottom: 3px; }
.pv-sys-d { font-size: 8px; color: #546e7a; font-style: italic; }
.pv-sec { font-size: 8px; font-weight: 800; color: #0a1628; text-transform: uppercase; letter-spacing: .5px; border-bottom: 2px solid #2e7d32; padding-bottom: 4px; margin-bottom: 8px; }
.pv-table { width: 100%; border-collapse: collapse; margin-bottom: 9px; font-size: 8px; }
.pv-table thead tr { background: #0a1628; }
.pv-table th { color: #fff; padding: 5px 7px; }
.pv-table td { padding: 4px 7px; }
.pv-tf-l { padding: 6px 7px; font-size: 9px; font-weight: 800; color: #fff; text-transform: uppercase; background: #2e7d32; }
.pv-tf-r { padding: 6px 7px; font-size: 11px; font-weight: 900; color: #fff; text-align: right; background: #ff7a00; }
.pv-sav { border-radius: 5px; padding: 8px 10px; }
.pv-sav.red { background: #ffebee; border: 1.5px solid rgba(198,40,40,.2); }
.pv-sav.green { background: #e8f5e9; border: 1.5px solid rgba(46,125,50,.25); }
.pv-sav-t { font-size: 7px; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; }
.pv-sav-t.red, .pv .red { color: #c62828; }
.pv-sav-t.green, .pv .green { color: #2e7d32; }
.pv-row b { font-weight: 700; }
.pv-foot { background: #2e7d32; padding: 8px 16px; text-align: center; }
.pv-foot p { font-size: 8px; color: rgba(255,255,255,.75); }
.pv-foot p.tag { color: #ffc300; font-style: italic; font-weight: 600; margin-top: 2px; }

/* ===== PRINT DOCUMENT ===== */
#printDoc { display: none; }

#printDoc {
  font-family: var(--font-sora), "Segoe UI", sans-serif;
  background: #fff; color: #1a1a1a; width: 210mm; min-height: 297mm;
  font-size: 9pt; line-height: 1.4;
}
.pd-header { background: #fff; padding: 14pt 20pt; display: flex; justify-content: space-between; align-items: center; }
.pd-header img { height: 36pt; object-fit: contain; }
.pd-header-right { text-align: right; }
.pd-header-right .title { font-size: 14pt; font-weight: 800; color: #2e7d32; letter-spacing: .5pt; text-transform: uppercase; }
.pd-header-right .meta { font-size: 7.5pt; color: #000; margin-top: 3pt; }
.pd-header-right .valid { font-size: 7.5pt; color: #ffc300; font-weight: 700; margin-top: 2pt; }
.pd-accent { height: 6pt; background: #2e7d32; }
.pd-body { padding: 16pt 20pt; }
.pd-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12pt; margin-bottom: 14pt; }
.pd-box { border: 1.5pt solid #e0e0e0; border-radius: 6pt; padding: 10pt 12pt; }
.pd-box-label { font-size: 7pt; font-weight: 700; color: #546e7a; text-transform: uppercase; letter-spacing: .5pt; border-bottom: 1pt solid #e0e0e0; padding-bottom: 5pt; margin-bottom: 7pt; }
.pd-box-name { font-size: 13pt; font-weight: 800; color: #1a1a1a; margin-bottom: 5pt; }
.pd-box-row { font-size: 8pt; color: #333; margin-bottom: 3pt; display: flex; align-items: flex-start; gap: 4pt; }
.pd-sys-banner { background: #fff8e1; border: 1.5pt solid #ffc300; border-radius: 6pt; padding: 11pt 16pt; text-align: center; margin-bottom: 14pt; }
.pd-sys-banner .sys-title { font-size: 13pt; font-weight: 800; color: #ff7a00; margin-bottom: 4pt; }
.pd-sys-banner .sys-sub { font-size: 8pt; color: #546e7a; font-style: italic; }
.pd-section-label { font-size: 9pt; font-weight: 800; color: #0a1628; text-transform: uppercase; letter-spacing: .6pt; border-bottom: 2pt solid #2e7d32; padding-bottom: 5pt; margin-bottom: 10pt; }
.pd-table { width: 100%; border-collapse: collapse; margin-bottom: 14pt; }
.pd-table thead tr { background: #0a1628; }
.pd-table thead th { color: #fff; font-size: 8pt; font-weight: 700; padding: 7pt 9pt; text-align: left; text-transform: uppercase; letter-spacing: .3pt; }
.pd-table thead th.center { text-align: center; }
.pd-table thead th.right { text-align: right; }
.pd-table tbody tr { border-bottom: 1pt solid #e0e0e0; }
.pd-table tbody tr:nth-child(even) { background: #f1f8e9; }
.pd-table tbody td { font-size: 8.5pt; padding: 7pt 9pt; vertical-align: middle; }
.pd-table tfoot tr { background: #2e7d32; }
.pd-table tfoot td { padding: 8pt 9pt; font-size: 10pt; font-weight: 800; color: #fff; text-transform: uppercase; border: none; }
.pd-table tfoot td.right { color: #ffc300; font-size: 12pt; text-align: right; }
.pd-price-note { font-size: 7pt; color: #888; font-style: italic; margin-bottom: 14pt; }
.pd-savings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; margin-bottom: 12pt; }
.pd-sav-box { border-radius: 6pt; padding: 10pt 12pt; }
.pd-sav-box.red { background: #ffebee; border: 1.5pt solid rgba(198,40,40,.2); }
.pd-sav-box.green { background: #e8f5e9; border: 1.5pt solid rgba(46,125,50,.25); }
.pd-sav-title { font-size: 8pt; font-weight: 800; text-transform: uppercase; letter-spacing: .4pt; margin-bottom: 6pt; }
.pd-sav-title.red { color: #c62828; }
.pd-sav-title.green { color: #2e7d32; }
.pd-sav-row { font-size: 8pt; margin-bottom: 3pt; color: #333; }
.pd-sav-row span { font-weight: 700; }
.pd-sav-row span.red { color: #c62828; }
.pd-sav-row span.green { color: #2e7d32; }
.pd-footer { background: #2e7d32; padding: 10pt 20pt; text-align: center; }
.pd-footer p { font-size: 8pt; color: rgba(255,255,255,.75); margin-bottom: 2pt; }
.pd-footer .tagline { font-size: 8pt; color: #ffc300; font-style: italic; font-weight: 600; }

@media print {
  @page { size: A4; margin: 0; }
  body * { visibility: hidden !important; }
  .sq { background: #fff !important; min-height: 0 !important; }
  .screen-ui { display: none !important; }
  #printDoc, #printDoc * { visibility: visible !important; }
  #printDoc { display: block !important; position: absolute; left: 0; top: 0; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
`;

/* ===================== CONFIG ===================== */
const LOGO =
    "/images/logo.webp?v=2";

const EMAILJS_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "GvWr65-NjEmpfJ_aG";
const EMAILJS_SERVICE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_nk2ad6o";
const EMAILJS_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_83nk8bt";

const KE = 50; // PKR per unit
const PSUN = 5; // peak sun hours
const EFF = 0.8; // system efficiency

type App = {
    id: string;
    name: string;
    emoji: string;
    w: number;
    max: number;
    hrs: number[];
    def: number;
};

const APPS: App[] = [
    { id: "fan", name: "Ceiling Fan", emoji: "🌀", w: 75, max: 10, hrs: [4, 6, 8, 10, 12, 16, 24], def: 10 },
    { id: "lt", name: "LED Lights", emoji: "💡", w: 12, max: 20, hrs: [2, 4, 6, 8, 10, 12], def: 8 },
    { id: "ac1", name: "AC (1 Ton)", emoji: "❄️", w: 1100, max: 6, hrs: [2, 4, 6, 8, 10, 12], def: 8 },
    { id: "ac15", name: "AC (1.5 Ton)", emoji: "🌬️", w: 1600, max: 6, hrs: [2, 4, 6, 8, 10, 12], def: 8 },
    { id: "ac2", name: "AC (2 Ton)", emoji: "🧊", w: 2200, max: 4, hrs: [2, 4, 6, 8, 10, 12], def: 8 },
    { id: "frg", name: "Refrigerator", emoji: "🧊", w: 150, max: 2, hrs: [24], def: 24 },
    { id: "wsh", name: "Washing Machine", emoji: "🫧", w: 500, max: 2, hrs: [1, 2, 3, 4], def: 2 },
    { id: "mot", name: "Water Motor", emoji: "💧", w: 750, max: 2, hrs: [1, 2, 3, 4, 6], def: 2 },
    { id: "tv", name: "TV / LED", emoji: "📺", w: 100, max: 5, hrs: [2, 4, 6, 8], def: 6 },
    { id: "irn", name: "Iron", emoji: "👔", w: 1000, max: 2, hrs: [0.5, 1, 2], def: 1 },
];

const VALIDITY = [
    "12 Hours", "24 Hours", "2 Days", "3 Days", "5 Days", "7 Days",
    "10 Days", "14 Days", "15 Days", "20 Days", "30 Days",
];

const SYSTEM_TYPES = [
    "Hybrid Solar System",
    "On-Grid Solar System",
    "Off-Grid Solar System",
];

type Line = { id: number; desc: string; qty: string; up: string };

const DEFAULT_LINES: Omit<Line, "id">[] = [
    { desc: "Solar Panels", qty: "1", up: "" },
    { desc: "Inverter — Itel", qty: "1", up: "140000" },
    { desc: "Mounting Structure", qty: "1", up: "" },
    { desc: "Wiring & Accessories — Pakistan Cable + Fast Cable", qty: "1", up: "60000" },
    { desc: "AC Protection & DB Box", qty: "1", up: "18000" },
    { desc: "Installation Charges", qty: "1", up: "" },
    { desc: "Transport Charges", qty: "1", up: "8000" },
];

const makeDefaultLines = (): Line[] =>
    DEFAULT_LINES.map((l, i) => ({ ...l, id: i + 1 }));

const initialQty = () => Object.fromEntries(APPS.map((a) => [a.id, 0]));
const initialHrs = () => Object.fromEntries(APPS.map((a) => [a.id, a.def]));
const initialWatts = () => Object.fromEntries(APPS.map((a) => [a.id, a.w]));

/* ===================== HELPERS ===================== */
function fmtPKR(n: number) {
    if (!n) return "—";
    return "PKR " + Math.round(n).toLocaleString("en-PK");
}

function recommendedKw(kwhPerDay: number) {
    if (!kwhPerDay) return 0;
    const r = kwhPerDay / (PSUN * EFF);
    const sizes = [3, 5, 6, 8, 10, 12, 15, 20, 25, 30];
    return sizes.find((s) => s >= r) ?? Math.ceil(r / 5) * 5;
}

function makeRef(city: string) {
    const code = city === "Karachi" ? "KHI" : city === "Lahore" ? "LHR" : "OTH";
    return `SE-${code}-${Math.floor(100 + Math.random() * 900)}`;
}

/* ===================== COMPONENT ===================== */
export default function Page() {
    // client
    const [cName, setCName] = useState("");
    const [cPhone, setCPhone] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cCity, setCCity] = useState("Karachi");
    const [cAddr, setCAddr] = useState("");
    const [cGoal, setCGoal] = useState("");
    const [qRef, setQRef] = useState("");
    const [qValidity, setQValidity] = useState("12 Hours");
    const [dateStr, setDateStr] = useState("");

    // appliances
    const [qty, setQty] = useState<Record<string, number>>(initialQty);
    const [hrs, setHrs] = useState<Record<string, number>>(initialHrs);
    const [watts, setWatts] = useState<Record<string, number>>(initialWatts);

    // system
    const [sSize, setSSize] = useState("");
    const [sType, setSType] = useState(SYSTEM_TYPES[0]);
    const [sDesc, setSDesc] = useState("");

    // line items
    const [lines, setLines] = useState<Line[]>(makeDefaultLines);
    const [nextId, setNextId] = useState(DEFAULT_LINES.length + 1);

    // savings
    const [curB, setCurB] = useState("");
    const [newB, setNewB] = useState("");
    const [mSave, setMSave] = useState("");
    const [aSave, setASave] = useState("");
    const [pay, setPay] = useState("");
    const [freeY, setFreeY] = useState("");
    const [terms, setTerms] = useState("");

    // Set client-only values after mount (avoids hydration mismatch)
    useEffect(() => {
        setQRef(makeRef("Karachi"));
        setDateStr(
            new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
        );
    }, []);

    /* ----- load calculator ----- */
    const kwhOf = (id: string) => (watts[id] * qty[id] * hrs[id]) / 1000;
    const totalKwh = APPS.reduce((s, a) => s + kwhOf(a.id), 0);
    const monthlyUnits = totalKwh * 30;
    const estBill = monthlyUnits * KE;
    const recKw = recommendedKw(totalKwh);

    // auto-fill system size from the load calculator
    useEffect(() => {
        if (recKw > 0) setSSize(`${recKw}kW`);
    }, [recKw]);

    /* ----- line items ----- */
    const rows = useMemo(
        () =>
            lines.map((l) => {
                const q = parseFloat(l.qty) || 0;
                const u = parseFloat(l.up) || 0;
                return { ...l, q, u, tot: q * u };
            }),
        [lines],
    );
    const total = rows.reduce((s, r) => s + r.tot, 0);

    const updateLine = (id: number, patch: Partial<Line>) =>
        setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    const addRow = () => {
        setLines((ls) => [...ls, { id: nextId, desc: "", qty: "1", up: "" }]);
        setNextId((n) => n + 1);
    };
    const delRow = (id: number) =>
        setLines((ls) => ls.filter((l) => l.id !== id));

    /* ----- derived text ----- */
    const sysTitle = `RECOMMENDED SYSTEM: ${sSize || "X kW"} ${sType}`;
    const descFull = terms.trim() ? terms.trim() : sDesc;
    const curNum = parseInt(curB.replace(/[^0-9]/g, "")) || 0;
    const hasSavings = !!(curB || newB || mSave || aSave);

    /* ----- actions ----- */
    const changeCity = (city: string) => {
        setCCity(city);
        setQRef(makeRef(city));
    };

    const changeQty = (id: string, d: number, max: number) =>
        setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(max, q[id] + d)) }));

    const sendQuoteEmail = () => {
        const itemsText = rows
            .map(
                (r, i) =>
                    `${i + 1}. ${r.desc || "Item"} | Qty: ${r.q} | Unit: ${r.u > 0 ? fmtPKR(r.u) : "Included"
                    } | Total: ${r.tot > 0 ? fmtPKR(r.tot) : "Included"}`,
            )
            .join("\n");

        const params = {
            quote_ref: qRef || "N/A",
            quote_date: dateStr,
            validity: qValidity || "N/A",
            client_name: cName || "N/A",
            client_phone: cPhone || "N/A",
            client_email: cEmail || "N/A",
            client_city: cCity || "N/A",
            client_addr: cAddr || "N/A",
            client_goal: cGoal || "N/A",
            system_size: sSize || "N/A",
            system_type: sType || "N/A",
            system_desc: sDesc || "N/A",
            items_list: itemsText || "No items",
            total_amount: fmtPKR(total) === "—" ? "PKR 0" : fmtPKR(total),
            cur_bill: curB || "N/A",
            new_bill: newB || "N/A",
            monthly_save: mSave || "N/A",
            annual_save: aSave || "N/A",
            payback: pay || "N/A",
            free_years: freeY || "N/A",
            terms: terms || "N/A",
        };

        fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: EMAILJS_TEMPLATE_ID,
                user_id: EMAILJS_PUBLIC_KEY,
                template_params: params,
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error(`EmailJS request failed: ${response.status}`);
                console.log("Quote email sent ✓");
            })
            .catch((err) => console.error("EmailJS error:", err));
    };

    const doPrint = () => {
        if (!cName.trim()) {
            alert("Please enter client name before printing.");
            return;
        }
        sendQuoteEmail();
        // let React flush state before the print dialog opens
        setTimeout(() => window.print(), 50);
    };

    const resetForm = () => {
        if (!confirm("Start a new quotation? All current data will be cleared."))
            return;
        setCName(""); setCPhone(""); setCEmail(""); setCAddr(""); setCGoal("");
        setCCity("Karachi");
        setQRef(makeRef("Karachi"));
        setQValidity("12 Hours");
        setQty(initialQty()); setHrs(initialHrs()); setWatts(initialWatts());
        setSSize(""); setSType(SYSTEM_TYPES[0]); setSDesc("");
        setLines([]); setNextId(1);
        setCurB(""); setNewB(""); setMSave(""); setASave("");
        setPay(""); setFreeY(""); setTerms("");
    };

    /* ===================== RENDER ===================== */
    return (
        <div className={`sq ${sora.variable}`}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            {/* ============ SCREEN UI ============ */}
            <div className="screen-ui">
                <div className="hdr">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={LOGO} alt="Solamo Energy" />
                    <div className="hdr-r">
                        <h1>Quotation Portal</h1>
                        <p>Internal Use — Solamo Energy Team Only</p>
                    </div>
                </div>

                <div className="wrap">
                    {/* ---------- LEFT COLUMN ---------- */}
                    <div>
                        {/* CLIENT */}
                        <div className="panel">
                            <div className="ph gr">
                                <div className="ph-ic">👤</div>
                                <div>
                                    <div className="ph-t">Client Details</div>
                                    <div className="ph-s">Enter customer information</div>
                                </div>
                            </div>
                            <div className="pb">
                                <div className="row2">
                                    <div className="fg">
                                        <label>Client Name *</label>
                                        <input type="text" placeholder="Muhammad Ali" value={cName} onChange={(e) => setCName(e.target.value)} />
                                    </div>
                                    <div className="fg">
                                        <label>Phone / WhatsApp *</label>
                                        <input type="tel" placeholder="+92 300 0000000" value={cPhone} onChange={(e) => setCPhone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row2">
                                    <div className="fg">
                                        <label>Email</label>
                                        <input type="email" placeholder="email@domain.com" value={cEmail} onChange={(e) => setCEmail(e.target.value)} />
                                    </div>
                                    <div className="fg">
                                        <label>City</label>
                                        <select value={cCity} onChange={(e) => changeCity(e.target.value)}>
                                            <option>Karachi</option>
                                            <option>Lahore</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="fg">
                                    <label>Area / Address</label>
                                    <input type="text" placeholder="DHA Phase 5, Karachi" value={cAddr} onChange={(e) => setCAddr(e.target.value)} />
                                </div>
                                <div className="fg">
                                    <label>Client Goal / Note (optional)</label>
                                    <input type="text" placeholder="e.g. Bill Reduction + 8-Hour Battery Backup" value={cGoal} onChange={(e) => setCGoal(e.target.value)} />
                                </div>
                                <div className="row2">
                                    <div className="fg">
                                        <label>Quote Reference 🔒</label>
                                        <input type="text" readOnly tabIndex={-1} value={qRef} />
                                    </div>
                                    <div className="fg">
                                        <label>Validity ⏱</label>
                                        <select value={qValidity} onChange={(e) => setQValidity(e.target.value)}>
                                            {VALIDITY.map((v) => (
                                                <option key={v} value={v}>{v}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* APPLIANCES */}
                        <div className="panel">
                            <div className="ph nv">
                                <div className="ph-ic">🔌</div>
                                <div>
                                    <div className="ph-t">Appliance Load Calculator</div>
                                    <div className="ph-s">Auto-calculates recommended system size</div>
                                </div>
                            </div>
                            <div className="pb">
                                <div className="app-grid">
                                    {APPS.map((a) => (
                                        <div key={a.id} className={`app-card${qty[a.id] > 0 ? " on" : ""}`}>
                                            <div className="at">
                                                <div className="ae">{a.emoji}</div>
                                                <div>
                                                    <div className="an">{a.name}</div>
                                                    <div className="aw">
                                                        <input
                                                            type="number"
                                                            className="w-input"
                                                            min={1}
                                                            max={10000}
                                                            value={watts[a.id]}
                                                            onChange={(e) =>
                                                                setWatts((w) => ({
                                                                    ...w,
                                                                    [a.id]: Math.max(1, parseInt(e.target.value) || a.w),
                                                                }))
                                                            }
                                                        />
                                                        W
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ac">
                                                <div>
                                                    <label>Qty</label>
                                                    <div className="ctr">
                                                        <button type="button" className="cb" onClick={() => changeQty(a.id, -1, a.max)}>−</button>
                                                        <div className="cv">{qty[a.id]}</div>
                                                        <button type="button" className="cb" onClick={() => changeQty(a.id, 1, a.max)}>+</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label>Hrs/Day</label>
                                                    <select
                                                        className="hsl"
                                                        value={hrs[a.id]}
                                                        onChange={(e) => setHrs((h) => ({ ...h, [a.id]: parseFloat(e.target.value) }))}
                                                    >
                                                        {a.hrs.map((h) => (
                                                            <option key={h} value={h}>{h}h</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="kt">{kwhOf(a.id).toFixed(2)} kWh/day</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="live">
                                    <div className="ls">
                                        <div className="ls-l">Daily Usage</div>
                                        <div className="ls-v">{totalKwh.toFixed(1)}</div>
                                        <div className="ls-u">kWh/day</div>
                                    </div>
                                    <div className="ls">
                                        <div className="ls-l">Monthly Units</div>
                                        <div className="ls-v">{Math.round(monthlyUnits)}</div>
                                        <div className="ls-u">units/mo</div>
                                    </div>
                                    <div className="ls">
                                        <div className="ls-l">Est. Bill</div>
                                        <div className="ls-v">{Math.round(estBill).toLocaleString()}</div>
                                        <div className="ls-u">PKR/mo</div>
                                    </div>
                                    <div className="ls">
                                        <div className="ls-l">System Size</div>
                                        <div className="ls-v">{recKw > 0 ? `${recKw}kW` : "—"}</div>
                                        <div className="ls-u">recommended</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SYSTEM */}
                        <div className="panel">
                            <div className="ph or">
                                <div className="ph-ic">☀️</div>
                                <div>
                                    <div className="ph-t">System Details</div>
                                    <div className="ph-s">Shown in quotation header</div>
                                </div>
                            </div>
                            <div className="pb">
                                <div className="row2">
                                    <div className="fg">
                                        <label>System Size</label>
                                        <input type="text" placeholder="5kW" value={sSize} onChange={(e) => setSSize(e.target.value)} />
                                    </div>
                                    <div className="fg">
                                        <label>System Type</label>
                                        <select value={sType} onChange={(e) => setSType(e.target.value)}>
                                            {SYSTEM_TYPES.map((t) => (
                                                <option key={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="fg">
                                    <label>System Description (shown on quote)</label>
                                    <input
                                        type="text"
                                        placeholder="3kW Hybrid covers full daytime load with 5kWh battery providing 8-hour backup for fans, lights and fridge"
                                        value={sDesc}
                                        onChange={(e) => setSDesc(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* LINE ITEMS */}
                        <div className="panel">
                            <div className="ph nv">
                                <div className="ph-ic">📋</div>
                                <div>
                                    <div className="ph-t">Pricing Line Items</div>
                                    <div className="ph-s">Add, remove, and edit all cost items freely</div>
                                </div>
                            </div>
                            <div className="pb">
                                <div className="note">
                                    Har item manually enter karein. Description, Qty, aur Unit Price
                                    daalein — Total auto-calculate hoga.
                                </div>
                                <table className="li-table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th style={{ width: "10%", textAlign: "center" }}>Qty</th>
                                            <th style={{ width: "22%", textAlign: "right" }}>Unit Price (PKR)</th>
                                            <th style={{ width: "20%", textAlign: "right" }}>Total (PKR)</th>
                                            <th style={{ width: 36 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((r) => (
                                            <tr key={r.id}>
                                                <td className="td-desc">
                                                    <input type="text" placeholder="Item description..." value={r.desc} onChange={(e) => updateLine(r.id, { desc: e.target.value })} />
                                                </td>
                                                <td className="td-qty">
                                                    <input type="number" min={0} value={r.qty} onChange={(e) => updateLine(r.id, { qty: e.target.value })} />
                                                </td>
                                                <td className="td-up">
                                                    <input type="number" min={0} placeholder="0" value={r.up} onChange={(e) => updateLine(r.id, { up: e.target.value })} />
                                                </td>
                                                <td className="td-tot">
                                                    <span className="td-tot-val">{r.tot > 0 ? fmtPKR(r.tot) : "—"}</span>
                                                </td>
                                                <td className="td-del">
                                                    <button type="button" className="del-btn" title="Remove" onClick={() => delRow(r.id)}>✕</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button type="button" className="add-row-btn" onClick={addRow}>➕ Add Item</button>
                                <div className="tot-bar">
                                    <span>TOTAL INVESTMENT</span>
                                    <span>{total > 0 ? fmtPKR(total) : "PKR 0"}</span>
                                </div>

                                <div className="slabel">Savings &amp; ROI</div>
                                <div className="row2">
                                    <div className="fg">
                                        <label>Current Monthly Bill</label>
                                        <input type="text" placeholder="PKR 30,000" value={curB} onChange={(e) => setCurB(e.target.value)} />
                                    </div>
                                    <div className="fg">
                                        <label>New Bill After Solar</label>
                                        <input type="text" placeholder="PKR 2,500" value={newB} onChange={(e) => setNewB(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row2">
                                    <div className="fg">
                                        <label>Monthly Savings</label>
                                        <input type="text" placeholder="PKR 27,500" value={mSave} onChange={(e) => setMSave(e.target.value)} />
                                    </div>
                                    <div className="fg">
                                        <label>Annual Savings</label>
                                        <input type="text" placeholder="PKR 3,30,000" value={aSave} onChange={(e) => setASave(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row2">
                                    <div className="fg">
                                        <label>Payback Period</label>
                                        <input type="text" placeholder="~2.5 Years" value={pay} onChange={(e) => setPay(e.target.value)} />
                                    </div>
                                    <div className="fg">
                                        <label>Free Electricity (Years)</label>
                                        <input type="text" placeholder="22+ Years" value={freeY} onChange={(e) => setFreeY(e.target.value)} />
                                    </div>
                                </div>

                                <div className="slabel">Terms &amp; Notes (optional)</div>
                                <div className="fg">
                                    <textarea
                                        style={{ height: 80 }}
                                        placeholder="e.g. Prices valid for 12 Hours. Installation includes all labour. WAPDA/HESCO net metering application included."
                                        value={terms}
                                        onChange={(e) => setTerms(e.target.value)}
                                    />
                                </div>

                                <div className="brow">
                                    <button type="button" className="btn btn-o" onClick={doPrint}>
                                        🖨️ Print / Save PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------- RIGHT: LIVE PREVIEW ---------- */}
                    <div className="prev-wrap">
                        <div className="prev-label">👁️ Live Quotation Preview</div>
                        <div className="pv">
                            <div className="pv-head">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={LOGO} alt="Solamo" />
                                <div className="pv-head-r">
                                    <div className="pv-title">SOLAR SYSTEM QUOTATION</div>
                                    <div className="pv-ref">Ref: {qRef} | Date: {dateStr}</div>
                                    <div className="pv-valid">Valid For: {qValidity}</div>
                                </div>
                            </div>
                            <div className="pv-accent" />
                            <div className="pv-body">
                                <div className="pv-two">
                                    <div className="pv-box">
                                        <div className="pv-box-l">PREPARED FOR</div>
                                        <div className="pv-box-n">{cName || "Client Name"}</div>
                                        <div className="pv-row">📞 {cPhone || "Phone Number"}</div>
                                        <div className="pv-row">✉️ {cEmail || "Email Address"}</div>
                                        <div className="pv-row">📍 {cAddr || "Address"}, {cCity}</div>
                                        {cGoal && <div className="pv-row">🎯 {cGoal}</div>}
                                    </div>
                                    <div className="pv-box">
                                        <div className="pv-box-l">PREPARED BY</div>
                                        <div className="pv-box-n">Solamo Energy</div>
                                        <div className="pv-row">📞 +92 314 1349717</div>
                                        <div className="pv-row">✉️ info@solamoenergy.com</div>
                                        <div className="pv-row">🌐 solamoenergy.com</div>
                                        <div className="pv-row">📍 Karachi | Lahore, Pakistan</div>
                                    </div>
                                </div>

                                <div className="pv-sys">
                                    <div className="pv-sys-t">{sysTitle}</div>
                                    <div className="pv-sys-d">{descFull || "System description"}</div>
                                </div>

                                <div className="pv-sec">2. Equipment Specification</div>
                                <table className="pv-table">
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: "center", width: 18 }}>#</th>
                                            <th style={{ textAlign: "left" }}>Component</th>
                                            <th style={{ textAlign: "center" }}>Qty</th>
                                            <th style={{ textAlign: "right" }}>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.length === 0 && (
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: "center", color: "#aaa", padding: 10 }}>
                                                    No items added yet
                                                </td>
                                            </tr>
                                        )}
                                        {rows.map((r, i) => (
                                            <tr key={r.id} style={i % 2 === 1 ? { background: "#f1f8e9" } : undefined}>
                                                <td style={{ textAlign: "center", color: "#546e7a" }}>{i + 1}</td>
                                                <td>{r.desc || "Item"}</td>
                                                <td style={{ textAlign: "center" }}>{r.q}</td>
                                                <td style={{ textAlign: "right", fontWeight: 600 }}>
                                                    {r.tot > 0 ? fmtPKR(r.tot) : r.u > 0 ? fmtPKR(r.u) : "Included"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2} className="pv-tf-l">TOTAL INVESTMENT</td>
                                            <td colSpan={2} className="pv-tf-r">{total > 0 ? fmtPKR(total) : "PKR 0"}</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <div className="pv-two">
                                    <div className="pv-sav red">
                                        <div className="pv-sav-t red">❌ Without Solar</div>
                                        <div className="pv-row">Current Bill: <b className="red">{curB || "—"}</b></div>
                                        <div className="pv-row">Annual Cost: <b className="red">{curNum > 0 ? fmtPKR(curNum * 12) : "—"}</b></div>
                                    </div>
                                    <div className="pv-sav green">
                                        <div className="pv-sav-t green">✅ With Solamo Solar</div>
                                        <div className="pv-row">New Bill: <b className="green">{newB || "—"}</b></div>
                                        <div className="pv-row">Monthly Saving: <b className="green">{mSave || "—"}</b></div>
                                        <div className="pv-row">Annual Saving: <b className="green">{aSave || "—"}</b></div>
                                    </div>
                                </div>
                            </div>
                            <div className="pv-foot">
                                <p>+92 314 1349717 &nbsp;|&nbsp; info@solamoenergy.com &nbsp;|&nbsp; solamoenergy.com &nbsp;|&nbsp; Karachi &nbsp;|&nbsp; Lahore</p>
                                <p className="tag">Built for Pakistan. Powered by the Sun.</p>
                            </div>
                        </div>
                        <div className="psec">
                            <button type="button" className="btn btn-g" style={{ flex: 1 }} onClick={doPrint}>
                                🖨️ Print Quotation
                            </button>
                            <button type="button" className="btn btn-o" style={{ flex: 1 }} onClick={resetForm}>
                                🔄 New Quotation
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ PRINT DOCUMENT (visible only when printing) ============ */}
            <div id="printDoc">
                <div className="pd-header">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={LOGO} alt="Solamo Energy" />
                    <div className="pd-header-right">
                        <div className="title">Solar System Quotation</div>
                        <div className="meta">Quote Ref: {qRef} &nbsp;|&nbsp; Date: {dateStr}</div>
                        <div className="valid">Valid For: {qValidity}</div>
                    </div>
                </div>
                <div className="pd-accent" />

                <div className="pd-body">
                    <div className="pd-two-col">
                        <div className="pd-box">
                            <div className="pd-box-label">Prepared For</div>
                            <div className="pd-box-name">{cName || "Client Name"}</div>
                            {cPhone && <div className="pd-box-row"><span>📞</span><span>{cPhone}</span></div>}
                            {cEmail && <div className="pd-box-row"><span>✉️</span><span>{cEmail}</span></div>}
                            <div className="pd-box-row"><span>📍</span><span>{cAddr ? `${cAddr}, ${cCity}` : cCity}</span></div>
                            {cGoal && <div className="pd-box-row"><span>🎯</span><span>{cGoal}</span></div>}
                        </div>
                        <div className="pd-box">
                            <div className="pd-box-label">Prepared By</div>
                            <div className="pd-box-name">Solamo Energy</div>
                            <div className="pd-box-row"><span>📞</span><span>+92 314 1349717</span></div>
                            <div className="pd-box-row"><span>✉️</span><span>info@solamoenergy.com</span></div>
                            <div className="pd-box-row"><span>🌐</span><span>solamoenergy.com</span></div>
                            <div className="pd-box-row"><span>📍</span><span>Karachi | Lahore, Pakistan</span></div>
                        </div>
                    </div>

                    <div className="pd-sys-banner">
                        <div className="sys-title">{sysTitle}</div>
                        {descFull && <div className="sys-sub">{descFull}</div>}
                    </div>

                    <div className="pd-section-label">2. Equipment Specification</div>
                    <table className="pd-table">
                        <thead>
                            <tr>
                                <th style={{ width: "20pt", textAlign: "center" }}>#</th>
                                <th>Component</th>
                                <th className="center" style={{ width: "50pt" }}>Quantity</th>
                                <th className="right" style={{ width: "90pt" }}>Unit Price</th>
                                <th className="right" style={{ width: "90pt" }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", color: "#aaa", padding: "10pt" }}>
                                        No items added
                                    </td>
                                </tr>
                            )}
                            {rows.map((r, i) => (
                                <tr key={r.id}>
                                    <td style={{ textAlign: "center", color: "#546e7a" }}>{i + 1}</td>
                                    <td>{r.desc || "Item"}</td>
                                    <td style={{ textAlign: "center" }}>{r.q}</td>
                                    <td style={{ textAlign: "right" }}>{r.u > 0 ? fmtPKR(r.u) : "Included"}</td>
                                    <td style={{ textAlign: "right", fontWeight: 700 }}>{r.tot > 0 ? fmtPKR(r.tot) : "Included"}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>TOTAL INVESTMENT</td>
                                <td className="right">{total > 0 ? fmtPKR(total) : "PKR 0"}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="pd-price-note">
                        * Prices may vary slightly based on site assessment. All prices include professional installation.
                    </div>

                    {hasSavings && (
                        <>
                            <div className="pd-section-label">3. Financial Analysis</div>
                            <div className="pd-savings-grid">
                                <div className="pd-sav-box red">
                                    <div className="pd-sav-title red">❌ Without Solar (Current)</div>
                                    <div className="pd-sav-row">Current Monthly Bill: <span className="red">{curB || "—"}</span></div>
                                    <div className="pd-sav-row">Annual Electricity Cost: <span className="red">{curNum > 0 ? fmtPKR(curNum * 12) : "—"}</span></div>
                                </div>
                                <div className="pd-sav-box green">
                                    <div className="pd-sav-title green">✅ With Solamo Solar</div>
                                    <div className="pd-sav-row">New Bill After Solar: <span className="green">{newB || "—"}</span></div>
                                    <div className="pd-sav-row">Monthly Saving: <span className="green">{mSave || "—"}</span></div>
                                    <div className="pd-sav-row">Annual Saving: <span className="green">{aSave || "—"}</span></div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="pd-footer">
                    <p>+92 314 1349717 &nbsp;|&nbsp; info@solamoenergy.com &nbsp;|&nbsp; solamoenergy.com &nbsp;|&nbsp; Karachi &nbsp;|&nbsp; Lahore</p>
                    <div className="tagline">Built for Pakistan. Powered by the Sun.</div>
                </div>
            </div>
        </div>
    );
}