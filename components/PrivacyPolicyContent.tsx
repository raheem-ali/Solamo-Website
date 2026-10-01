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

export default function PrivacyPolicyContent() {
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
          Privacy Policy
        </motion.h1>

        {/* =====================================================
            INTRODUCTION
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-[52px]"
        >
          <h2 className={headingClass}>Introduction</h2>

          <p className={paragraphClass}>
            Solamo Energy is deeply committed to maintaining the highest
            standards of data privacy and security for our residential and
            industrial clients across Pakistan. As we transition the nation
            towards sustainable energy, we ensure that the digital footprint of
            our partners is protected with industrial-grade protocols. This
            policy outlines our rigorous approach to managing your personal and
            technical information.
          </p>
        </motion.section>

        {/* =====================================================
            INFORMATION COLLECTION
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-[52px]"
        >
          <h2 className={headingClass}>Information Collection</h2>

          <p className={`${paragraphClass} mb-4`}>
            To provide our specialized solar engineering services, we collect
            various types of data from our clients and website visitors:
          </p>

          <ul
            className="
    list-disc
    pl-8
    space-y-1.5
    text-[#6b7470]
    text-[18px]
    sm:text-[20px]
    md:text-[22px]
    leading-[1.6]
    font-normal
  "
          >
            <li>
              <strong className="font-semibold text-[#6b7470]">
                Identity Data:
              </strong>{" "}
              Full names, CNIC (required for net metering applications), and
              business registration details for commercial entities.
            </li>

            <li>
              <strong className="font-semibold text-[#6b7470]">
                Utility Data:
              </strong>{" "}
              Historical electricity consumption records, connection types
              (Sanctioned Load), and structural site data essential for
              precision solar modeling.
            </li>
          </ul>
        </motion.section>

        {/* =====================================================
            DATA USAGE & OPTIMIZATION
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-[52px]"
        >
          <h2 className={headingClass}>Data Usage &amp; Optimization</h2>

          <p className={`${paragraphClass} mb-4`}>
            The information we collect is used strictly for technical
            engineering and regulatory purposes. This enables us to:
          </p>

          <ul
            className="
    list-disc
    pl-8
    space-y-1.5
    text-[#6b7470]
    text-[18px]
    sm:text-[20px]
    md:text-[22px]
    leading-[1.6]
    font-normal
  "
          >
            <li>
              <strong className="font-semibold text-[#6b7470]">
                ROI Calculation:
              </strong>{" "}
              Performing advanced technical simulations to predict precise
              energy yields and financial payback periods for your specific
              location.
            </li>

            <li>
              <strong className="font-semibold text-[#6b7470]">
                Net Metering Management:
              </strong>{" "}
              Facilitating complex regulatory paperwork for grid-tie connections
              with NEPRA and regional distribution companies like K-Electric,
              IESCO, and LESCO.
            </li>
          </ul>
        </motion.section>

        {/* =====================================================
            DATA SHARING & TRANSPARENCY
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-[52px]"
        >
          <h2 className={headingClass}>Data Sharing &amp; Transparency</h2>

          <p className={paragraphClass}>
            Solamo Energy maintains a{" "}
            <strong className="font-semibold text-[#6b7470]">
              strict non-sale policy
            </strong>
            . We do not monetize your personal information with third-party
            marketers. Data sharing is restricted exclusively to essential
            project partners.
          </p>
        </motion.section>

        {/* =====================================================
            SECURITY & TRACKING
        ===================================================== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-6"
        >
          <h2 className={headingClass}>Security &amp; Tracking</h2>

          <p className={paragraphClass}>
            Our digital infrastructure employs industrial-grade AES-256
            encryption for all data at rest and in transit. We utilize standard
            cookies only to optimize your technical performance monitoring and
            to ensure platform reliability during heavy computational loads.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
