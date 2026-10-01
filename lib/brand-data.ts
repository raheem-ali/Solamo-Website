export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  category: "Batteries" | "Inverters" | "Power Bank" | "Solar Panel";
  description?: string;
}

export interface BrandData {
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  image?: string;
  noindex?: boolean;
  products: Product[];
}

export const brandsData: Record<string, BrandData> = {
  aiko: {
    name: "AIKO",
    slug: "aiko",
    description:
      "High-efficiency N-type ABC solar technology delivering superior performance and elegant aesthetics.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/16.png",
    products: [
      {
        id: "aiko-665watt",
        name: "AIKO 665WATT",
        price: 28800,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/aiko/aiko-665watt/",
        category: "Solar Panel",
        description: "High-efficiency AIKO N-type ABC solar panel.",
      },
      {
        id: "aiko-bf-590",
        name: "Aiko BF 590",
        price: 22900,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-2.webp",
        link: "https://solamoenergy.com/shop/aiko/aiko-bf-590/",
        category: "Solar Panel",
        description: "Bifacial AIKO solar module with high low-light output.",
      },
      {
        id: "aiko-bf-640w",
        name: "Aiko BF 640W",
        price: 27800,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-3.webp",
        link: "https://solamoenergy.com/shop/aiko/aiko-bf-640w/",
        category: "Solar Panel",
        description:
          "High-wattage bifacial AIKO panel for commercial/residential.",
      },
    ],
  },
  astronergy: {
    name: "Astronergy",
    slug: "astronergy",
    description:
      "High-efficiency Tier-1 solar modules engineered to perform exceptionally in low light.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/15-1.png",
    products: [
      {
        id: "aestro-energy-575watt",
        name: "AESTRO ENERGY 575WATT",
        price: 21500,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-8.webp",
        link: "https://solamoenergy.com/shop/astronergy/aestro-energy-575watt/",
        category: "Solar Panel",
        description:
          "Astro Energy 575W N-Type TOPCon dual-glass solar panel features 22.3% efficiency, bifacial yield, and 30-year warranty.",
      },
      {
        id: "astro-585w",
        name: "Astronergy Astro 585W",
        price: 23700,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-11-1-2.webp",
        link: "https://solamoenergy.com/shop/astronergy/astro-585w/",
        category: "Solar Panel",
        description:
          "High-efficiency Astronergy Astro 585W N-type TOPCon bifacial solar panel engineered for maximum dual-sided power yield.",
      },
      {
        id: "astronergy-astro-590w-16bb",
        name: "Astronergy Astro 590W 16BB",
        price: 23900,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-13-1.webp",
        link: "https://solamoenergy.com/shop/astronergy/astronergy-astro-590w-16bb/",
        category: "Solar Panel",
        description:
          "High-efficiency Astronergy Astro 590W 16BB N-type TOPCon panel engineered for maximum dual-sided power output.",
      },
      {
        id: "astronergy-astro-620w",
        name: "Astronergy Astro 620W",
        price: 24700,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-14-1.webp",
        link: "https://solamoenergy.com/shop/astronergy/astronergy-astro-620w/",
        category: "Solar Panel",
        description:
          "High-efficiency Astronergy Astro 620W N-type TOPCon bifacial solar panel engineered for maximum dual-sided power yield.",
      },
      {
        id: "astronergy-astro-715w",
        name: "Astronergy Astro 715W",
        price: 28400,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-15-1.webp",
        link: "https://solamoenergy.com/shop/astronergy/astronergy-astro-715w/",
        category: "Solar Panel",
        description:
          "High-efficiency Astronergy Astro 715W N-type TOPCon bifacial solar panel engineered for ultra-high dual-sided power yield.",
      },
      {
        id: "astronergy-astro-720w",
        name: "Astronergy Astro 720W",
        price: 28600,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-16.webp",
        link: "https://solamoenergy.com/shop/astronergy/astronergy-astro-720w/",
        category: "Solar Panel",
        description:
          "High-efficiency Astronergy Astro 720W N-type TOPCon bifacial solar panel engineered for maximum dual-sided power yield.",
      },
    ],
  },
  dyness: {
    name: "Dyness",
    slug: "dyness",
    description:
      "Compact, modular lithium storage solutions that integrate seamlessly with top inverters.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/7.png",
    products: [
      {
        id: "dyness-16kw-ip21-lcd",
        name: "DYNESS 16KW IP21 LCD",
        price: 626000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-14.webp",
        link: "https://solamoenergy.com/shop/dyness/dyness-16kw-ip21-lcd/",
        category: "Batteries",
        description:
          "DYNESS 16KW IP21 LCD LiFePO4 battery delivers 16kWh indoor lithium storage with live display monitoring.",
      },
      {
        id: "dyness-16kw-ip65",
        name: "DYNESS 16KW IP65",
        price: 671000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-11-1-1.webp",
        link: "https://solamoenergy.com/shop/dyness/dyness-16kw-ip65/",
        category: "Batteries",
        description:
          "DYNESS 16KW IP65 LiFePO4 battery delivers 16kWh weatherproof lithium storage for high capacity power backup.",
      },
      {
        id: "dyness-24v-100ah",
        name: "DYNESS 24v 100Ah",
        price: 136000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-6.webp",
        link: "https://solamoenergy.com/shop/dyness/dyness-24v-100ah/",
        category: "Batteries",
        description:
          "Dyness 24V 100Ah LiFePO4 lithium battery offers 2.56kWh storage, 6000+ cycles, and smart BMS.",
      },
      {
        id: "dyness-5kw-51v-100ah-lithium",
        name: "DYNESS 5KW 51v 100Ah LITHIUM",
        price: 236000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/dyness/dyness-5kw-51v-100ah-lithium/",
        category: "Batteries",
        description:
          "Dyness 5kW 51.2V 100Ah LiFePO4 lithium solar battery features 6000+ cycles and smart BMS protection.",
      },
    ],
  },
  "canadian-solar": {
    name: "Canadian Solar",
    slug: "canadian-solar",
    description:
      "Top-tier, premium-engineered solar panels offering an excellent balance of cost and performance.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/19.png",
    products: [
      {
        id: "canadian-585w",
        name: "Canadian 585W",
        price: 25070,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1-4.webp",
        link: "https://solamoenergy.com/shop/canadian-solar/canadian-585w/",
        category: "Solar Panel",
        description:
          "High-efficiency Canadian Solar 585W N-type TOPCon panel engineered for high output and heat resistance.",
      },
      {
        id: "canadian-615w",
        name: "Canadian 615w",
        price: 26950,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-3-2.webp",
        link: "https://solamoenergy.com/shop/canadian-solar/canadian-615w/",
        category: "Solar Panel",
        description:
          "High-efficiency Canadian Solar 615W N-type TOPCon bifacial panel engineered for high output and heat resistance.",
      },
      {
        id: "canadian-620w",
        name: "Canadian 620w",
        price: 26750,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-5-1.webp",
        link: "https://solamoenergy.com/shop/canadian-solar/canadian-620w/",
        category: "Solar Panel",
        description:
          "High-efficiency Canadian Solar 620W N-type TOPCon bifacial panel engineered for high output and heat resistance.",
      },
      {
        id: "canadian-625w",
        name: "Canadian 625w",
        price: 26750,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-4-1.webp",
        link: "https://solamoenergy.com/shop/canadian-solar/canadian-625w/",
        category: "Solar Panel",
        description:
          "High-efficiency Canadian Solar 625W N-type TOPCon bifacial panel engineered for maximum output and heat tolerance.",
      },
      {
        id: "canadian-710w",
        name: "Canadian 710w",
        price: 29600,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-6-2.webp",
        link: "https://solamoenergy.com/shop/canadian-solar/canadian-710w/",
        category: "Solar Panel",
        description:
          "High-efficiency Canadian Solar 710W N-type TOPCon bifacial panel engineered for ultra-high power output and heat performance.",
      },
      {
        id: "canadian-715w",
        name: "Canadian 715w",
        price: 29800,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-8-2.webp",
        link: "https://solamoenergy.com/shop/canadian-solar/canadian-715w/",
        category: "Solar Panel",
        description:
          "High-efficiency Canadian Solar 715W N-type TOPCon bifacial panel engineered for ultra-high output and heat performance.",
      },
    ],
  },
  "genix-green": {
    name: "Genix Green",
    slug: "genix-green",
    description:
      "Smart energy storage systems specializing in high-safety residential lithium batteries.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/6.png",
    products: [
      {
        id: "genix-green-24v-100ah",
        name: "GENIX GREEN 24v 100Ah",
        price: 126000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-7.webp",
        link: "https://solamoenergy.com/shop/genix-green/genix-green-24v-100ah/",
        category: "Batteries",
        description:
          "Genix Green 24V 100Ah LiFePO4 lithium battery offers 2.56kWh storage, 4000+ cycles, and smart BMS.",
      },
      {
        id: "genix-green-51v-100ah",
        name: "GENIX GREEN 51V 100Ah",
        price: 223000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1-1.webp",
        link: "https://solamoenergy.com/shop/genix-green/genix-green-51v-100ah/",
        category: "Batteries",
        description:
          "Genix Green 51V 100Ah LiFePO4 lithium battery offers 5.12kWh capacity, 6000+ cycles, and smart BMS.",
      },
    ],
  },
  goodwe: {
    name: "Goodwe",
    slug: "goodwe",
    description:
      "Smart, highly efficient energy storage inverters featuring advanced remote monitoring.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/11.png",
    products: [
      {
        id: "goodwe-14kw-lithium-battery",
        name: "GoodWe 14kW Lithium Battery",
        price: 697000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/goodwe/goodwe-14kw-lithium-battery/",
        category: "Batteries",
        description:
          "GoodWe 14.3kWh LiFePO4 lithium battery delivers high-capacity storage with 6,500+ cycles and smart BMS.",
      },
      {
        id: "goodwe-16kw-lithium-battery",
        name: "GoodWe 16kW Lithium Battery",
        price: 746000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/goodwe/goodwe-16kw-lithium-battery/",
        category: "Batteries",
        description:
          "GoodWe 16.1kWh 314Ah LiFePO4 battery delivers ultra-heavy-duty storage with 10,000+ cycles and IP65 rating.",
      },
    ],
  },
  osda: {
    name: "Osda",
    slug: "osda",
    description:
      "High-efficiency N-type TOPCon solar panels engineered for verified maximum power yield and dual-sided energy generation.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/08/23.png",
    products: [
      {
        id: "osda-585w-scannable",
        name: "Osda 585W Scannable",
        price: 22500,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-14-2.webp",
        link: "https://solamoenergy.com/shop/osda/osda-585w-scannable/",
        category: "Solar Panel",
        description:
          "High-efficiency OSDA 585W N-type TOPCon scannable solar panel engineered for verified maximum power yield.",
      },
      {
        id: "osda-720w",
        name: "Osda 720W",
        price: 27700,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-15-2.webp",
        link: "https://solamoenergy.com/shop/osda/osda-720w/",
        category: "Solar Panel",
        description:
          "High-efficiency OSDA 720W N-type TOPCon bifacial solar panel engineered for maximum dual-sided energy yield.",
      },
    ],
  },
  "grow-watt": {
    name: "Grow Watt",
    slug: "grow-watt",
    description:
      "Budget-friendly residential and commercial inverters offering reliable smart energy solutions.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/12.png",
    noindex: true,
    products: [],
  },
  inverex: {
    name: "Inverex",
    slug: "inverex",
    description:
      "Top-performing hybrid inverters and panels customized specifically for local climate conditions.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/9.png",
    products: [
      {
        id: "inverex-ip21-51v-100ah",
        name: "Inverex ip21 51V 100Ah",
        price: 271000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/inverex-ip21-51v-100ah/",
        category: "Batteries",
        description: "Inverex IP21 51V 100Ah lithium battery.",
      },
      {
        id: "lithium-battery-11-8kwh-48v-230amp-ip21",
        name: "Lithium Battery 11.8KWH 48v 230amp IP21",
        price: 575000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-11-8kwh-48v-230amp-ip21/",
        category: "Batteries",
        description: "High-capacity 11.8kWh IP21 lithium storage.",
      },
      {
        id: "lithium-battery-12v-100ah-ip20",
        name: "Lithium Battery 12V 100Ah IP20",
        price: 75000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-12v-100ah-ip20/",
        category: "Batteries",
        description: "IP20 12V 100Ah lithium battery.",
      },
      {
        id: "lithium-battery-12v-200ah-ip20",
        name: "Lithium Battery 12V 200Ah IP20",
        price: 160000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-12v-200ah-ip20/",
        category: "Batteries",
        description: "IP20 12V 200Ah lithium battery.",
      },
      {
        id: "lithium-battery-16kwh-48v-314amp-ip21",
        name: "Lithium Battery 16KWH 48v 314amp IP21",
        price: 750000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-16kwh-48v-314amp-ip21/",
        category: "Batteries",
        description: "Heavy-duty 16kWh 48V 314A IP21 lithium battery.",
      },
      {
        id: "lithium-battery-2-5kwh-24v-100amp-ip21",
        name: "Lithium Battery 2.5KWH 24v 100amp IP21",
        price: 184000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-2-5kwh-24v-100amp-ip21/",
        category: "Batteries",
        description: "Compact 2.5kWh 24V IP21 lithium battery.",
      },
      {
        id: "lithium-battery-2-6kwh-24v-100amp-ip65",
        name: "Lithium Battery 2.6KWH 24v 100amp IP65",
        price: 195000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-2-6kwh-24v-100amp-ip65/",
        category: "Batteries",
        description: "Weatherproof IP65 2.6kWh 24V lithium battery.",
      },
      {
        id: "lithium-battery-5-1kwh-48v-100amp-ip21",
        name: "Lithium Battery 5.1KWH 48v 100amp IP21",
        price: 270000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-5-1kwh-48v-100amp-ip21/",
        category: "Batteries",
        description: "5.1kWh 48V IP21 lithium battery.",
      },
      {
        id: "lithium-battery-5-3kwh-48v-100amp-ip65",
        name: "Lithium Battery 5.3KWH 48v 100amp IP65",
        price: 330000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/lithium-battery-5-3kwh-48v-100amp-ip65/",
        category: "Batteries",
        description: "5.3kWh 48V IP65 weatherproof lithium battery.",
      },
      {
        id: "inverex-jollywood-630w-solar-panel",
        name: "Inverex Jollywood 630W Solar Panel",
        price: 28000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/inverex-jollywood-630w-solar-panel/",
        category: "Solar Panel",
        description: "Inverex Jollywood 630W high-efficiency solar module.",
      },
      {
        id: "inverex-mustang-620w-solar-panel",
        name: "Inverex Mustang 620W Solar Panel",
        price: 26400,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/inverex-mustang-620w-solar-panel/",
        category: "Solar Panel",
        description: "Inverex Mustang 620W solar module.",
      },
      {
        id: "inverex-mustang-720w-solar-panel",
        name: "Inverex Mustang 720W Solar Panel",
        price: 31200,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/inverex-mustang-720w-solar-panel/",
        category: "Solar Panel",
        description: "Inverex Mustang 720W ultra-high power solar module.",
      },
      {
        id: "nitrox-10-kw-inverter-ip65",
        name: "NITROX 10 KW Inverter IP65",
        price: 440000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/nitrox-10-kw-inverter-ip65/",
        category: "Inverters",
        description: "Nitrox 10kW IP65 hybrid inverter.",
      },
      {
        id: "nitrox-13kw-h-3phs-inverter-ip65",
        name: "NITROX 13KW H 3PHS Inverter IP65",
        price: 775000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/nitrox-13kw-h-3phs-inverter-ip65/",
        category: "Inverters",
        description: "Nitrox 13kW 3-phase hybrid IP65 inverter.",
      },
      {
        id: "nitrox-16kw-h-3phs-inverter-ip65",
        name: "NITROX 16KW H 3PHS Inverter IP65",
        price: 950000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/nitrox-16kw-h-3phs-inverter-ip65/",
        category: "Inverters",
        description: "Nitrox 16kW 3-phase hybrid IP65 inverter.",
      },
      {
        id: "nitrox-20kw-h-3phs-inverter-ip65",
        name: "NITROX 20KW H 3PHS Inverter IP65",
        price: 1125000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/inverex/nitrox-20kw-h-3phs-inverter-ip65/",
        category: "Inverters",
        description: "Nitrox 20kW 3-phase hybrid IP65 inverter.",
      },
    ],
  },
  "ja-solar": {
    name: "JA Solar",
    slug: "ja-solar",
    description:
      "Reliable half-cell monocrystalline panels optimized to minimize internal power resistance.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/18.png",
    products: [
      {
        id: "ja-solar-565w",
        name: "JA Solar 565W",
        price: 21500,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-7-1.webp",
        link: "https://solamoenergy.com/shop/ja-solar/ja-solar-565w/",
        category: "Solar Panel",
        description:
          "JA Solar 565W half-cell mono PERC panel offers 21.9% efficiency, shade tolerance, and 25-year warranty.",
      },
      {
        id: "ja-solar-565w-2",
        name: "JA Solar 565W (2nd variant)",
        price: 21500,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-23.webp",
        link: "https://solamoenergy.com/shop/ja-solar/ja-solar-565w-2/",
        category: "Solar Panel",
        description:
          "High-efficiency JA Solar 565W Mono PERC half-cell solar panel engineered for reliable high-wattage power output.",
      },
      {
        id: "ja-solar-590w",
        name: "JA Solar 590W",
        price: 24100,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-9-2.webp",
        link: "https://solamoenergy.com/shop/ja-solar/ja-solar-590w/",
        category: "Solar Panel",
        description:
          "High-efficiency JA Solar 590W N-type TOPCon panel engineered for superior output and heat tolerance.",
      },
      {
        id: "ja-solar-bifacial-625w",
        name: "JA Solar Bifacial 625W",
        price: 25500,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-10.webp",
        link: "https://solamoenergy.com/shop/ja-solar/ja-solar-bifacial-625w/",
        category: "Solar Panel",
        description:
          "High-efficiency JA Solar 625W N-type TOPCon bifacial solar panel engineered for maximum dual-sided power yield.",
      },
    ],
  },
  huawei: {
    name: "Huawei",
    slug: "huawei",
    description:
      "Advanced string inverters leveraging cutting-edge AI diagnostics for maximum safety.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/14-1.png",
    noindex: true,
    products: [],
  },
  "jinko-solar": {
    name: "Jinko Solar",
    slug: "jinko-solar",
    description:
      "Global Tier-1 leader famous for high-yield, low-degradation solar modules.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/21.png",
    products: [
      {
        id: "jinko-585w",
        name: "Jinko 585w",
        price: 25400,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-9-1.webp",
        link: "https://solamoenergy.com/shop/jinko-solar/jinko-585w/",
        category: "Solar Panel",
        description:
          "Global Tier-1 Jinko 585W solar module featuring high yield and low degradation.",
      },
      {
        id: "jinko-655w",
        name: "Jinko 655w",
        price: 31300,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-11.webp",
        link: "https://solamoenergy.com/shop/jinko-solar/jinko-655w/",
        category: "Solar Panel",
        description: "High-wattage Jinko 655W high-yield solar module.",
      },
      {
        id: "jinko-bf-645w",
        name: "Jinko BF 645w 3.0",
        price: 27350,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-10-1.webp",
        link: "https://solamoenergy.com/shop/jinko-solar/jinko-bf-645w/",
        category: "Solar Panel",
        description:
          "Bifacial Jinko BF 645W 3.0 dual-sided power generation module.",
      },
    ],
  },
  osaka: {
    name: "Osaka",
    slug: "osaka",
    description:
      "Dependable, long-lasting deep-cycle and lithium batteries tailored for steady solar backup.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/1-1.png",
    noindex: true,
    products: [],
  },
  pylontech: {
    name: "PylonTech",
    slug: "pylontech",
    description:
      "Industry-leading modular lithium batteries designed for highly scalable backup setups.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/8-1.png",
    noindex: true,
    products: [],
  },
  longi: {
    name: "LONGi",
    slug: "longi",
    description:
      "Market-leading pioneer in high-efficiency monocrystalline silicon panel technology.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/20.png",
    products: [
      {
        id: "longi-645watt",
        name: "LONGI 645WATT",
        price: 27300,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-6-1.webp",
        link: "https://solamoenergy.com/shop/longi/longi-645watt/",
        category: "Solar Panel",
        description: "LONGi high-efficiency 645W solar module.",
      },
      {
        id: "longi-hi-mo-x10-645w",
        name: "LONGi Hi-MO X10 645W",
        price: 27900,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-18.webp",
        link: "https://solamoenergy.com/shop/longi/longi-hi-mo-x10-645w/",
        category: "Solar Panel",
        description: "LONGi Hi-MO X10 645W high-efficiency solar module.",
      },
    ],
  },
  "tcl-solar": {
    name: "TCL Solar",
    slug: "tcl-solar",
    description:
      "High-efficiency N-type TOPCon bifacial solar panels engineered for maximum dual-glass energy yield.",
    bannerImage:
      "https://solamoenergy.com/wp-content/uploads/2026/07/default-banner.png", // Aap apne hisab se banner update kar sakte hain
    products: [
      {
        id: "tcl-615w-n-type-bifacial-solar-panel",
        name: "TCL 615W N-Type Bifacial Solar Panel",
        price: 25100,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-19-2.webp",
        link: "https://solamoenergy.com/shop/tcl-solar/tcl-615w-tcl-615w-n-type-bifacial-solar-panel/",
        category: "Solar Panel",
        description:
          "High-efficiency TCL 615W N-type TOPCon bifacial solar panel engineered for maximum dual-glass energy yield.",
      },
      {
        id: "tcl-620w-n-type-bifacial-solar-panel",
        name: "TCL 620W N-Type Bifacial Solar Panel",
        price: 25300,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-21.webp",
        link: "https://solamoenergy.com/shop/tcl-solar/tcl-620w-n-type-bifacial-solar-panel/",
        category: "Solar Panel",
        description:
          "High-efficiency TCL 620W N-type TOPCon bifacial solar panel engineered for maximum dual-glass energy yield.",
      },
    ],
  },
  "trina-solar": {
    name: "Trina Solar",
    slug: "trina-solar",
    description:
      "Massive Tier-1 manufacturer delivering ultra-high-power modules built for mechanical reliability.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/17.png",
    products: [
      {
        id: "trina-620w",
        name: "Trina 620W",
        price: 24900,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-17-1.webp",
        link: "https://solamoenergy.com/shop/trina-solar/trina-620w/",
        category: "Solar Panel",
        description:
          "High-efficiency Trina Vertex N 620W N-type i-TOPCon solar panel engineered for maximum dual-sided energy yield.",
      },
      {
        id: "trina-630w",
        name: "Trina 630W",
        price: 25450,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-18-1.webp",
        link: "https://solamoenergy.com/shop/trina-solar/trina-630w/",
        category: "Solar Panel",
        description:
          "High-efficiency Trina Vertex N 630W N-type i-TOPCon solar panel engineered for maximum dual-sided energy yield.",
      },
      {
        id: "trina-720w",
        name: "Trina 720W",
        price: 0,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/trina-solar/trina-720w/",
        category: "Solar Panel",
        description:
          "High performance Trina Vertex N 720W N-type TOPCon bifacial solar panel engineered for maximum energy yield.",
      },
      {
        id: "trina-725w",
        name: "Trina 725W",
        price: 0,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/trina-solar/trina-725w/",
        category: "Solar Panel",
        description:
          "High performance Trina Vertex N 725W N-type TOPCon bifacial solar panel engineered for maximum energy yield.",
      },
    ],
  },
  volnex: {
    name: "Volnex",
    slug: "volnex",
    description:
      "Next-generation energy storage solutions and weatherproof lithium batteries.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/08/29.png",
    products: [
      {
        id: "volnex-ip65-51-2v-100ah",
        name: "VOLNEX IP65 51.2V 100Ah",
        price: 260500,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1-2.webp",
        link: "https://solamoenergy.com/shop/volnex/volnex-ip65-51-2v-100ah/",
        category: "Batteries",
        description:
          "Volnex IP65 51.2V 100Ah weatherproof lithium battery offers 5.12kWh storage, 6000+ cycles, and smart BMS.",
      },
    ],
  },
  "cn-green": {
    name: "CN Green",
    slug: "cn-green",
    description:
      "Utility-scale high-output photovoltaic modules built for extreme weather and maximum durability.",
    bannerImage: "",
    products: [
      {
        id: "cn-green-16kw",
        name: "CN GREEN 16kW",
        price: 555000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-3-1.webp",
        link: "https://solamoenergy.com/shop/cn-green/cn-green-16kw/",
        category: "Batteries",
        description:
          "CN Green 16kW (16.08kWh) 314Ah LiFePO4 battery features smart BMS, 6000+ cycles, and 200A fast discharge.",
      },
    ],
  },
  "cora-dawn": {
    name: "Cora Dawn",
    slug: "cora-dawn",
    description:
      "Elegant residential smart-roof panels blending seamless home architecture with energy yields.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/08/24.png",
    products: [
      {
        id: "cora-dawn-615w",
        name: "Cora Dawn 615W",
        price: 23700,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/cora-dawn/cora-dawn-615w/",
        category: "Solar Panel",
        description: "Elegant residential smart-roof panel with 615W output.",
      },
      {
        id: "cora-dawn-645w",
        name: "Cora Dawn 645W",
        price: 25000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/cora-dawn/cora-dawn-645w/",
        category: "Solar Panel",
        description: "Elegant residential smart-roof panel with 645W output.",
      },
      {
        id: "cora-dawn-655w",
        name: "Cora Dawn 655W",
        price: 25400,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-1.webp",
        link: "https://solamoenergy.com/shop/cora-dawn/cora-dawn-655w/",
        category: "Solar Panel",
        description: "Elegant residential smart-roof panel with 655W output.",
      },
    ],
  },
  solis: {
    name: "Solis",
    slug: "solis",
    description:
      "Leading manufacturer of high-efficiency solar and energy storage inverters.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/10.png",
    products: [],
  },
  sungrow: {
    name: "Sungrow",
    slug: "sungrow",
    description:
      "Heavy-duty, ultra-reliable hybrid inverters built for exceptional long-term durability.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/07/13.png",
    products: [],
  },
  sunsynk: {
    name: "Sunsynk",
    slug: "sunsynk",
    description:
      "Smart, highly efficient energy storage inverters featuring advanced remote monitoring.",
    bannerImage:
      "https://solamoenergy.com/wp-content/uploads/2026/08/Solamo-Ecommerce-Brands-logo.png",
    products: [
      {
        id: "all-in-one-2-5kw-hybrid-inverter-with-2kwh-lithium-battery-ip20",
        name: "All-in-One 2.5kW Hybrid Inverter with 2kWh Lithium Battery (IP20)",
        price: 250000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-21-1.webp",
        link: "https://solamoenergy.com/shop/sunsynk/all-in-one-2-5kw-hybrid-inverter-with-2kwh-lithium-battery-ip20/",
        category: "Inverters",
        description:
          "All-in-one LifeLynk S 2.5kW hybrid inverter with 2kWh LiFePO4 battery and built-in MPPT charger.",
      },
      {
        id: "all-in-one-xls-6kw-hybrid-inverter-with-5-1kwh-lithium-battery-ip40",
        name: "All-in-One XLS 6kW Hybrid Inverter with 5.1kWh Lithium Battery (IP40)",
        price: 495000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-23-1.webp",
        link: "https://solamoenergy.com/shop/sunsynk/all-in-one-xls-6kw-hybrid-inverter-with-5-1kwh-lithium-battery-ip40/",
        category: "Inverters",
        description:
          "All-in-one XLS 6kW hybrid inverter with 5.1kWh LiFePO4 battery and dual MPPT solar charger.",
      },
      {
        id: "all-in-one-xls-8kw-hybrid-inverter-with-5-1kwh-lithium-battery-ip40",
        name: "All-in-One XLS 8kW Hybrid Inverter with 5.1kWh Lithium Battery (IP40)",
        price: 495000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-24.webp",
        link: "https://solamoenergy.com/shop/sunsynk/all-in-one-xls-8kw-hybrid-inverter-with-5-1kwh-lithium-battery-ip40/",
        category: "Inverters",
        description:
          "All-in-one XLS 8kW hybrid inverter with 5.1kWh LiFePO4 battery and dual MPPT solar charger.",
      },
      {
        id: "sunsynk-contour-2000-1kw-inverter-with-2kwh-lithium-battery-ip20",
        name: "Sunsynk Contour 2000 1kW Inverter with 2kWh Lithium Battery (IP20)",
        price: 150000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-20-1-1-1.webp",
        link: "https://solamoenergy.com/shop/sunsynk/sunsynk-contour-2000-1kw-inverter-with-2kwh-lithium-battery-ip20/",
        category: "Inverters",
        description:
          "All-in-one Sunsynk Contour 2000 IP20 portable trolley with 1kW inverter and 2kWh LiFePO4 battery.",
      },
      {
        id: "sunsynk-lifelynk-lynks-6kw-hybrid-inverter-ip41",
        name: "Sunsynk LifeLynk Lynks 6kW Hybrid Inverter (IP41)",
        price: 175000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-25.webp",
        link: "https://solamoenergy.com/shop/sunsynk/sunsynk-lifelynk-lynks-6kw-hybrid-inverter-ip41/",
        category: "Inverters",
        description:
          "Compact 6kW LifeLynk Lynks IP41 hybrid inverter with 8kW MPPT solar capacity and 48V battery support.",
      },
      {
        id: "sunsynk-lifelynk-lynx-pro-6kw-ip65-hybrid-inverter",
        name: "Sunsynk LifeLynk Lynx Pro 6kW IP65 Hybrid Inverter",
        price: 210000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-26.webp",
        link: "https://solamoenergy.com/shop/sunsynk/sunsynk-lifelynk-lynx-pro-6kw-ip65-hybrid-inverter/",
        category: "Inverters",
        description:
          "Weather-proof 6kW Lynx Pro IP65 hybrid inverter with 8kW MPPT solar and 48V battery support.",
      },
      {
        id: "sunsynk-x-series-10-24kwh-8000-cycles-ip65-lithium-battery",
        name: "Sunsynk X Series 10.24kWh 8000 Cycles IP65 Lithium Battery",
        price: 555000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-30.webp",
        link: "https://solamoenergy.com/shop/sunsynk/sunsynk-x-series-10-24kwh-8000-cycles-ip65-lithium-battery/",
        category: "Batteries",
        description:
          "Heavy-duty 10.24kWh IP65 LiFePO4 battery providing 8000 cycles, 200A continuous output, and 51.2V support.",
      },
      {
        id: "sunsynk-x-series-5-12kwh-8000-cycles-ip65-lithium-battery",
        name: "Sunsynk X Series 5.12kWh 8000 Cycles IP65 Lithium Battery",
        price: 295000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-29.webp",
        link: "https://solamoenergy.com/shop/sunsynk/sunsynk-x-series-5-12kwh-8000-cycles-ip65-lithium-battery/",
        category: "Batteries",
        description:
          "Durable 5.12kWh IP65 LiFePO4 battery delivering 8000 cycles, 100A continuous output, and 48V system compatibility.",
      },
    ],
  },
  jesko: {
    name: "Jesko",
    slug: "jesko",
    description:
      "High-efficiency N-type TOPCon bifacial solar panels engineered for maximum dual-glass energy yield.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/08/27.png",
    products: [
      {
        id: "jesko-585w",
        name: "Jesko 585W",
        price: 22800,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-16-1.webp",
        link: "https://solamoenergy.com/shop/jesko/jesko-585w/",
        category: "Solar Panel",
        description:
          "High-efficiency Jesko 585W N-type TOPCon bifacial solar panel engineered for maximum dual-glass energy yield.",
      },
      {
        id: "jesko-615w",
        name: "Jesko 615W",
        price: 24000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-17-3.webp",
        link: "https://solamoenergy.com/shop/jesko/jesko-615w/",
        category: "Solar Panel",
        description:
          "High-efficiency Jesko 615W N-type TOPCon bifacial solar panel engineered for maximum dual-glass energy yield.",
      },
      {
        id: "jesko-620w",
        name: "Jesko 620W",
        price: 24200,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-18-2.webp",
        link: "https://solamoenergy.com/shop/jesko/jesko-620w/",
        category: "Solar Panel",
        description:
          "High-efficiency Jesko 620W N-type TOPCon bifacial solar panel engineered for maximum dual-glass energy yield.",
      },
    ],
  },
  itel: {
    name: "Itel",
    slug: "itel",
    description:
      "Dependable, long-lasting deep-cycle and lithium batteries tailored for steady solar backup.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/08/26.png",
    products: [
      {
        id: "itel-16kw-51.2v-314ah-lithium-battery",
        name: "ITEL 16KW 51.2V 314Ah Lithium Battery",
        price: 601000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-15.webp",
        link: "https://solamoenergy.com/shop/itel/itel-16kw-51-2v-314ah-lithium-battery/",
        category: "Batteries",
        description:
          "ITEL 51.2V 314Ah LiFePO4 battery provides 16kWh high-capacity storage with smart BMS protection.",
      },
      {
        id: "itel-24v-100ah",
        name: "ITEL 24V 100Ah",
        price: 131000,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-9.webp",
        link: "https://solamoenergy.com/shop/itel/itel-24v-100ah/",
        category: "Batteries",
        description:
          "High-performance ITEL 24V 100Ah LiFePO4 lithium battery with 2.4kWh capacity and smart BMS protection.",
      },
    ],
  },
  yingli: {
    name: "Yingli",
    slug: "yingli",
    description:
      "High efficiency N-type TOPCon bifacial solar panels engineered for maximum yield.",
    bannerImage: "https://solamoenergy.com/wp-content/uploads/2026/08/31.png",
    products: [
      {
        id: "yingli-panda-3-0-630w",
        name: "Yingli Panda 3.0 630W",
        price: 26450,
        image:
          "https://solamoenergy.com/wp-content/uploads/2026/08/Website-Listing-9-3.webp",
        link: "https://solamoenergy.com/shop/yingli/yingli-panda-3-0-630w/",
        category: "Solar Panel",
        description:
          "High efficiency Yingli Panda 3.0 630W N-type TOPCon bifacial solar panel engineered for maximum yield.",
      },
    ],
  },
};
