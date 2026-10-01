"use client";

import { motion, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
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

const headingClass = `
  text-[34px]
  sm:text-[36px]
  md:text-[38px]
  leading-[1.15]
  font-medium
  tracking-tight
  text-[#172217]
  mb-3
`;

const paragraphClass = `
  text-[#6b7470]
  text-[18px]
  sm:text-[20px]
  md:text-[22px]
  leading-[1.6]
  font-normal
`;

const listClass = `
  list-disc
  pl-6
  sm:pl-8
  space-y-1.5
  text-[#6b7470]
  text-[18px]
  sm:text-[20px]
  md:text-[22px]
  leading-[1.6]
  font-normal
`;

export default function TermsOfServiceContent() {
  return (
    <main className="w-full">
      <div
        className="
          max-w-[1250px]
          mx-auto
          px-6
          sm:px-8
          lg:px-0
          pt-16
          md:pt-[64px]
          pb-20
        "
      >
        {/* =====================================================
            PAGE TITLE
        ===================================================== */}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="
            text-[42px]
            sm:text-[48px]
            md:text-[50px]
            leading-[1.15]
            font-medium
            tracking-tight
            text-[#172217]
            mb-5
          "
        >
          Terms of Service
        </motion.h1>

        {/* =====================================================
            AGREEMENT TO TERMS
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-[52px]"
        >
          <h2 className={headingClass}>Agreement to Terms</h2>

          <p className={paragraphClass}>
            By accessing our website or engaging our specialized solar
            engineering services, you agree to be bound by these Terms of
            Service. These terms constitute a legally binding agreement between
            you and Solamo Energy Solutions regarding the procurement,
            installation, and maintenance of solar photovoltaic systems within
            the territory of Pakistan.
          </p>
        </motion.section>

        {/* =====================================================
            SERVICE DESCRIPTION
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-[52px]"
        >
          <h2 className={headingClass}>Service Description</h2>

          <p className={`${paragraphClass} mb-4`}>
            Solamo Energy provides comprehensive end-to-end solar energy
            solutions including:
          </p>

          <ul className={listClass}>
            <li>
              <strong className="font-semibold text-[#6b7470]">
                Engineering &amp; Design:
              </strong>{" "}
              Custom structural modeling and electrical schematics tailored to
              site-specific irradiation data.
            </li>

            <li>
              <strong className="font-semibold text-[#6b7470]">
                Installation &amp; Maintenance:
              </strong>{" "}
              Industrial-grade deployment of PV modules, inverters, and
              protection gear followed by scheduled preventative maintenance.
            </li>
          </ul>
        </motion.section>

        {/* =====================================================
            QUOTATIONS & PRICING
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-6"
        >
          <h2 className={headingClass}>Quotations &amp; Pricing</h2>

          <p className={`${paragraphClass} mb-4`}>
            Due to the volatility of international hardware markets and freight
            costs, our pricing structure follows strict protocols:
          </p>

          <ul className={listClass}>
            <li>
              <strong className="font-semibold text-[#6b7470]">
                Quotation Validity:
              </strong>{" "}
              All formal engineering quotations are valid for a maximum period
              of 7 calendar days from the date of issuance.
            </li>

            <li>
              <strong className="font-semibold text-[#6b7470]">
                Mobilization Advances:
              </strong>{" "}
              Industrial and commercial projects require a mobilization advance
              to secure hardware procurement and logistics scheduling.
            </li>
          </ul>
        </motion.section>
      </div>
    </main>
  );
}
