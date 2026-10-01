"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown, ExternalLink, Navigation } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    service: "",
    bill: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    alert("Message sent!");
  };

  /*
   * ---------------------------------------------------------
   * FRAMER MOTION VARIANTS
   * ---------------------------------------------------------
   * Explicitly typed as Variants so TypeScript correctly
   * understands Framer Motion's easing type.
   */

  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <div className="w-full overflow-hidden bg-[#F8F9F5] px-6 py-20 font-sans text-[#172217]">
      <div className="mx-auto max-w-[1300px] space-y-16">
        {/* =====================================================
            1. HEADING SECTION
        ====================================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#172217] sm:text-6xl">
            Stay Connected <span className="text-[#79B900]">With Us.</span>
          </h1>
        </motion.div>

        {/* =====================================================
            2. FORM + MAP SECTION
        ====================================================== */}

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* -----------------------------------------------------
              LEFT: CONTACT FORM
          ------------------------------------------------------ */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={fadeInUp}
            className="rounded-[28px] bg-[#172217] p-8 text-white shadow-sm sm:p-12 lg:col-span-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-600 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-[#79B900]"
                  required
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-600 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-[#79B900]"
                  required
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-600 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-[#79B900]"
                required
              />

              {/* Phone */}
              <div className="relative flex items-center border-b border-gray-600 focus-within:border-[#79B900]">
                <span
                  className="mr-3 text-lg"
                  title="Pakistan"
                  aria-label="Pakistan"
                >
                  🇵🇰
                </span>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your Phone No."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400"
                  required
                />
              </div>

              {/* City */}
              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none border-b border-gray-600 bg-transparent py-3 text-sm text-gray-300 outline-none focus:border-[#79B900]"
                  required
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#172217] text-gray-400"
                  >
                    City
                  </option>

                  <option value="Karachi" className="bg-[#172217] text-white">
                    Karachi
                  </option>

                  <option value="Hyderabad" className="bg-[#172217] text-white">
                    Hyderabad
                  </option>

                  <option value="Lahore" className="bg-[#172217] text-white">
                    Lahore
                  </option>

                  <option value="Islamabad" className="bg-[#172217] text-white">
                    Islamabad
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-2 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Service */}
              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none border-b border-gray-600 bg-transparent py-3 text-sm text-gray-300 outline-none focus:border-[#79B900]"
                  required
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#172217] text-gray-400"
                  >
                    Service Interested in
                  </option>

                  <option
                    value="Residential Solar"
                    className="bg-[#172217] text-white"
                  >
                    Residential Solar
                  </option>

                  <option
                    value="Commercial Solar"
                    className="bg-[#172217] text-white"
                  >
                    Commercial Solar
                  </option>

                  <option
                    value="Industrial Solar"
                    className="bg-[#172217] text-white"
                  >
                    Industrial Solar
                  </option>

                  <option
                    value="Agricultural Solar"
                    className="bg-[#172217] text-white"
                  >
                    Agricultural Solar
                  </option>

                  <option
                    value="EV Charging"
                    className="bg-[#172217] text-white"
                  >
                    EV Charging
                  </option>

                  <option
                    value="Net Metering"
                    className="bg-[#172217] text-white"
                  >
                    Net Metering
                  </option>

                  <option
                    value="Battery Storage"
                    className="bg-[#172217] text-white"
                  >
                    Battery Storage
                  </option>

                  <option value="Franchise" className="bg-[#172217] text-white">
                    Franchise
                  </option>

                  <option value="Other" className="bg-[#172217] text-white">
                    Other
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-2 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Monthly Bill */}
              <div className="relative">
                <select
                  name="bill"
                  value={formData.bill}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none border-b border-gray-600 bg-transparent py-3 text-sm text-gray-300 outline-none focus:border-[#79B900]"
                  required
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#172217] text-gray-400"
                  >
                    Monthly Electricity Bill
                  </option>

                  <option
                    value="Under PKR 10,000"
                    className="bg-[#172217] text-white"
                  >
                    Under PKR 10,000
                  </option>

                  <option
                    value="10,000–30,000"
                    className="bg-[#172217] text-white"
                  >
                    10,000–30,000
                  </option>

                  <option
                    value="30,000–80,000"
                    className="bg-[#172217] text-white"
                  >
                    30,000–80,000
                  </option>

                  <option value="80,000+" className="bg-[#172217] text-white">
                    80,000+
                  </option>

                  <option value="N/A" className="bg-[#172217] text-white">
                    N/A
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-2 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Message */}
              <textarea
                name="message"
                rows={3}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none border-b border-gray-600 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-[#79B900]"
              />

              {/* Submit */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full rounded-full bg-[#79B900] py-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#689e00]"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* -----------------------------------------------------
              RIGHT: MAP
          ------------------------------------------------------ */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={fadeInUp}
            className="relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-gray-200/80 shadow-sm lg:col-span-6"
          >
            <iframe
              src="https://maps.google.com/maps?q=Solamo%20Energy%2C%20Keamari%2C%20Karachi%2C%20Pakistan&t=m&z=10&output=embed&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Solamo Energy Location"
              className="min-h-[520px] w-full flex-grow"
            />

            {/* Floating Map Card */}
            <div className="absolute left-6 top-6 hidden max-w-[310px] flex-col justify-between rounded-2xl border border-gray-200 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:flex">
              <div>
                <h4 className="text-sm font-bold text-[#172217]">
                  Solamo Energy
                </h4>

                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  Office # G5, Shakeel Residency, Plot # 96 # Block # 9, Noor
                  Deen Khan Road, Karachi, Port Trust Lines Keamari, Karachi,
                  79620, Pakistan
                </p>

                <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-amber-500">
                  <span>4.6 ★</span>
                  <span className="font-normal text-gray-400">(10)</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                <a
                  href="https://maps.google.com/maps?q=Solamo%20Energy%2C%20Keamari%2C%20Karachi%2C%20Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-[#0066FF] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0052cc]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in Maps
                </a>

                <a
                  href="https://maps.google.com/maps?q=Solamo%20Energy%2C%20Keamari%2C%20Karachi%2C%20Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Directions"
                  aria-label="Get directions"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
                >
                  <Navigation className="h-4 w-4 text-[#0066FF]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            3. CONTACT INFO CARDS
        ====================================================== */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-40px",
          }}
          className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3"
        >
          {/* -----------------------------------------------------
              LOCATION
          ------------------------------------------------------ */}

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-start rounded-[24px] border border-black/10 bg-[#F8F9F5] p-8 transition-shadow hover:shadow-md"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#79B900] text-[#79B900]">
              <svg
                className="h-6 w-6 stroke-[#79B900]"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-lg font-bold text-[#172217]">Location:</h3>

            <p className="text-sm leading-relaxed text-gray-600">
              Office # G5, Shakeel Residency, Plot # 96 # Block # 9, Noor Deen
              Khan Road, Keamari, Karachi
            </p>
          </motion.div>

          {/* -----------------------------------------------------
              EMAIL
          ------------------------------------------------------ */}

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-start rounded-[24px] border border-black/10 bg-[#F8F9F5] p-8 transition-shadow hover:shadow-md"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#79B900] text-[#79B900]">
              <svg
                className="h-6 w-6 stroke-[#79B900]"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-lg font-bold text-[#172217]">
              Email Address:
            </h3>

            <p className="text-sm text-gray-600">info@solamoenergy.com</p>
          </motion.div>

          {/* -----------------------------------------------------
              PHONE
          ------------------------------------------------------ */}

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-start rounded-[24px] border border-black/10 bg-[#F8F9F5] p-8 transition-shadow hover:shadow-md"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#79B900] text-[#79B900]">
              <svg
                className="h-6 w-6 stroke-[#79B900]"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-lg font-bold text-[#172217]">
              Phone Number:
            </h3>

            <p className="text-sm text-gray-600">+92 314 1349717</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
