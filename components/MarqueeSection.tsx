import React from "react";

export default function MarqueeSection() {
  const items = [
    "Book Free Consultation — Call or WhatsApp us. Our expert visits your site at no charge.",
    "Get Your Custom Plan — We assess your energy needs and design the perfect solar system.",
    "Professional Installation — Our certified team installs your system quickly and safely.",
    "Start Saving — Your system goes live. Watch your electricity bills drop from month one.",
  ];

  return (
    <div className="bg-[#79B900] text-white py-10 md:py-12 overflow-hidden whitespace-nowrap shadow-inner flex items-center">
      <div className="animate-marquee flex items-center gap-12 text-2xl md:text-3xl font-semibold tracking-wide">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span>{text}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-white inline-block shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
